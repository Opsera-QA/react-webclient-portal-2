import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import pipelineActions from "components/workflow/pipeline-actions";

function JenkinsJobInput({ jenkinsId, visible, typeFilter, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled, configurationRequired}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jenkinsTools, setJenkinsTools] = useState([]);
  const [jenkinsJobs, setJenkinsJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJenkinsJobs([]);
    if (jenkinsId !== "" && jenkinsId != null) {
      loadJenkinsJobs();
    }
  }, [jenkinsId, jenkinsTools]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async () => {
    const response = await pipelineActions.getToolsList("jenkins", getAccessToken);

    if (response && Array.isArray(response)) {
      if (configurationRequired) {
        const filteredTools = response?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0 });
        setJenkinsTools(filteredTools)
      }
      else {
        setJenkinsTools(response);
      }
    }
  };

  const loadJenkinsJobs = () => {
    setIsLoading(true);
    const index = jenkinsTools.findIndex((x) => x.id === jenkinsId);
    const jobs = index && jenkinsTools[index]?.jobs ? jenkinsTools[index].jobs : [];

    if (jobs.length > 0 && typeFilter) {
      let filteredJobs = jobs.filter((job) => {return job.type[0] === typeFilter});
      setJenkinsJobs(filteredJobs);
    }
    else {
      setJenkinsJobs(jobs);
    }

    setIsLoading(false);
  };

  const getNoJobsMessage = () => {
    if (!isLoading && (jenkinsJobs == null || jenkinsJobs.length === 0 && jenkinsId !== "")) {
      return (
        <div className="form-text text-muted p-2">
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No configured {`${typeFilter} `}Jenkins Jobs have been registered for this <span className="upper-case-first">Jenkins</span> tool.
        </div>
      )
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={jenkinsJobs}
        busy={isLoading}
        valueField="name"
        textField="name"
        clearDataFunction={clearDataFunction}
        disabled={disabled || isLoading || jenkinsId === "" || jenkinsJobs?.length === 0}
      />
      {getNoJobsMessage()}
    </div>
  );
}

JenkinsJobInput.propTypes = {
  jenkinsId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  typeFilter: PropTypes.string,
  configurationRequired: PropTypes.bool
};

JenkinsJobInput.defaultProps = {
  visible: true,
}

export default JenkinsJobInput;