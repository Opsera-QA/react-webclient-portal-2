import React from "react";
import PropTypes from "prop-types";
import GitTaskTypeSelectInput from "components/common/list_of_values_input/git_tasks/GitTaskTypeSelectInput";
import SFDCGitTaskEditorPanel from "./sfdc-org-sync/SFDCGitTaskConfigurationPanel";
import SFDXCertGenTaskTypeConfigurationPanel from "./sfdx-cert-gen/SFDXCertGenTaskTypeConfigurationPanel";
import SFDCBranchStructuringTaskTypeConfigurationPanel from "./sfdc-branch-structure/SFDCBranchStructuringTaskTypeConfigurationPanel";
import BranchToBranchGitTaskConfigurationPanel from "./branch-to-branch/BranchToBranchGitTaskConfigurationPanel";
import ECSCreationTaskConfigurationPanel from "./ecs-cluster-creation/ECSCreationTaskConfigurationPanel";
import ECSServiceCreationTaskConfigurationPanel from "./ecs-service-creation/ECSServiceCreationTaskConfigurationPanel";
import AwsLambdaConfigurationPanel from "./aws-lambda-creation/AwsLambdaConfigurationPanel";

function GitTasksConfigurationPanel({ gitTasksDataDto, setGitTasksDataDto, gitTasksConfigurationData, setGitTasksConfigurationData, taskType }) {
  const getConfigurationPanel = () => {
    switch (taskType) {
      case "sync-sfdc-repo":
        return (
          <SFDCGitTaskEditorPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "sfdc-cert-gen":
        return (
          <SFDXCertGenTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "sync-branch-structure":
        return (
          <SFDCBranchStructuringTaskTypeConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        ); 
      case "sync-git-branches":
        return (
          <BranchToBranchGitTaskConfigurationPanel 
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "ecs_cluster_creation":
        return (
          <ECSCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
        case "ecs_service_creation":
        return (
          <ECSServiceCreationTaskConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "lambda_function_creation":
        return (
          <AwsLambdaConfigurationPanel
            gitTasksDataDto={gitTasksDataDto}
            setGitTasksConfigurationData={setGitTasksConfigurationData}
            gitTasksConfigurationData={gitTasksConfigurationData}
          />
        );
      case "":
      default:
        return <div className="text-center text-muted p-5">You must select a task type before configuring task details.</div>;
    }
  };

  const handleGitTaskTypeChange = (fieldName, value) => {
    let newDataObject = gitTasksDataDto;
    newDataObject.setData("type", value.value);
    newDataObject.setData("configuration", {});
    setGitTasksConfigurationData(undefined);
    setGitTasksDataDto({...newDataObject});
  };

  return (
    <div>
      <div>
        <GitTaskTypeSelectInput setDataFunction={handleGitTaskTypeChange} dataObject={gitTasksDataDto} setDataObject={setGitTasksDataDto} />
      </div>
      {getConfigurationPanel()}
    </div>
  );
}

GitTasksConfigurationPanel.propTypes = {
  taskType: PropTypes.string,
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
  setGitTasksDataDto: PropTypes.func
};

export default GitTasksConfigurationPanel;
