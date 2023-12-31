import React from "react";
import PropTypes from "prop-types";
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskAuditLogOverlay from "components/tasks/audit/TaskAuditLogOverlay";

export default function ViewTaskAuditLogsActionBarButton(
  {
    taskModel,
    className,
  }) {
  const {
    toastContext,
    isFreeTrial,
    isOpseraAdministrator,
  } = useComponentStateReference();

  const openOverlay = () => {
    toastContext.showOverlayPanel(
      <TaskAuditLogOverlay
        taskId={taskModel?.getMongoDbId()}
      />
    );
  };

  if (taskModel?.canViewAuditLogs() !== true || (isFreeTrial === true && isOpseraAdministrator !== true)) {
    return null;
  }

  return (
    <ActionBarPopoverButton
      className={className}
      icon={faShieldCheck}
      popoverText={`View Task Audit Logs`}
      onClickFunction={openOverlay}
    />
  );
}

ViewTaskAuditLogsActionBarButton.propTypes = {
  taskModel: PropTypes.object,
  className: PropTypes.string,
};