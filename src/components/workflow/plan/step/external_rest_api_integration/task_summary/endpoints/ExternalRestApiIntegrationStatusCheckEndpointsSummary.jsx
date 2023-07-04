import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import StandaloneDateField from "components/common/fields/date/StandaloneDateField";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";

export default function ExternalRestApiIntegrationStatusCheckEndpointsSummary(
  {
    externalRestApiIntegrationStepTaskModel,
    className,
  }) {
  const statusCheckRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.message");
  const lastStatusCheckTimestamp = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_timestamp");
  const statusCheckConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.connectionCheckEndpoint");
  const statusCheckHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.headerTokenEndpoint");
  const statusCheckStatusCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.statusCheckEndpoint");
  const statusCheckCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.last_status_check_request.endpoints.runTriggerEndpoint");

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={"Latest Status Check"} />
      <StandaloneDateField
        label={"Last Status Check Timestamp"}
        date={lastStatusCheckTimestamp}
        dateFormat={DateFormatHelper.DATE_FORMATS.TIMESTAMP}
      />
      <ExternalRestApiIntegrationConnectionCheckEndpointResponseSummary
        requestType={"Status Check"}
        endpoint={statusCheckConnectionCheckEndpoint}
      />
      <ExternalRestApiIntegrationHeaderTokenEndpointResponseSummary
        requestType={"Status Check"}
        endpoint={statusCheckHeaderTokenEndpoint}
      />
      <StandaloneJsonField
        titleText={"Status Check Endpoint"}
        json={statusCheckStatusCheckEndpoint}
      />
    </div>
  );
}

ExternalRestApiIntegrationStatusCheckEndpointsSummary.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  className: PropTypes.string,
};
