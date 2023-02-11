import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import TriggerSalesforceBranchStructureTaskRunButton
  from "components/tasks/details/tasks/sfdc-branch-structure/run/TriggerSalesforceBranchStructureTaskRunButton";
import CancelButton from "components/common/buttons/CancelButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import {
  SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS
} from "components/tasks/details/tasks/sfdc-branch-structure/run/SalesforceBranchStructureTaskInitializationOverlay";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

export default function SalesforceBranchStructureTaskRunTaskConfirmationScreen(
  {
    taskModel,
    setCurrentScreen,
  }) {
  const { toastContext } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Salesforce Branch Structure Task Initialization`}
      titleIcon={faFileInvoice}
      showToasts={true}
      showCloseButton={false}
    >
    <div className={"m-3"}>
      <H5FieldSubHeader
        subheaderText={"Trigger Task Run?"}
      />
      <div className={"mx-3 mb-3 mt-1"}>
        Do you want to run this Task: {taskModel?.getData("name")}?
        <ButtonContainerBase
          className={"mt-3"}
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={() => setCurrentScreen(SALESFORCE_BRANCH_STRUCTURE_TASK_INITIALIZATION_SCREENS.PRE_RUN_TASK_SCREEN)}
            />
          }
        >
          <CancelButton
            size={"1x"}
            cancelFunction={toastContext.clearOverlayPanel}
          />
          <TriggerSalesforceBranchStructureTaskRunButton
            taskModel={taskModel}
            setCurrentScreen={setCurrentScreen}
          />
        </ButtonContainerBase>
      </div>
    </div>
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceBranchStructureTaskRunTaskConfirmationScreen.propTypes = {
  taskModel: PropTypes.object,
  setCurrentScreen: PropTypes.func,
};