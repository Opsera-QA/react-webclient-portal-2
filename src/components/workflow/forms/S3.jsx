import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../common/error";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "SEND S3", 
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  
  projectKey: "",
 
  accountUsername: "",
  projectId: "",
  defaultBranch: "",
  dockerName: "",
  dockerTagName: "",
  buildType: "gradle", //hardcoded now but needs to get it from a dropdown
  gitToolId: "",
  repoId: "",
  gitUrl: "",
  sshUrl: "",
  service: "",
  bucketName: "",
  gitCredential: "",
  gitUserName: "",
  repository: "",
  branch: "",
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function S3StepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  createJob,
}) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(stepTool);
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);
      controller.abort();
    };
  }, [stepTool]);

  useEffect(() => {
    setErrors(false);

    async function fetchJenkinsDetails(service) {
      setisJenkinsSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      //console.log(results);
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setJenkinsList(filteredList);
        setisJenkinsSearching(false);
      }
    }

    // Fire off our API call
    fetchJenkinsDetails("jenkins");
  }, []);

  // search aws
  useEffect(() => {
    setErrors(false);

    async function fetchAWSDetails(service) {
      setIsAwsSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      //console.log(results);
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setAwsList(filteredList);
        setIsAwsSearching(false);
      }
    }

    // Fire off our API call
    fetchAWSDetails("aws_account");
  }, []);

  useEffect(() => {
    if (formData.toolConfigId) {
      // console.log(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
      setAccountsList(
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ] ?
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
        ].accounts : []
      );
    }
  }, [formData.toolConfigId]);
  
  console.log(formData);

  const loadFormData = async (step) => {
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    console.log("saving data");
    if (validateRequiredFields()) {
      setLoading(true);

      let newConfiguration = formData;

      if (typeof newConfiguration.secretKey === "string") {
        newConfiguration.secretKey = await saveToVault(
          pipelineId,
          stepId,
          "secretKey",
          "Vault Secured Key",
          newConfiguration.secretKey
        );
      }

      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };


  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      key: keyName,
      value: value,
    };
    const response = await callbackSaveToVault(body);
    if (response.status === 200) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData((formData) => {
        return { ...formData, secretKey: {} };
      });
      setLoading(false);
      setFormMessage(
        "ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA."
      );
      return "";
    }
  };

  //TODO: Refactor this into actions.jsx
  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        //console.log(respObj);
        return respObj;
      } else {
        setErrors(
          "Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry."
        );
      }
    } catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };
  
  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });
  };

  const validateRequiredFields = () => {
    let {
      toolConfigId,
      jenkinsUrl,
      jUserId,
      jAuthToken,
      jobName,
      buildType,
      dockerName,
      dockerTagName,
    } = formData;
    if (
      toolConfigId.length === 0 ||
      jenkinsUrl.length === 0 ||
      jUserId.length === 0 ||
      jAuthToken.length === 0 ||
      // jobName.length === 0 ||
      (buildType === "docker"
        ? dockerName.length === 0 || dockerTagName.length === 0
        : false)
    ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  //todo: can this use the initial value const above to reset everything?  Right now this means we have ot maintain the values in two places.
  const handleJenkinsChange = (selectedOption) => {
    setLoading(true);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        toolConfigId: selectedOption.id,
        jenkinsUrl: selectedOption.configuration.jenkinsUrl,
        jUserId: selectedOption.configuration.jUserId,
        jenkinsPort: selectedOption.configuration.jenkinsPort,
        jAuthToken: selectedOption.configuration.jAuthToken,
        bucketName: "",
      });
    }
    setLoading(false);
  };

  const handleAWSChange = (selectedOption) => {
    setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        awsToolConfigId: selectedOption.id ? selectedOption.id : "",
        awsAccountId: selectedOption.configuration
          ? selectedOption.configuration.awsAccountId
          : "",
        accessKey: selectedOption.configuration
          ? selectedOption.configuration.accessKey
          : "",
        secretKey: selectedOption.configuration
          ? selectedOption.configuration.secretKey
          : "",
        regions: selectedOption.configuration
          ? selectedOption.configuration.regions
          : "",
      });
    }
    setLoading(false);
  };

  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and
              account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new
              entry to a dropdown or update settings, make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span>{" "}
                          {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Please select any tool/account to get the details.
            </div>
          </Popover.Content>
        </Popover>
      );
    }
  };

  return (
    <>
      {error && <ErrorDialog error={error} />}

      <Form>
        <Form.Group controlId="jenkinsList">
          <Form.Label className="w-100">
            Step Tool*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(
                jenkinsList[
                  jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
                ]
              )}
            >
              <FontAwesomeIcon
                icon={faEllipsisH}
                className="fa-pull-right pointer pr-1"
                onClick={() => document.body.click()}
              />
            </OverlayTrigger>
          </Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted mr-1"
                fixedWidth
              />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {renderForm && jenkinsList && jenkinsList.length > 0 ? (
                <>
                  <DropdownList
                    data={jenkinsList}
                    value={
                      jenkinsList[
                        jenkinsList.findIndex(
                          (x) => x.id === formData.toolConfigId
                        )
                      ]
                    }
                    valueField="id"
                    textField="name"
                    placeholder="Please select an account"
                    filter="contains"
                    onChange={handleJenkinsChange}
                  />
                </>
              ) : (
                <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="text-muted mr-1"
                      fixedWidth
                    />
                    No accounts have been registered for{" "}
                    <span className="upper-case-first">{formData.service}</span>
                    . Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an
                    entry for this repository in order to proceed.
                  </div>
                </>
              )}
            </>
          )}
          {formData.toolConfigId && formData.toolConfigId.length > 0 && (
            <Form.Label className="mt-2 pl-1">
              <Link to={"/inventory/tools/" + formData.toolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit
                this tool's Registry settings
              </Link>
            </Form.Label>
          )}
        </Form.Group>

        {formMessage.length > 0 ? (
          <p className="info-text">{formMessage}</p>
        ) : null}

        {(formData.jobType === "SEND S3" ) && (
          <>
          <Form.Group controlId="jenkinsList">
            <Form.Label className="w-100">
              AWS Credentials*
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={RegistryPopover(
                  awsList[
                    awsList.findIndex((x) => x.id === formData.awsToolConfigId)
                  ]
                )}
              >
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="fa-pull-right pointer pr-1"
                  onClick={() => document.body.click()}
                />
              </OverlayTrigger>
            </Form.Label>
            {isAwsSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-muted mr-1"
                  fixedWidth
                />
                Loading AWS accounts from Tool Registry
              </div>
            ) : (
              <>
                {renderForm && awsList && awsList.length > 0 ? (
                  <>
                    <DropdownList
                      data={awsList}
                      value={
                        awsList[
                          awsList.findIndex(
                            (x) => x.id === formData.awsToolConfigId
                          )
                        ]
                      }
                      valueField="id"
                      textField="name"
                      filter="contains"
                      onChange={handleAWSChange}
                    />
                  </>
                ) : (
                  <>
                    <div className="form-text text-muted p-2">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-muted mr-1"
                        fixedWidth
                      />
                      No accounts have been registered for AWS. Please go
                      to
                      <Link to="/inventory/tools">Tool Registry</Link> and add a
                      AWS Account entry in order to proceed.
                    </div>
                  </>
                )}
              </>
            )}
            <Form.Group controlId="branchField">
              <Form.Label>Bucket Name*</Form.Label>
                <Form.Control
                  maxLength="150"
                  disabled={false}
                  type="text"
                  placeholder=""
                  value={formData.bucketName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, bucketName: e.target.value })
                  }
                />
          </Form.Group>
          </Form.Group>
            <Form.Group controlId="s3Step">
            <Form.Label>Build Step Info*</Form.Label>
            {listOfSteps ? (
              <DropdownList
                data={listOfSteps}
                value={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                valueField="_id"
                textField="name"
                defaultValue={
                  formData.buildStepId
                    ? listOfSteps[
                        listOfSteps.findIndex(
                          (x) => x._id === formData.buildStepId
                        )
                      ]
                    : listOfSteps[0]
                }
                onChange={handleBuildStepChange}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="text-muted ml-2"
                fixedWidth
              />
            )}
          </Form.Group>
          
          <Form.Group controlId="projectKey">
            <Form.Label>S3 Url</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" disabled value={formData.s3Url || ""} onChange={e => setFormData({ ...formData, s3Url: e.target.value })} />
          </Form.Group>
          </>
        )}

        {/* no create job for s3 */}
          <Button
            variant="primary"
            type="button"
            className="mt-3"
            onClick={() => {
              callbackFunction();
            }}
          >
            {loading ? (
              <>
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="mr-1"
                  fixedWidth
                />{" "}
                Saving
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
              </>
            )}
          </Button>

        <small className="form-text text-muted mt-2 text-right">
          * Required Fields
        </small>
      </Form>
    </>
  );
}


export default S3StepConfiguration;
