import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner, faExclamationCircle, faExclamationTriangle, faCog } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../contexts/AuthContext";
import { axiosApiService } from "../../../api/apiService";
import { Link } from "react-router-dom";
import ErrorDialog from "../../common/error";

const JOB_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "job", label: "Custom Job" },
  { value: "opsera-job", label: "Opsera Managed Jobs" },
  { value: "sfdc-ant", label: "SFDC Package Generation Job" }
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "BUILD", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",

  toolJobId : "",
  toolJobType: "",
  rollbackBranchName:"",
  stepIdXML:"",
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
  repoId : "",
  gitUrl:"",
  sshUrl: "",
  service: "",
  gitCredential: "",
  gitUserName : "",
  repository: "",
  branch: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function JenkinsStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackJobFunction, callbackSaveToVault }) {

  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jenkinsList, setjenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  const [sfdcList, setSFDCList] = useState([]);
  const [isSFDCSearching, setisSFDCSearching] = useState(false);
  
  const [accountsList, setAccountsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  
  const [jobType, setJobType] = useState("");
  
  useEffect(()=> {
    if( plan && stepId ) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(0, plan.findIndex( (element) => element._id === stepId));
    STEP_OPTIONS.unshift({ _id: "", name : "Select One",  isDisabled: "yes" });
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

  
  useEffect(
    () => {
      setErrors(false);
      async function fetchJenkinsDetails(service){
        setisJenkinsSearching(true);
        // Set results state
        let results = await searchToolsList(service);
        console.log(results);
        const filteredList = results.filter(el => el.configuration !== undefined); //filter out items that do not have any configuration data!
        if(filteredList) {          
          setjenkinsList(filteredList);
          setisJenkinsSearching(false);
        }
      }
      // Fire off our API call
      fetchJenkinsDetails("jenkins");
    },
    []
  );
  
  // search sfdc 
  useEffect(
    () => {
      setErrors(false);
      async function fetchSFDCDetails(service){
        setisSFDCSearching(true);
        // Set results state
        let results = await searchToolsList(service);
        console.log(results);
        const filteredList = results.filter(el => el.configuration !== undefined); //filter out items that do not have any configuration data!
        if(filteredList) {          
          setSFDCList(filteredList);
          setisSFDCSearching(false);
        }
      }
      // Fire off our API call
      fetchSFDCDetails("sfdc-configurator");
    },
    []
  );
  
  // fetch repos
  useEffect(
    () => {
      setErrors(false);
      // setFormData({ ...formData, branch : "" });
      async function fetchRepos(service, gitToolId){
        setIsRepoSearching(true);
        // Set results state
        let results = await searchRepositories(service, gitToolId);
        if(results) {
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
        setRepoList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.service, formData.gitToolId]
  );
  
  // fetch branches
  useEffect(
    () => {
      setErrors(false);
      // setFormData({ ...formData, branch : "" });
      async function fetchBranches(service, gitToolId, repoId){
        setIsBranchSearching(true);
        // Set results state
        let results = await searchBranches(service, gitToolId, repoId);
        if(results) {
          //console.log(results);
          setBranchList(results);
          setIsBranchSearching(false);
        }
      }
      if (formData.service && formData.service.length > 0 && formData.gitToolId && formData.gitToolId.length > 0 && formData.repoId && formData.repoId.length > 0) {
        // Fire off our API call
        fetchBranches(formData.service, formData.gitToolId, formData.repoId);
      } else {
        setIsRepoSearching(true);
        setBranchList([{ value: "", name : "Select One",  isDisabled: "yes" }]);
      }
    },
    [formData.repoId]
  );
  
  useEffect(
    () => {
      if( formData.toolConfigId ) {
        // console.log(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
        setAccountsList(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].accounts);
      }
    },
    [jenkinsList]
  );
  
  useEffect(
    () => {
      if( formData.toolConfigId ) {
        setJobsList(jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)].jobs);
      }
    },
    [jenkinsList]
  );

  useEffect(
    () => {
      if(formData.toolJobType && formData.toolJobType.includes("SFDC") ) {
        setFormData({ ...formData, buildType: "ant" });
      }
    },
    [formData.toolJobType]
  );
  
  function renderTooltip(props) {
    const { message } = props;
    return (
      <Tooltip id="button-tooltip" {...props}>
        {message}
      </Tooltip>
    );
  }

  // take it to tool config edit page
  const handleEditClick = () => {
    
  };

  const loadFormData = async (step) => {
    let { configuration, threshold, job_type } = step;
    if (typeof(configuration) !== "undefined") {

      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
      if (typeof(job_type) !== "undefined") {
        setJobType(job_type);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  };
  
  const handleCreateAndSave = async () => {
    //save the current settings of the step
    await callbackFunction(true);
    //trigger the createJob function
    await createJob();
    //complete normal save operation
    callbackFunction();
  };
  
  const callbackFunction = async (persistent) => {
    console.log("saving data");
    if (validateRequiredFields()) {
      setLoading(true);
   
      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        },
        job_type : jobType
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item, persistent);
    }
  };
  
  const searchToolsList = async (service) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/"+service;   // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if( res.data ) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name" : item.name, "id" : item._id, "configuration" : item.configuration, "accounts": item.accounts, "jobs": item.jobs });
        });
        console.log(respObj);
        return respObj;
      } else {
        setErrors("Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  // const formatOptions = (options) => {
  //   options.unshift({ value: "", name : "Select One",  isDisabled: "yes" });
  //   return options;
  // };
  // const formatAccountsOptions = (options) => {
  //   options.unshift({ toolId: "", gitCredential : "Select One", gitUserName: "",  isDisabled: "yes" });
  //   return options;
  // };

  const validateRequiredFields = () => {
    let { toolConfigId, jenkinsUrl, jUserId, jAuthToken, jobName, buildType, dockerName, dockerTagName  } = formData;
    if (
      toolConfigId.length === 0 ||    
      jenkinsUrl.length === 0 || 
      jUserId.length === 0 || 
      jAuthToken.length === 0 || 
      // jobName.length === 0 ||
      (buildType === "docker" ?  dockerName.length === 0 || 
      dockerTagName.length === 0  : false )
    ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };

  const handleJenkinsChange = (selectedOption) => {
    setLoading(true);    
    console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({ ...formData, toolConfigId: selectedOption.id, 
        jenkinsUrl: selectedOption.configuration.jenkinsUrl, 
        jUserId: selectedOption.configuration.jUserId, 
        jenkinsPort: selectedOption.configuration.jenkinsPort, 
        jAuthToken: selectedOption.configuration.jAuthToken,
        gitToolId: "",
        repoId : "",
        gitUrl:"",
        sshUrl: "",
        service: "",
        gitCredential: "",
        gitUserName : "",
        repository: "",
        branch: "",
        
        toolJobId : "",
        toolJobType: "",
        rollbackBranchName:"",
        stepIdXML:"",
        sfdcDestToolId: "",
        destAccountUsername: "",

        sfdcToolId: "",
        accountUsername: "",
        projectId: "",
        defaultBranch: "",
      });
    }
    if( selectedOption.accounts && selectedOption.jobs ) {
      setAccountsList(selectedOption.accounts);
      setJobsList(selectedOption.jobs);
    }
    setLoading(false);    
  };

  
  const handleSFDCChange = (selectedOption) => {
    setLoading(true);    
    console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({ ...formData, sfdcToolId: selectedOption.id, accountUsername: selectedOption.configuration ? selectedOption.configuration.accountUsername : "" });
    }
    setLoading(false);    
  };
  
  const handleDestinationSFDCChange = (selectedOption) => {
    setLoading(true);    
    console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({ ...formData, sfdcDestToolId: selectedOption.id, destAccountUsername: selectedOption.configuration ? selectedOption.configuration.destAccountUsername : "" });
    }
    setLoading(false);    
  };
  
  
  const handleJobChange = (selectedOption) => {
    setFormData({ ...formData,
      toolJobId: selectedOption.id,   // this wont work for now
    });
    if( selectedOption.type.includes("SFDC") ) {
      setFormData({ ...formData,
        toolJobId: selectedOption._id,
        toolJobType: selectedOption.type,
        jobType: selectedOption.configuration.jobType,
        rollbackBranchName: selectedOption.configuration.rollbackBranchName,
        
        stepIdXML:"",
        sfdcDestToolId: "",
        destAccountUsername: "",

      });
    }
  };

  const handleAccountChange = (selectedOption) => {
    setFormData({ ...formData, gitToolId : selectedOption.toolId, gitCredential: selectedOption.gitCredential, gitUserName: selectedOption.gitUserName, service: selectedOption.service,
      repoId : "",
      gitUrl:"",
      sshUrl: "",
      repository: "",
      branch: "",
      projectId: "",
      defaultBranch: "",
    });
  };

  const handleRepoChange = (selectedOption) => {
    setFormData({ ...formData, repository:selectedOption.name, repoId: selectedOption.id,  projectId: selectedOption.id, gitUrl: selectedOption.httpUrl, sshUrl: selectedOption.sshUrl, branch: "", defaultBranch: "", gitBranch: "" });  
  };

  const handleBranchChange = (selectedOption) => {
    setFormData({ ...formData, branch: selectedOption.value, defaultBranch: selectedOption.value, gitBranch: selectedOption.value });  
  };
  
  const handleJobTypeChange = (selectedOption) => {
    setErrors(false);
    setJobType(selectedOption.value);  
    if( selectedOption.value === "sfdc-ant" ) {
      setFormData({ ...formData, jobName: "CREATE PACKAGE XML",
        buildType: "ant",
        jobDescription: "PACKAGEXML_CREATION",
        jobType: "CREATE PACKAGE XML",

        toolJobId : "",
        toolJobType: "",
        rollbackBranchName:"",
        stepIdXML:"",
        sfdcDestToolId: "",
      
      });
    } else {
      setFormData({ ...formData,
        sfdcToolId : "", accountUsername: "",
        // jobName: "",
        buildType: "gradle",
        jobDescription: "",
        jobType: "BUILD",
      
        toolJobId : "",
        toolJobType: "",
        rollbackBranchName:"",
        stepIdXML:"",
        sfdcDestToolId: "",
      
      });
    }
  };
  
  const handleXMLStepChange = (selectedOption) => {
    setFormData({ ...formData, stepIdXML: selectedOption._id });    
  };

  const searchRepositories = async (service, gitAccountId) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : service,
      metric : "getRepositories",
      gitAccountId: gitAccountId
    };
    //console.log(postBody);
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res.data && res.data.data ) {
        let arrOfObj = res.data.data;
        return arrOfObj;
      } else {
        setErrors("Account information is missing or unavailable!  Please ensure the required account is registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const searchBranches = async (service, gitAccountId, repoId) => {  
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/properties";   
    const postBody = {
      tool : service,
      metric : "getBranches",
      gitAccountId: gitAccountId,
      repoId : repoId
    };
    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      if( res.data && res.data.data ) {
        let arrOfObj = res.data.data;
        if(arrOfObj) {
          var result = arrOfObj.map(function(el) {
            var o = Object.assign({});
            o.value = el.toLowerCase();
            o.name = el;
            return o;
          });
          return result;
        }
      } else {
        setErrors("Account information is missing or unavailable!  Please ensure the required account is registered and up to date in Tool Registry.");
      }
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  };

  const createJob = async() => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/registry/action/${formData.toolConfigId}/createjob`;

    const postBody = {
      jobId: "",
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
        stepId: formData.stepIdXML && formData.stepIdXML,
      }
    };

    console.log("Creating Job: ", postBody);

    //create jenkins job
    let createJobResponse;
    try {      
      createJobResponse = await axiosApiService(accessToken).post(apiUrl, postBody);
      console.log("createJobResponse: ", createJobResponse);      
    } catch (error) {
      console.log("Error posting to API: ", error);
      setErrors(error);
      createJobResponse = error;
    }

    //update data for pipeline workflow step!!!
    if ( createJobResponse && createJobResponse.status === 200) {
      if (createJobResponse.data.message && createJobResponse.data.message.jobName && createJobResponse.data.message.jobName.length > 0) {
        // save jobName
        setFormData({ ...formData, jobName:  createJobResponse.data.message.jobName });
        // await callbackFunction();
      }
    } else if (createJobResponse.status !== 200) {
      setErrors("An error has occurred updating the Jenkins server with the job information.  This pipeline cannot proceed.  Please check the pipeline activity logs for more details.");
    }

  };

  // console.log(formData.toolJobType);
  // console.log(formData.jobType);
  // console.log(formData.toolJobId);
  // console.log(formData.rollbackBranchName);
  //console.log(formData);
  //console.log(formData.jobName);

  // console.log(formData.stepIdXML);
  // console.log(formData.sfdcDestToolId);
  
  const JenkinsPopover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Title as="h3">Tool Details</Popover.Title>
      <Popover.Content>
        <div className="text-muted mb-2">Information below is from the selected Tool Registry item.  To changes these values, edit the entry in Tool Registry.</div>
        <div className="mb-1">
          <div className="text-muted pr-1">Container URL:</div>
          <div>{formData.jenkinsUrl || ""}</div>
        </div>
        <div className="mb-1">
          <div className="text-muted pr-1">Port:</div>
          <div>{formData.jenkinsPort || ""}</div>
        </div>
        <div className="mb-1">
          <div className="text-muted pr-1">User ID:</div>
          <div>{formData.jUserId || ""}</div>
        </div>        
      </Popover.Content>
    </Popover>
  );

  
  const SFDCPopover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Title as="h3">Tool Details</Popover.Title>
      <Popover.Content>
        <div className="text-muted mb-2">Information below is from the selected Tool Registry item.  To changes these values, edit the entry in Tool Registry.</div>
        <div className="mb-1">
          <div className="text-muted pr-1">SFDC Account Username:</div>
          <div>{formData.accountUsername || ""}</div>
        </div>   
      </Popover.Content>
    </Popover>
  );
  
  const DestSFDCPopover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Title as="h3">Tool Details</Popover.Title>
      <Popover.Content>
        <div className="text-muted mb-2">Information below is from the selected Tool Registry item.  To changes these values, edit the entry in Tool Registry.</div>
        <div className="mb-1">
          <div className="text-muted pr-1">SFDC Account Username:</div>
          <div>{formData.destAccountUsername || ""}</div>
        </div>   
      </Popover.Content>
    </Popover>
  );
    
  const JobsPopover = (
    <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
      <Popover.Title as="h3">Job Details</Popover.Title>
      <Popover.Content>
        <div className="text-muted mb-2">Information below is from the selected Tool Registry item.  To changes these values, edit the entry in Tool Registry.</div>
        
        <div className="mb-1">
          <div className="text-muted pr-1">Tool Type:</div>
          <div>{formData.toolJobType || ""}</div>
        </div>
        <div className="mb-1">
          <div className="text-muted pr-1">Job Type:</div>
          <div>{formData.jobType || ""}</div>
        </div>
        {formData.rollbackBranchName && formData.rollbackBranchName.length>0 &&
         <div className="mb-1">
           <div className="text-muted pr-1">Rollback Branch:</div>
           <div>{formData.rollbackBranchName || ""}</div>
         </div>  
        }
           
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      {error && 
        <ErrorDialog  error={error} />
      }
      <Form>
        { formMessage.length > 0 ? <p className="error-text">{formMessage}</p> : null}

        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Registered Tool*</Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading Jenkins accounts from registry</div>
          ) :(
            <>
              {renderForm && jenkinsList && jenkinsList.length > 0 ? <>
                <DropdownList
                  data={jenkinsList}
                  value={ jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] }
                  valueField='id'
                  textField='name' 
                  placeholder= "Please select an account"
                  // defaultValue={formData.toolConfigId ? jenkinsList[jenkinsList.findIndex(x => x.id === formData.toolConfigId)] : jenkinsList[0]}
                  onChange={handleJenkinsChange}             
                /> 
                { formData.jenkinsUrl && formData.jenkinsUrl.length > 1 && 
                <div className="text-right pt-2">
                  <OverlayTrigger trigger="click" rootClose placement="left" overlay={JenkinsPopover}>
                    <Button variant="outline-dark" size="sm">Info</Button>
                  </OverlayTrigger>
                </div>
                } 
                
              </> : <>
                <div className="form-text text-muted p-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.  Please go to 
                  <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
              </> }
            </>

          )}
        </Form.Group>

        {(!formData.toolConfigId && formData.jenkinsUrl) &&
        <div className="form-text text-muted mb-3">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1 yellow" fixedWidth/> 
              Unregistered Tool settings in use.  The settings below can be used in this step, but cannot be updated.  You must register 
              a new Jenkins server in the 
          <Link to="/inventory/tools"> Tool Registry</Link> and add its configuration details. </div>}


        <Form.Group controlId="formBasicEmail">
          <Form.Label>Job Type*</Form.Label>
          {jobType !== undefined ?
            <DropdownList
              data={JOB_OPTIONS}
              valueField='id'
              textField='label'
              value={ JOB_OPTIONS[JOB_OPTIONS.findIndex(x => x.value === jobType)] }
              // defaultValue={jobType ? JOB_OPTIONS[JOB_OPTIONS.findIndex(x => x.value === jobType)] : JOB_OPTIONS[0]}
              placeholder= "Please select an account"
              onChange={handleJobTypeChange}             
            /> : null }
        </Form.Group>

        {jobType === "job"  &&
        <Form.Group controlId="branchField">
          <Form.Label>Job Name*</Form.Label>
          <Form.Control maxLength="150" disabled={false} type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
        </Form.Group>}

        {/* TODO: add jobs data here */}
        {jobType === "opsera-job"  &&
        <>

          {(formData.jenkinsUrl && jenkinsList.length > 1) &&                
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Select jobs*</Form.Label>
            {jobsList.length < 1 &&  <div className="form-text text-muted p-2">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No jobs have been created for <span>{formData.jenkinsUrl}</span>.  Please go to 
              <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in order to proceed. </div>
            }
            {jobsList !== undefined && jobsList.length > 0 ?
              <DropdownList
                data={jobsList}
                valueField='id'
                textField='name'
                value={jobsList[jobsList.findIndex(x => x._id === formData.toolJobId)] }
                // defaultValue={accountsList ? accountsList[accountsList.findIndex(x => x.toolId === formData.gitToolId)] : accountsList[0]}
                placeholder= "Please select a job"
                onChange={handleJobChange}             
              /> 
              : null }
          </Form.Group>
          }
          { formData.toolJobType && formData.toolJobType.length > 0 &&
          <>
            <div className="text-right pt-2">
              <OverlayTrigger trigger="click" rootClose placement="left" overlay={JobsPopover}>
                <Button variant="outline-dark" size="sm">Info</Button>
              </OverlayTrigger>
              
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Configure Job Settings" })} >
                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mx-1" fixedWidth
                  onClick={() => { handleEditClick(); }} />
              </OverlayTrigger>
              {/* <Button variant="outline-dark" size="sm" onClick={createJob} >Create Job</Button> */}
            </div>
            
          </>
          }
        </>        
        }

        {jobType === "sfdc-ant" || formData.toolJobType.includes("SFDC")  &&
          <Form.Group controlId="jenkinsList">
            <Form.Label>Select SFDC Tool Credentials*</Form.Label>
            {isSFDCSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading SFDC accounts from registry</div>
            ) :(
              <>
                {renderForm && sfdcList && sfdcList.length > 0 ? <>
                  <DropdownList
                    data={sfdcList}
                    value={sfdcList[sfdcList.findIndex(x => x.id === formData.sfdcToolId)]}
                    valueField='id'
                    textField='name'
                    // defaultValue={formData.sfdcToolId ? sfdcList[sfdcList.findIndex(x => x.id === formData.sfdcToolId)] : sfdcList[0]}
                    placeholder= "Please select an account"
                    onChange={handleSFDCChange}             
                  /> 
                  { formData.accountUsername && formData.accountUsername.length > 0 &&
                  <div className="text-right pt-2">
                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={SFDCPopover}>
                      <Button variant="outline-dark" size="sm">Info</Button>
                    </OverlayTrigger>
                  </div>
                  }
                  
                </> : <>
                  <div className="form-text text-muted p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for SFDC.  Please go to 
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
                </> }
              </>

            )}
          </Form.Group>
        } 


        {(formData.jenkinsUrl && jenkinsList.length > 1) &&                
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Select Account*</Form.Label>
            {accountsList.length < 1 &&  <div className="form-text text-muted p-2">
              <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No Credentials have been created for <span>{formData.jenkinsUrl}</span>.  Please go to 
              <Link to="/inventory/tools"> Tool Registry</Link> and add credentials for this Jenkins in order to proceed. </div>
            }
            {accountsList !== undefined && accountsList.length > 0 ?
              <DropdownList
                data={accountsList}
                valueField='toolId'
                textField='gitCredential'
                value={accountsList[accountsList.findIndex(x => x.toolId === formData.gitToolId)] }
                // defaultValue={accountsList ? accountsList[accountsList.findIndex(x => x.toolId === formData.gitToolId)] : accountsList[0]}
                placeholder= "Please select an account"
                onChange={handleAccountChange}             
              /> : null }
          </Form.Group>
        }
        
        {formData.service && formData.gitToolId && 
        <Form.Group controlId="account"  className="mt-2">
          <Form.Label>Select Repository*</Form.Label>
          {isRepoSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
              Loading repositories from registry</div>
          ) :(
            <>
              {repoList ?
                <DropdownList
                  data={repoList} 
                  value={repoList[repoList.findIndex(x => x.name === formData.repository)]}
                  valueField='value'
                  textField='name' 
                  placeholder= "Please select a repository"
                  // defaultValue={formData.repository ? repoList[repoList.findIndex(x => x.name === formData.repository)] : repoList[0]}
                  onChange={handleRepoChange}             
                /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group>  }

        
        {formData.service && formData.gitToolId && formData.repoId &&
        <Form.Group controlId="account"  className="mt-2">
          <Form.Label>Select Branch*</Form.Label>
          {isBranchSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
              Loading branches from selected repository</div>
          ) :(
            <>
              {branchList ?
                <DropdownList
                  data={branchList} 
                  value={branchList[branchList.findIndex(x => x.value === formData.branch)]}
                  valueField='value'
                  textField='name'
                  placeholder= "Please select a branch"
                  // defaultValue={formData.branch ? branchList[branchList.findIndex(x => x.value === formData.branch)] : branchList[0]}
                  onChange={handleBranchChange}             
                /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> }
            </>
          )}
          {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
        </Form.Group>  }

        {formData.jobType === "VALIDATE PACKAGE XML" || formData.jobType === "SFDC DEPLOY" ? (
          <Form.Group controlId="s3Step">
            <Form.Label>Generate XML Step Info*</Form.Label>
            {listOfSteps ?
              <DropdownList
                data={listOfSteps}
                value = {formData.stepIdXML ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.stepIdXML)] : listOfSteps[0]}
                valueField='_id'
                textField='name'
                placeholder="select step id for XML generation"
                // defaultValue={formData.stepIdXML ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.stepIdXML)] : listOfSteps[0]}
                onChange={handleXMLStepChange}             
              /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
          </Form.Group>) : (<></>)     
        }

        
        {formData.jobType === "SFDC FETCH AND DEPLOY" &&
        
        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Destination SFDC Tool Credentials*</Form.Label>
          {isSFDCSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/> 
            Loading SFDC accounts from registry</div>
          ) :(
            <>
              {renderForm && sfdcList && sfdcList.length > 0 ? <>
                <DropdownList
                  data={sfdcList}
                  value={sfdcList[sfdcList.findIndex(x => x.id === formData.sfdcDestToolId)]}
                  valueField='id'
                  textField='name'
                  placeholder= "Please select an account"
                  onChange={handleDestinationSFDCChange}             
                /> 
                { formData.destAccountUsername && formData.destAccountUsername.length > 0 &&
                  <div className="text-right pt-2">
                    <OverlayTrigger trigger="click" rootClose placement="left" overlay={DestSFDCPopover}>
                      <Button variant="outline-dark" size="sm">Info</Button>
                    </OverlayTrigger>
                  </div>
                }
                  
              </> : <>
                <div className="form-text text-muted p-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/> 
              No accounts have been registered for SFDC.  Please go to 
                  <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to proceed. </div>
              </> }
            </>

          )}
        </Form.Group>

        }
       
        
        {(formData.jenkinsUrl && jenkinsList.length > 1) &&
        <Form.Group controlId="formBasicCheckbox" className="mt-4 ml-1">
          <Form.Check type="checkbox" label="Enable Docker Build Support" 
            checked={formData.buildType === "docker" ? true : false} onChange={() => setFormData({ ...formData, buildType: formData.buildType === "docker" ? "gradle" : "docker", dockerTagName : "", dockerName: ""  })}  />  
          {/* <Form.Text className="text-muted"></Form.Text>       */}
        </Form.Group> }
      
        {formData.buildType === "docker" && 
        <>
          <Form.Group controlId="branchField">
            <Form.Label>Docker Name*</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" value={formData.dockerName || ""} onChange={e => setFormData({ ...formData, dockerName: e.target.value })} />
          </Form.Group>

          <Form.Group controlId="branchField">
            <Form.Label>Docker Tag*</Form.Label>
            <Form.Control maxLength="150" type="text" placeholder="" value={formData.dockerTagName || ""} onChange={e => setFormData({ ...formData, dockerTagName: e.target.value })} />
          </Form.Group>
          
        </> }

        <Form.Group controlId="threshold">
          <Form.Label>Success Threshold</Form.Label>
          <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
        </Form.Group>


        {jobType === "opsera-job"  ? 
          <Button variant="primary" type="button"  className="mt-3"
            onClick={() => { handleCreateAndSave(); }}> 
            {loading ? 
              <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Working</> :
              <><FontAwesomeIcon icon={faSave} className="mr-1"/>Create job and Save</> }
          </Button> :
          <Button variant="primary" type="button"  className="mt-3"
            onClick={() => { callbackFunction(); }}> 
            {loading ? 
              <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Saving</> :
              <><FontAwesomeIcon icon={faSave} className="mr-1"/> Save</> }
          </Button>      
        }
     
        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}


export default JenkinsStepConfiguration;

//disabled={(urlVal.length == 0 || userIdVal.length == 0 || authTokenVal.length == 0 || urlVal.length > 100 || portVal.length > 5 || userIdVal.length > 50 || authTokenVal.length > 500 || jobVal.length > 150)}