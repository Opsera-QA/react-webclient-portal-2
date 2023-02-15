import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {auditLogNotificationConfigurationMetadata}
  from "components/notifications/details/configuration/audit_log/auditLogNotificationConfigurationMetadata";
import AuditLogNotificationMethodSelectInput
  from "components/notifications/details/configuration/audit_log/inputs/AuditLogNotificationMethodSelectInput";
import AuditLogActionsMultiSelectCheckboxInput
  from "components/common/audit_log/inputs/AuditLogActionsMultiSelectCheckboxInput";
import AuditLogNotificationTargetMultiSelectInput
  from "components/notifications/details/configuration/audit_log/inputs/AuditLogNotificationTargetMultiSelectInput";

// TODO: If this is used in multiple spots, we should rename it. If it just has trigger, I would suggest TriggerNotificationEditorPanel
export default function AuditLogNotificationConfigurationPanel(
  {
    notificationModel,
    setNotificationModel,
    notificationConfigurationModel,
    setNotificationConfigurationModel,
  }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationModel.getData("configuration"), auditLogNotificationConfigurationMetadata);
    setNotificationConfigurationModel({...configurationData});
  };

  if (notificationModel == null || notificationConfigurationModel == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Row>
      <Col lg={12}>
        <AuditLogNotificationMethodSelectInput
          model={notificationModel}
          setModel={setNotificationModel}
        />
      </Col>
      <Col lg={12}>
        <AuditLogNotificationTargetMultiSelectInput
          model={notificationModel}
          setModel={setNotificationModel}
        />
      </Col>
      <Col lg={12}>
        <AuditLogActionsMultiSelectCheckboxInput
          fieldName={"events"}
          model={notificationConfigurationModel}
          setModel={setNotificationConfigurationModel}
          type={notificationModel?.getData("method")}
        />
      </Col>
    </Row>
  );
}

AuditLogNotificationConfigurationPanel.propTypes = {
  notificationModel: PropTypes.object,
  setNotificationModel: PropTypes.func,
  notificationConfigurationModel: PropTypes.object,
  setNotificationConfigurationModel: PropTypes.func,
};