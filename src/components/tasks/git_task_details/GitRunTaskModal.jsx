import React, {useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import ModalBase from "components/common/modal/ModalBase";
import CloseButton from "components/common/buttons/CloseButton";
import RunGitTaskButton from "components/common/buttons/git/RunGitTaskButton";
import SFDCGitBranchInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitBranchInput";
import SFDCNewBranchBoolInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCNewBranchBoolInput";
import SfdcGitUpstreamBranchInput from "./configuration_forms/sfdc-org-sync/inputs/SfdcGitUpstreamBranchInput";
import sfdcGitTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/sfdc-git-task-configuration-metadata";
import ec2ClusterCreationTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/ecs-cluster-creation/ecs-creation-git-task-configuration";
import sfdxCertGenTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/sfdx-cert-gen/sfdx-cert-gen-task-configuration-metadata";
import branchToBranchGitTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/branch-to-branch/branch-to-branch-git-task-configuration";
import sfdcGitBranchTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/sfdc-branch-structure/sfdc-git-branch-structuring-task-configuration-metadata";
import ec2ServiceCreationTaskConfigurationMetadata from "components/tasks/git_task_details/configuration_forms/ecs-service-creation/ecs-service-creation-git-task-configuration";
import {AuthContext} from "contexts/AuthContext";
import SFDCGitBranchTextInput from "components/tasks/git_task_details/configuration_forms/sfdc-org-sync/inputs/SFDCGitBranchTextInput";
import workflowAuthorizedActions
from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {TASK_TYPES} from "components/tasks/task.types";
import SfdcOrgSyncPrerunHelpDocumentation
  from "components/common/help/documentation/tasks/SfdcOrgSyncPrerunHelpDocumentation";
import azureAksClusterTaskConfigurationMetadata
from "./configuration_forms/azure-cluster-creation/azure-cluster-metadata";
function GitRunTaskModal({ showModal, handleClose, gitTasksData, setGitTasksData, loadData }) {
  const [showHelp, setShowHelp] = useState(false);
  const [dataObj, setDataObj] = useState(undefined);
  const [canEdit, setCanEdit] = useState(false);
  const { getAccessRoleData } = useContext(AuthContext);
  
  useEffect(() => {
    loadRoles();
    loadConfig();
  }, []);

  const loadRoles = async() => {
    const customerAccessRules = await getAccessRoleData();
    const gitTask = gitTasksData.getPersistData();
    setCanEdit(workflowAuthorizedActions.gitItems(customerAccessRules, "edit_settings", gitTask.owner, gitTask.roles));
  };

  const loadConfig = () => {
    let configurationData;
    switch (gitTasksData.getData("type")) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdcGitTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdxCertGenTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), sfdcGitBranchTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.SYNC_GIT_BRANCHES:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), branchToBranchGitTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), ec2ClusterCreationTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), ec2ServiceCreationTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
        configurationData = modelHelpers.getToolConfigurationModel(gitTasksData.getData("configuration"), azureAksClusterTaskConfigurationMetadata);
        setDataObj({...configurationData});
        break;
      default:
        setDataObj(undefined);
    }
  };

  const getButtonContainer = () => {
    return (
      <>
        <CloseButton closeEditorCallback={handleClose} showUnsavedChangesMessage={false} />
        <RunGitTaskButton gitTasksData={gitTasksData} setGitTasksData={setGitTasksData} gitTasksConfigurationDataDto={dataObj} loadData={loadData} handleClose={handleClose} />
      </>
    );
  };

  const getRunView = () => {
    if (canEdit && gitTasksData?.getData("type") === TASK_TYPES.SYNC_SALESFORCE_REPO) {
      return (
        <div style={{minHeight: "400px"}}>
          <Row className={"m-3"}>
            <Col lg={12}>
              <SFDCGitBranchInput
                dataObject={dataObj}
                setDataObject={setDataObj}
                visible={!(dataObj?.getData("isNewBranch"))}/>
            </Col>
            <Col lg={12}>
              <SFDCNewBranchBoolInput dataObject={dataObj} setDataObject={setDataObj}/>
            </Col>
            {dataObj?.getData("isNewBranch") &&
            <>
              <Col lg={12}>
                <SFDCGitBranchTextInput
                  fieldName={"gitBranch"}
                  dataObject={dataObj} setDataObject={setDataObj} visible={dataObj?.getData("isNewBranch")}
                />
              </Col>
              {/* <Col lg={12}>
                    <SFDCHasUpstreamBoolInput dataObject={dataObj} setDataObject={setDataObj} />
                  </Col> */}
              <Col lg={12}>
                <SfdcGitUpstreamBranchInput dataObject={dataObj} setDataObject={setDataObj}/>
              </Col>
            </>
            }
          </Row>
        </div>
      );
    }
  };

  const getHelpComponent = () => {
    switch (gitTasksData?.getData("type")) {
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (<SfdcOrgSyncPrerunHelpDocumentation closeHelpPanel={() => setShowHelp(false)} /> );
      case TASK_TYPES.AWS_CREATE_ECS_CLUSTER:
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION:
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE:
      case TASK_TYPES.SYNC_GIT_BRANCHES:
      case TASK_TYPES.AWS_CREATE_ECS_SERVICE:
      case TASK_TYPES.AZURE_CLUSTER_CREATION:
      default:
        return null;
    }
  };

  if (gitTasksData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <ModalBase
      showModal={showModal}
      title="Opsera Task Confirmation"
      handleClose={handleClose}
      size={"xl"}
      buttonContainer={getButtonContainer()}
    >
      <OverlayPanelBodyContainer
        helpComponent={getHelpComponent()}
        helpIsShown={showHelp}
        setHelpIsShown={setShowHelp}
        hideCloseButton={true}
      >
        <div className={"mb-3 mx-3"}>Do you want to run {gitTasksData.getData("name")} task?</div>
        {getRunView()}
      </OverlayPanelBodyContainer>
    </ModalBase>
  );
}

GitRunTaskModal.propTypes = {
  gitTasksData: PropTypes.object,
  setActiveTab: PropTypes.func,
  setGitTasksData: PropTypes.func,
  loadData: PropTypes.func,
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default GitRunTaskModal;