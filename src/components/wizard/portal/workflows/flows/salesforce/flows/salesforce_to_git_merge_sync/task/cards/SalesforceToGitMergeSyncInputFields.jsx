import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayWizardButtonContainerBase from "../../../../../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterAccountContainer from "../../../../../tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../../../../temp-library-components/button/VanityButtonBase";
import H5FieldSubHeader from "../../../../../../../../../common/fields/subheader/H5FieldSubHeader";
import TextInputBase from "../../../../../../../../../common/inputs/text/TextInputBase";
import SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput";
import SalesforceToGitMergeSyncTaskRepositorySelectInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskRepositorySelectInput";
import SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput";
import SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput";
import { mergeSyncTaskConfigurationMetadata } from "../../../../../../../../../tasks/details/tasks/merge_sync_task/mergeSyncTaskConfiguration.metadata";
import { TASK_TYPES } from "../../../../../../../../../tasks/task.types";
import { mergeSyncTaskSalesforceConfigurationMetadata } from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/mergeSyncTaskSalesforceConfiguration.metadata";
import { mergeSyncTaskGitConfigurationMetadata } from "../../../../../../../../../tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput";
import SalesforceToGitMergeSyncTaskTargetBranchSelectInput from "../../../../../../../../../tasks/details/tasks/merge_sync_task/salesforce_to_git/inputs/SalesforceToGitMergeSyncTaskTargetBranchSelectInput";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

function SalesforceToGitMergeSyncInputFields({
  taskModel,
  setTaskModel,
  setButtonContainer,
  handleClose,
  onSuccessFunction,
}) {
  const [taskConfigurationModel, setTaskConfigurationModel] = useState(
    modelHelpers.parseObjectIntoModel(
      taskModel?.configuration,
      mergeSyncTaskConfigurationMetadata,
    ),
  );
  const [salesforceConfigurationModel, setSalesforceConfigurationModel] =
    useState(
      modelHelpers.parseObjectIntoModel(
        taskModel?.configuration.sfdc,
        mergeSyncTaskSalesforceConfigurationMetadata,
      ),
    );
  const [gitConfigurationModel, setGitConfigurationModel] = useState(
    modelHelpers.parseObjectIntoModel(
      taskModel?.configuration.git,
      mergeSyncTaskGitConfigurationMetadata,
    ),
  );
  const [parentConfig, setParentConfig] = useState(modelHelpers.parseObjectIntoModel(taskModel, tasksMetadata));

  useEffect(() => {
    // loadData();
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase>
          {getButtons()}
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, []);

  const updateToolSpecificDetails = () => {
    let newDataObject = taskModel;
    newDataObject.configuration = taskConfigurationModel.getPersistData();
    newDataObject.name = parentConfig?.getData("name");
    newDataObject.description = parentConfig?.getData("description");
    setTaskModel(newDataObject);
    onSuccessFunction();
  };

  const getButtons = () => {
    return (
      <VanityButtonBase
        busyText={"Saving"}
        disabled={false}
        buttonState={"ready"}
        onClickFunction={updateToolSpecificDetails}
        customLabel={"Next"}
        normalText={"Next"}
        icon={faArrowRight}
        variant={"success"}
      />
    );
  };

  const loadData = async () => {
    const configurationData = modelHelpers.parseObjectIntoModel(
      taskModel?.getData("configuration"),
      mergeSyncTaskConfigurationMetadata,
    );
    configurationData?.setData(
      "jobType",
      TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
    );
    setTaskConfigurationModel({ ...configurationData });
    const newSalesforceSyncModel = modelHelpers.parseObjectIntoModel(
      configurationData?.getData("sfdc"),
      mergeSyncTaskSalesforceConfigurationMetadata,
    );
    newSalesforceSyncModel?.setData(
      "jobType",
      TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
    );
    setSalesforceConfigurationModel({ ...newSalesforceSyncModel });
    const newGitSyncModel = modelHelpers.parseObjectIntoModel(
      configurationData?.getData("git"),
      mergeSyncTaskGitConfigurationMetadata,
    );
    newGitSyncModel?.setData(
      "jobType",
      TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC,
    );
    setGitConfigurationModel({ ...newGitSyncModel });
  };

  const setSalesforceModelFunction = (newModel) => {
    setSalesforceConfigurationModel({ ...newModel });
    taskConfigurationModel?.setData(
      "sfdc",
      salesforceConfigurationModel?.getPersistData(),
    );
    setTaskConfigurationModel({ ...taskConfigurationModel });
  };

  const setGitModelFunction = (newModel) => {
    setGitConfigurationModel({ ...newModel });
    taskConfigurationModel?.setData(
      "git",
      gitConfigurationModel?.getPersistData(),
    );
    setTaskConfigurationModel({ ...taskConfigurationModel });
  };

  const getDestinationBranchInputs = () => {
    if (gitConfigurationModel?.getData("isNewBranch") === true) {
      return (
        <>
          <Col lg={12}>
            <SalesforceToGitMergeSyncTaskUpstreamBranchSelectInput
              model={gitConfigurationModel}
              setModel={setGitModelFunction}
            />
          </Col>
          <Col lg={12}>
            <TextInputBase
              dataObject={gitConfigurationModel}
              setDataObject={setGitModelFunction}
              fieldName={"targetBranch"}
            />
          </Col>
        </>
      );
    }

    return (
      <Col lg={12}>
        <SalesforceToGitMergeSyncTaskTargetBranchSelectInput
          model={gitConfigurationModel}
          setModel={setGitModelFunction}
          sourceBranch={gitConfigurationModel?.getData("sourceBranch")}
        />
      </Col>
    );
  };

  const getJiraInputs = () => {
    return (
      <>
        {/*<Col lg={12}>*/}
        {/*  <SalesforceMergeSyncTaskJiraToolSelectInput*/}
        {/*    model={salesforceConfigurationModel}*/}
        {/*    setModel={setSalesforceConfigurationModel}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col lg={12}>*/}
        {/*  <SalesforceMergeSyncTaskJiraProjectSelectInput*/}
        {/*    model={salesforceConfigurationModel}*/}
        {/*    setModel={setSalesforceConfigurationModel}*/}
        {/*    jiraToolId={salesforceConfigurationModel?.getData("jiraToolId")}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col lg={12}>*/}
        {/*  <SalesforceMergeSyncTaskJiraIssueSelectInput*/}
        {/*    model={salesforceConfigurationModel}*/}
        {/*    setModel={setSalesforceConfigurationModel}*/}
        {/*    jiraToolId={salesforceConfigurationModel?.getData("jiraToolId")}*/}
        {/*    jiraProjectKey={salesforceConfigurationModel?.getData(*/}
        {/*      "jiraProjectKey",*/}
        {/*    )}*/}
        {/*  />*/}
        {/*</Col>*/}
      </>
    );
  };

  if (taskModel == null || taskConfigurationModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <CreateWorkflowWizardRegisterAccountContainer>
      <div className={"mt-3"}>
        <h4>Additional Task Configuration</h4>
        <H5FieldSubHeader
          subheaderText={`Complete the additional task configuration options before running the task.`}
        />
      </div>
      <Row>
        <Col lg={12}>
          <TextInputBase dataObject={parentConfig} setDataObject={setParentConfig} fieldName={"name"} />
        </Col>
        <Col lg={12}>
          <TextInputBase dataObject={parentConfig} setDataObject={setParentConfig} fieldName={"description"} />
        </Col>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskBitbucketWorkspaceSelectInput
            model={gitConfigurationModel}
            setModel={setGitModelFunction}
          />
        </Col>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskRepositorySelectInput
            model={gitConfigurationModel}
            setModel={setGitModelFunction}
          />
        </Col>
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput
            model={gitConfigurationModel}
            setModel={setGitModelFunction}
          />
        </Col>
        {getDestinationBranchInputs()}
        {/*{getJiraInputs()}*/}
        <Col lg={12}>
          <SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput
            model={salesforceConfigurationModel}
            setModel={setSalesforceModelFunction}
          />
        </Col>
        <Col lg={12}>
          <TextInputBase
            dataObject={salesforceConfigurationModel}
            setDataObject={setSalesforceModelFunction}
            fieldName={"packageXmlReferencePath"}
            visible={
              salesforceConfigurationModel?.getData("includePackageXml") ===
              true
            }
          />
        </Col>
      </Row>
    </CreateWorkflowWizardRegisterAccountContainer>
  );
}

SalesforceToGitMergeSyncInputFields.propTypes = {
  taskModel: PropTypes.object,
  setTaskModel: PropTypes.func,
  setButtonContainer: PropTypes.func,
  handleClose: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

export default SalesforceToGitMergeSyncInputFields;
