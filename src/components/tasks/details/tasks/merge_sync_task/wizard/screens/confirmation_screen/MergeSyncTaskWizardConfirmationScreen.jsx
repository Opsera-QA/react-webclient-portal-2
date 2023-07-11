import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import TriggerMergeSyncTaskButton from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/TriggerMergeSyncTaskButton";
import { MERGE_SYNC_WIZARD_SCREENS } from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardSelectedCommitTable from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_commits_table/MergeSyncTaskWizardSelectedCommitTable";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import MergeSyncTaskWizardSelectedDeltasVerticalTabContainer from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_deltas_table/MergeSyncTaskWizardSelectedDeltasVerticalTabContainer";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import ConflictFilesTable from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/conflict_files_table/ConflictFilesTable";

const MergeSyncTaskWizardConfirmationScreen = (
  {
    wizardModel,
    setCurrentScreen,
    handleClose,
    setWizardModel,
  }) => {
  if (wizardModel == null) {
    return null;
  }

  const getFileSelectionTable = () => {
    if (wizardModel?.getArrayData("updatedFileList")?.length > 0) {
      return (
        <Col xs={6}>
          <MergeSyncTaskWizardSelectedCommitTable
            sourceCommitList={wizardModel?.getArrayData("updatedFileList")}
          />
        </Col>
      );
    }

    const updatedFileDeltas = wizardModel?.getArrayData("updatedFileDeltas");
    if (updatedFileDeltas.length > 0) {
      return (
        <Col xs={6}>
          <MergeSyncTaskWizardSelectedDeltasVerticalTabContainer
            updatedFileDeltas={updatedFileDeltas}
          />
        </Col>
      );
    }
  };

  const getConflictFilesTable = () => {
    if (wizardModel?.getArrayData("conflictFilesList") && wizardModel?.getArrayData("conflictFilesList").length > 0) {
      return (
        <Col xs={6}>
          <ConflictFilesTable sourceCommitList={wizardModel?.getArrayData("conflictFilesList")} />
        </Col>
      );
    }
  };

  return (
    <div>
      <div className="h5">Merge Sync Task Wizard: Confirmation Screen</div>
      <div className="text-muted">Would you like to trigger the Merge Sync for these files?</div>
      <div className={"my-3"}>
        <InlineWarning warningMessage={`
          Please Note: All files will merge in the incoming changes from the Source Branch unless otherwise selected. 
          The summary below only contains the manually selected changes.
       `}
        />
        <Row className="my-3">
          {getFileSelectionTable()}
          {getConflictFilesTable()}
        </Row>
      </div>
      <TextAreaInput
        dataObject={wizardModel}
        setDataObject={setWizardModel}
        fieldName={"commitMessage"}
      />
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => { setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.COMMIT_SELECTION_SCREEN); }}
        />
        <TriggerMergeSyncTaskButton
          wizardModel={wizardModel}
          handleClose={handleClose}
        />
        <CancelButton
          className={"ml-2"}
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
        />
      </SaveButtonContainer>
    </div>
  );
};

MergeSyncTaskWizardConfirmationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default MergeSyncTaskWizardConfirmationScreen;
