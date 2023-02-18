import React from "react";
import PropTypes from "prop-types";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import ToolMultiSelectInput from "components/common/list_of_values_input/inventory/ToolMultiSelectInput";
import TaskMultiSelectInput from "components/common/list_of_values_input/tasks/TaskMultiSelectInput";
import PipelineSelectionPanel from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionPanel";
import PipelinesListFieldBase from "components/common/fields/pipelines/list/PipelinesListFieldBase";

export default function AuditLogNotificationTargetField(
  {
    fieldName,
    model,
  }) {
  const objectType = model?.getData("method");

  // if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TASK) {
  //   return (
  //     <TaskMultiSelectInput
  //       model={model}
  //       setModel={setModel}
  //       fieldName={fieldName}
  //       disabled={disabled}
  //     />
  //   );
  // }
  //
  // if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TOOL_REGISTRY) {
  //   return (
  //     <ToolMultiSelectInput
  //       model={model}
  //       setModel={setModel}
  //       fieldName={fieldName}
  //       disabled={disabled}
  //     />
  //   );
  // }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE) {
    return (
      <PipelinesListFieldBase
        model={model}
        fieldName={fieldName}
        customTitle={"Notify on These Pipelines"}
      />
    );
  }

  return null;
}

AuditLogNotificationTargetField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

AuditLogNotificationTargetField.defaultProps = {
  fieldName: "target"
};