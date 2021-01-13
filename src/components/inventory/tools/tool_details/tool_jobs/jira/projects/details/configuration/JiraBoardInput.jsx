import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import pipelineStepNotificationActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";

// TODO: Make base
function JiraBoardInput({visible, jiraToolId, dataObject, setDataObject, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setBoards([]);
    if (jiraToolId !== "") {
      loadData();
    }
  }, [jiraToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadProjects();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadProjects = async () => {
    const response = await pipelineStepNotificationActions.getJiraBoardsWithId(jiraToolId, getAccessToken);

    if (Array.isArray(response?.data?.message)) {
      setBoards(response.data.message);
    }
  };


  const setJiraBoard = (selectedOption) => {
    let newDataObject = {...selectedOption};
    newDataObject.setData("jiraSprint", "");
    newDataObject.setData("jiraParentTicket", "");
    setDataObject({...newDataObject});
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Jira Boards";
    }

    if (jiraToolId === "") {
      return "A Jira Tool must be selected before selecting Jira Board";
    }

    if (!isLoading && jiraToolId !== "" && boards.length === 0) {
      return "No Jira Boards found for selected Jira tool.";
    }
  };

  if (!visible) {
    return <></>;
  }

  return (
    <SelectInputBase
      fieldName={"jiraBoard"}
      dataObject={dataObject}
      setDataObject={setJiraBoard}
      selectOptions={boards}
      busy={isLoading}
      placeholderText={getPlaceholderText()}
      valueField="id"
      textField="name"
      disabled={disabled || isLoading || jiraToolId === null || boards.length === 0}
    />
  );
}

JiraBoardInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  jiraToolId: PropTypes.string,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

JiraBoardInput.defaultProps = {
  visible: true
}

export default JiraBoardInput;