import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
  faSave,
  faSpinner,
  faEllipsisH,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {
  getErrorDialog,
  getMissingRequiredFieldsErrorDialog,
  getServiceUnavailableDialog,
} from "../../../../../../common/toasts/toasts";
import SFDCConfiguration from "./jenkins_step_config_sub_forms/SFDCConfiguration";

const JOB_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" },
  { value: "sfdc-ant", label: "SFDC Package Generation Job" },
  { value: "sfdc-ant-profile", label: "SFDC Profile Migration" },
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "",
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",
  toolJobId: "",
  toolJobType: "",
  rollbackBranchName: "",
  stepIdXML: "",
  sfdcDestToolId: "",
  destAccountUsername: "",
  sfdcToolId: "",
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
  gitCredential: "",
  gitUserName: "",
  repository: "",
  branch: "",
  buildArgs: {},
  isOrgToOrg: false,
};

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  createJob,
  setToast,
  setShowToast,
}) {
  const contextType = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setJenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [accountsList, setAccountsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [jobType, setJobType] = useState("");

  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);

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
    setShowToast(false);
    async function fetchJenkinsDetails(service) {
      setisJenkinsSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      if (results) {
        setJenkinsList(results);
        setisJenkinsSearching(false);
      }
    }

    fetchJenkinsDetails("jenkins");
  }, []);

  useEffect(() => {
    if (formData.toolConfigId) {
      // console.log(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
      setAccountsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)].accounts
          : []
      );

      setJobsList(
        jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]
          ? jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)].jobs
          : []
      );
    }
  }, [jenkinsList, formData.toolConfigId]);

  
  useEffect(() => {
    if (jobsList && jobsList.length > 0 && formData.toolJobId && formData.toolJobId.length > 0 && !jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)]) {
     let toast = getErrorDialog(
        "Preselected job is no longer available.  It may have been deleted.  Please select another job from the list or recreate the job in Tool Reigstry.",
        setShowToast,
        "detailPanelTop"
      );
      setToast(toast);
      setShowToast(true);
      return;
    }
    setShowToast(false);
  }, [jobsList, formData.toolJobId]);

  // fetch repos
  useEffect(() => {
    setShowToast(false);

    // setFormData({ ...formData, branch : "" });
    async function fetchRepos(service, gitToolId) {
      setIsRepoSearching(true);
      // Set results state
      let results = await searchRepositories(service, gitToolId);
      if (results) {
        //console.log(results);
        setRepoList(results);
        setIsRepoSearching(false);
      }
    }

    if (formData.service && formData.service.length > 0 && formData.gitToolId && formData.gitToolId.length > 0) {
      // Fire off our API call
      fetchRepos(formData.service, formData.gitToolId);
    } else {
      setIsRepoSearching(true);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.gitToolId, formData.gitCredential]);

  // fetch branches
  useEffect(() => {
    setShowToast(false);

    // setFormData({ ...formData, branch : "" });
    async function fetchBranches(service, gitToolId, repoId) {
      setIsBranchSearching(true);
      // Set results state
      let results = await searchBranches(service, gitToolId, repoId);
      if (results) {
        //console.log(results);
        setBranchList(results);
        setIsBranchSearching(false);
      }
    }

    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.gitToolId &&
      formData.gitToolId.length > 0 &&
      formData.repoId &&
      formData.repoId.length > 0
    ) {
      // Fire off our API call
      fetchBranches(formData.service, formData.gitToolId, formData.repoId);
    } else {
      setIsRepoSearching(true);
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.repoId]);

  /*
  useEffect(() => {
    if (formData.toolConfigId) {
      setJobsList(
        jenkinsList[
          jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
          ] ?
          jenkinsList[
            jenkinsList.findIndex((x) => x.id === formData.toolConfigId)
            ].jobs : [],
      );
    }
  }, [jenkinsList, formData.toolConfigId]);
*/

  useEffect(() => {
    if (formData.toolJobType && formData.toolJobType.includes("SFDC")) {
      setFormData({ ...formData, buildType: "ant" });
    }
  }, [formData.toolJobType]);

  const loadFormData = async (step) => {
    let { configuration, threshold, job_type } = step;
    if (typeof configuration !== "undefined") {
      if (typeof configuration !== "undefined") {
        setFormData(configuration);
      }
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
      if (typeof job_type !== "undefined") {
        setJobType(job_type);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const handleCreateAndSave = async (pipelineId, stepId, toolId) => {
    console.log("saving and creating job for toolID: ", toolId);
    if (validateRequiredFields() && toolId) {
      setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {
          stepId: formData.stepIdXML && formData.stepIdXML,
        },
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jobType,
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const callbackFunction = async () => {
    console.log("saving data");
    if (validateRequiredFields()) {
      setLoading(true);

      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: jobType,
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };

  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data && res.status === 200) {
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
        let toast = getErrorDialog(
          "Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.",
          setShowToast,
          "detailPanelTop"
        );
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };

  const validateRequiredFields = () => {
    let { toolConfigId, toolJobId, jenkinsUrl, jUserId, jobName, buildType, dockerName, dockerTagName } = formData;
    if(!toolJobId && toolJobId.length < 0 ) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    }
    if (jobType === "job") {
      if (jobName.length === 0) {
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    } else {
      if (
        toolConfigId.length === 0 ||
        jenkinsUrl.length === 0 ||
        jUserId.length === 0 ||
        (buildType === "docker" ? dockerName.length === 0 || dockerTagName.length === 0 : false)
      ) {
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);
        return false;
      } else {
        return true;
      }
    }
  };

  const handleJenkinsChange = (selectedOption) => {
    if (!selectedOption.configuration) {
      let errorMessage =
        "Connection information missing for this tool!  This Jenkins tool does not have connection details defined in its Tool Registry record.  Please go into Tool Registry and add connection information in order for Opsera to work with this tool.";
      let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return;
    }

    //setLoading(true);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        toolConfigId: selectedOption.id,
        jenkinsUrl: selectedOption.configuration.jenkinsUrl,
        jUserId: selectedOption.configuration.jUserId,
        jenkinsPort: selectedOption.configuration.jenkinsPort,
        // jAuthToken: selectedOption.configuration.jAuthToken,
        gitToolId: "",
        repoId: "",
        gitUrl: "",
        sshUrl: "",
        service: "",
        gitCredential: "",
        gitUserName: "",
        repository: "",
        branch: "",
        toolJobId: "",
        toolJobType: "",
        rollbackBranchName: "",
        stepIdXML: "",
        sfdcDestToolId: "",
        destAccountUsername: "",
        sfdcToolId: "",
        accountUsername: "",
        projectId: "",
        defaultBranch: "",
      });
    }
    if (selectedOption.accounts && selectedOption.jobs) {
      setAccountsList(selectedOption.accounts);
      setJobsList(selectedOption.jobs);
    }
    //setLoading(false);
  };

  console.log(formData);

  const handleJobChange = (selectedOption) => {
    switch (selectedOption.type[0]) {
      case "SFDC":
        setFormData({
          ...formData,
          toolJobId: selectedOption._id,
          toolJobType: selectedOption.type,
          jobType: selectedOption.configuration.jobType,
          ...selectedOption.configuration,
          stepIdXML: "",
          sfdcDestToolId: "",
          destAccountUsername: "",
          buildArgs: {},
        });
        break;
      default:
        setFormData({
          ...formData,
          toolJobId: selectedOption._id,
          toolJobType: selectedOption.type,
          jobType: selectedOption.type[0],
          ...selectedOption.configuration,
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          destAccountUsername: "",
          buildToolVersion: "6.3",
          buildArgs: {},
        });
        break;
    }
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({
      ...formData,
      gitToolId: selectedOption.toolId,
      gitCredential: selectedOption.gitCredential,
      gitUserName: selectedOption.gitUserName,
      service: selectedOption.service,
      repoId: "",
      gitUrl: "",
      sshUrl: "",
      repository: "",
      branch: "",
      projectId: "",
      defaultBranch: "",
    });
  };

  const handleRepoChange = (selectedOption) => {
    setFormData({
      ...formData,
      repository: selectedOption.name,
      repoId: selectedOption.id,
      projectId: selectedOption.id,
      gitUrl: selectedOption.httpUrl,
      sshUrl: selectedOption.sshUrl,
      branch: "",
      defaultBranch: "",
      gitBranch: "",
    });
  };

  const handleBranchChange = (selectedOption) => {
    setFormData({
      ...formData,
      branch: selectedOption.value,
      defaultBranch: selectedOption.value,
      gitBranch: selectedOption.value,
    });
  };

  const handleJobTypeChange = (selectedOption) => {
    setShowToast(false);
    setJobType(selectedOption.value);
    switch (selectedOption.value) {
      case "sfdc-ant":
        setFormData({
          ...formData,
          jobName: "",
          buildType: "ant",
          jobDescription: "PACKAGEXML_CREATION",
          jobType: "SFDC CREATE PACKAGE XML",
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: false,
        });
        break;
      case "sfdc-ant-profile":
        setFormData({
          ...formData,
          jobName: "",
          buildType: "ant",
          jobDescription: "Profile-migration",
          jobType: "SFDC PROFILE DEPLOY",
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: true,
        });
        break;
      default:
        setFormData({
          ...formData,
          sfdcToolId: "",
          accountUsername: "",
          jobName: "",
          buildType: "gradle", // defaults
          jobDescription: "",
          jobType: "BUILD", // defaults
          toolJobId: "",
          toolJobType: "",
          rollbackBranchName: "",
          stepIdXML: "",
          sfdcDestToolId: "",
          isOrgToOrg: false,
        });
        break;
    }
  };
  console.log(jobType);
  //todo: the api needs to be moved to actions.jsx
  const searchRepositories = async (service, gitAccountId) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getRepositories",
      gitAccountId: gitAccountId,
    };
    //console.log(postBody);
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        return arrOfObj;
      } else {
        let toast = getServiceUnavailableDialog(setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  //todo: the api needs to be moved to actions.jsx
  const searchBranches = async (service, gitAccountId, repoId) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";
    const postBody = {
      tool: service,
      metric: "getBranches",
      gitAccountId: gitAccountId,
      repoId: repoId,
    };
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if (res.data && res.data.data) {
        let arrOfObj = res.data.data;
        if (arrOfObj) {
          var result = arrOfObj.map(function (el) {
            var o = Object.assign({});
            o.value = el.toLowerCase();
            o.name = el;
            return o;
          });
          return result;
        }
      } else {
        let toast = getServiceUnavailableDialog(setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      console.error(error.message);
    }
  };

  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
              make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
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
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
          </Popover.Content>
        </Popover>
      );
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="jenkinsList">
          <Form.Label className="w-100">
            Tool*
            <OverlayTrigger
              trigger="click"
              rootClose
              placement="left"
              overlay={RegistryPopover(jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)])}
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
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {renderForm && jenkinsList && jenkinsList.length > 0 ? (
                <>
                  <DropdownList
                    data={jenkinsList}
                    value={jenkinsList[jenkinsList.findIndex((x) => x.id === formData.toolConfigId)]}
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
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                    No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.
                    Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
                    proceed.
                  </div>
                </>
              )}
            </>
          )}
          {formData.toolConfigId && formData.toolConfigId.length > 0 && (
            <Form.Label className="mt-2 pl-1">
              <Link to={"/inventory/tools/" + formData.toolConfigId}>
                <FontAwesomeIcon icon={faTools} className="pr-1" /> View/edit this tool's Registry settings
              </Link>
            </Form.Label>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Type*</Form.Label>
          {jobType !== undefined ? (
            <DropdownList
              data={JOB_OPTIONS}
              valueField="id"
              textField="label"
              value={JOB_OPTIONS[JOB_OPTIONS.findIndex((x) => x.value === jobType)]}
              filter="contains"
              placeholder="Please select an account"
              onChange={handleJobTypeChange}
            />
          ) : null}
        </Form.Group>

        {jobType === "job" ? (
          <Form.Group controlId="branchField">
            <Form.Label>Job Name*</Form.Label>
            <Form.Control
              maxLength="150"
              disabled={false}
              type="text"
              placeholder=""
              value={formData.jobName || ""}
              onChange={(e) => setFormData({ ...formData, jobName: e.target.value })}
            />
          </Form.Group>
        ) : (
          <>
            {jobType === "opsera-job" && (
              <>
                {formData.jenkinsUrl && jenkinsList.length > 0 && jobsList.length > 0 && (
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="w-100">
                      Job*
                      <OverlayTrigger
                        trigger="click"
                        rootClose
                        placement="left"
                        overlay={RegistryPopover(jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)])}
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisH}
                          className="fa-pull-right pointer pr-1"
                          onClick={() => document.body.click()}
                        />
                      </OverlayTrigger>
                    </Form.Label>
                    {jobsList.length < 1 && (
                      <div className="form-text text-muted p-2">
                        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                        No jobs have been created for <span>{formData.jenkinsUrl}</span>. Please go to
                        <Link to={"/inventory/tools/" + formData.toolConfigId}> Tool Registry</Link> and add credentials
                        and register a job for this Jenkins in order to proceed.{" "}
                      </div>
                    )}
                    {jobsList !== undefined && jobsList.length > 0 && jobsList.length > 0  ? (
                      <DropdownList
                        data={jobsList}
                        valueField="id"
                        textField="name"
                        defaultValue={
                          jobsList &&
                          jobsList.length > 0 &&
                          jobsList[jobsList.findIndex((x) => x._id === formData.toolJobId)]
                        }
                        filter="contains"
                        onChange={handleJobChange}
                      />
                    ) : null}
                  </Form.Group>
                )}
              </>
            )}

            <SFDCConfiguration
              plan={plan}
              stepId={stepId}
              renderForm={renderForm}
              jobType={jobType}
              jenkinsList={jenkinsList}
              accountsList={accountsList}
              formData={formData}
              setFormData={setFormData}
              setToast={setToast}
              setShowToast={setShowToast}
            />

            {formData.jenkinsUrl && jenkinsList.length > 0 && formData.jobType && formData.jobType.length > 0 && (
              <>
                {formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
                  formData.jobType != "SFDC UNIT TESTING" &&
                  formData.jobType != "SFDC DEPLOY" &&
                  !formData.isOrgToOrg && (
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="w-100">
                        Account*
                        <OverlayTrigger
                          trigger="click"
                          rootClose
                          placement="left"
                          overlay={RegistryPopover(
                            accountsList[accountsList.findIndex((x) => x.gitCredential === formData.gitCredential)]
                          )}
                        >
                          <FontAwesomeIcon
                            icon={faEllipsisH}
                            className="fa-pull-right pointer pr-1"
                            onClick={() => document.body.click()}
                          />
                        </OverlayTrigger>
                      </Form.Label>
                      {accountsList.length < 1 && (
                        <div className="form-text text-muted p-2">
                          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                          No Credentials have been created for <span>{formData.jenkinsUrl}</span>. Please go to
                          <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in
                          order to proceed.
                        </div>
                      )}
                      {accountsList !== undefined && accountsList.length > 0 ? (
                        <DropdownList
                          data={accountsList}
                          valueField="gitCredential"
                          textField="gitCredential"
                          defaultValue={
                            accountsList &&
                            accountsList.length > 0 &&
                            accountsList[accountsList.findIndex((x) => x.gitCredential === formData.gitCredential)]
                          }
                          filter="contains"
                          onChange={handleAccountChange}
                        />
                      ) : null}
                    </Form.Group>
                  )}

            {formData.service &&
              formData.gitToolId &&
              formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
              formData.jobType != "SFDC UNIT TESTING" &&
              formData.jobType != "SFDC DEPLOY" &&
              !formData.isOrgToOrg && (
                <Form.Group controlId="account" className="mt-2">
                  <Form.Label>Repository*</Form.Label>
                  {isRepoSearching ? (
                    <div className="form-text text-muted mt-2 p-2">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      Loading repositories from registry
                    </div>
                  ) : (
                    <>
                      {repoList ? (
                        <DropdownList
                          data={repoList}
                          value={repoList[repoList.findIndex((x) => x.name === formData.repository)]}
                          valueField="value"
                          textField="name"
                          filter="contains"
                          onChange={handleRepoChange}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      )}
                    </>
                  )}
                  {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
                </Form.Group>
              )}

            {formData.service &&
              formData.gitToolId &&
              formData.repoId &&
              formData.jobType != "SFDC VALIDATE PACKAGE XML" &&
              formData.jobType != "SFDC UNIT TESTING" &&
              formData.jobType != "SFDC DEPLOY" &&
              formData.jobType != "SFDC BACK UP" &&
              !formData.isOrgToOrg && (
                <Form.Group controlId="account" className="mt-2">
                  <Form.Label>Branch*</Form.Label>
                  {isBranchSearching ? (
                    <div className="form-text text-muted mt-2 p-2">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      Loading branches from selected repository
                    </div>
                  ) : (
                    <>
                      {branchList ? (
                        <DropdownList
                          data={branchList}
                          value={branchList[branchList.findIndex((x) => x.value === formData.branch)]}
                          valueField="value"
                          textField="name"
                          filter="contains"
                          onChange={handleBranchChange}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      )}
                    </>
                  )}
                  {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
                </Form.Group>
              )}

              
              {formData.jobType === "SFDC BACK UP" && (
                  <Form.Group controlId="branchName">
                    <Form.Label>Rollback Branch Name*</Form.Label>
                    <Form.Control
                      maxLength="50"
                      type="text"
                      placeholder=""
                      value={formData.rollbackBranchName || ""}
                      onChange={(e) => setFormData({ ...formData, rollbackBranchName: e.target.value })}
                    />
                  </Form.Group>
                )}
                {formData.buildType === "docker" && (
                  <>
                  <Form.Group controlId="dockerName">
                    <Form.Label>Docker Name*</Form.Label>
                    <Form.Control
                      maxLength="50"
                      type="text"
                      placeholder=""
                      value={formData.dockerName || ""}
                      onChange={(e) => setFormData({ ...formData, dockerName: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="dockerTag">
                    <Form.Label>Docker Tag*</Form.Label>
                    <Form.Control
                      maxLength="50"
                      type="text"
                      placeholder=""
                      value={formData.dockerTagName || ""}
                      onChange={(e) => setFormData({ ...formData, dockerTagName: e.target.value })}
                    />
                  </Form.Group>
                  </>
                )}
                
              </>
            )}

          </>
        )}

        {jobType === "opsera-job" ? (
          <Button
            variant="primary"
            type="button"
            className="mt-3"
            onClick={() => {
              handleCreateAndSave(pipelineId, stepId, formData.toolConfigId);
            }}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Working
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1" />
                Create Job and Save
              </>
            )}
          </Button>
        ) : (
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
                <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth /> Saving
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
              </>
            )}
          </Button>
        )}

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}

JenkinsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  createJob: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
};

export default JenkinsStepConfiguration;
