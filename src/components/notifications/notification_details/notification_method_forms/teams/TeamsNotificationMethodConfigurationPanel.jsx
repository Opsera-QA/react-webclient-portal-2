import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import teamsNotificationMetadata from "components/notifications/notification_details/notification_method_forms/teams/teamsNotificationMetadata";
import TeamsStepNotificationToolInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/teams/TeamsStepNotificationToolInput";

function TeamsNotificationMethodConfigurationPanel({ notificationDataDto, notificationMethodDataDto, setNotificationMethodDataDto }) {
  useEffect(() => {loadData();}, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(notificationDataDto.getData("notification"), teamsNotificationMetadata );
    setNotificationMethodDataDto({...configurationData});
  };

  // TODO: Make tool registry connection message component
  const getTeamsMessage = () => {
    return (
      <small className="form-text text-muted px-2">
        Please Note: You must connect to Microsoft Teams on the
        <Link to="/inventory/tools"><FontAwesomeIcon icon={faClipboardList} className="mx-1"/>Tool Registry</Link> page in order to use this feature.
      </small>
    );
  };

  if (notificationDataDto == null || notificationMethodDataDto == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="mb-4">
      {getTeamsMessage()}
      <TeamsStepNotificationToolInput setDataObject={setNotificationMethodDataDto} dataObject={notificationMethodDataDto} />
    </div>
  );
}

TeamsNotificationMethodConfigurationPanel.propTypes = {
  notificationDataDto: PropTypes.object,
  notificationMethodDataDto: PropTypes.object,
  setNotificationMethodDataDto: PropTypes.func
};

export default TeamsNotificationMethodConfigurationPanel;


