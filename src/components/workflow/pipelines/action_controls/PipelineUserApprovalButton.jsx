import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StepApprovalOverlay from "components/workflow/StepApprovalOverlay";
import PipelineInstructionsAcknowledgementOverlay
  from "components/workflow/pipelines/pipeline_details/workflow/acknowledgement/PipelineInstructionsAcknowledgementOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineHelpers from "components/workflow/pipelineHelpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import PipelineActionControlButtonBase
  from "components/workflow/pipelines/action_controls/PipelineActionControlButtonBase";
import { faFlag } from "@fortawesome/pro-light-svg-icons";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function PipelineUserApprovalButton(
  {
    pipeline,
    loadPipelineFunction,
  }) {
  const {
    toastContext,
    userData,
  } = useComponentStateReference();
  const isPaused = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.last_step.running.paused");
  const approvalStep = PipelineHelpers.getPendingApprovalStep(pipeline);
  const approvalStepToolIdentifier = PipelineHelpers.getToolIdentifierFromPipelineStep(approvalStep);

  const handleApprovalClick = () => {
    toastContext.showOverlayPanel(
      <StepApprovalOverlay
        pipelineId={pipeline?._id}
        loadPipelineFunction={loadPipelineFunction}
      />,
    );
  };

  const handleAcknowledgementClick = () => {
    toastContext.showOverlayPanel(
      <PipelineInstructionsAcknowledgementOverlay
        pipelineId={pipeline?._id}
        loadPipelineFunction={loadPipelineFunction}
      />,
    );
  };

  if (isPaused !== true) {
    return null;
  }

  if (approvalStepToolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.USER_ACTION) {
    return (
      <PipelineActionControlButtonBase
        icon={faFlag}
        normalText={"Acknowledge Action"}
        tooltipText={"A user action is required before this pipeline can proceed. Click here to see the instructions and complete the task."}
        onClickFunction={handleAcknowledgementClick}
        variant={"warning"}
      />
    );
  }

  return (
    <PipelineActionControlButtonBase
      icon={faFlag}
      normalText={"Approve Run"}
      tooltipText={"Approve the current pipeline run in order for it to proceed. Only Pipeline Admins and Managers (via Pipeline Access Rules) are permitted to perform this action."}
      onClickFunction={handleApprovalClick}
      disabled={PipelineRoleHelper.canAuthorizeApprovalGate(userData, pipeline) !== true}
      variant={"warning"}
    />
  );
}

PipelineUserApprovalButton.propTypes = {
  pipeline: PropTypes.object,
  loadPipelineFunction: PropTypes.func,
};
