import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import SFDCViewOverlay from "components/git/git_task_details/configuration_forms/sfdc-org-sync/SFDCViewOverlay";

function RunGitTaskButton({gitTasksData, handleClose, disable, className, loadData }) {
  let toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  const handleRunGitTask = async() => {    
    if (gitTasksData.getData("type") === "sync-sfdc-repo") {  
      // open wizard views
      toastContext.showOverlayPanel(<SFDCViewOverlay gitTasksData={gitTasksData}/>);
      return;
    }    
    if (gitTasksData.getData("type") === "sync-branch-structure") {  
      // pipeline action call to trigger branch conversion
      let postBody = {
        "gitTaskId":gitTasksData.getData("_id")
      };
      await sfdcPipelineActions.gitTaskTrigger(getAccessToken, postBody);
      return;
    }
    handleClose();
  };


  return (
    <div className={className}>
      <Button
        variant={"success"}
        disabled={gitTasksData?.getData("status") === "running" || disable}
        onClick={() => {handleRunGitTask(true);}}
      >
        <span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/>Run Task</span>
      </Button>
    </div>
  );
}

RunGitTaskButton.propTypes = {
  gitTasksData: PropTypes.object,
  loadData: PropTypes.func,
  disable: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func
};

export default RunGitTaskButton;