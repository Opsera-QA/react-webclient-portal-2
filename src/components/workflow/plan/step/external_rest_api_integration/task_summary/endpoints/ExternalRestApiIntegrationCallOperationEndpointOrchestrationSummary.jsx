import React from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary";
import ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";

export default function ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary(
  {
    externalRestApiIntegrationStepTaskModel,
    className,
  }) {
  const runRequestConnectionCheckEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.connectionCheckEndpoint");
  const runRequestHeaderTokenEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.headerTokenEndpoint");
  const runRequestRuleEvaluation = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.ruleEvaluation");
  const runRequestCallOperationEndpoint = externalRestApiIntegrationStepTaskModel?.getData("api_response.run_request.endpoints.runTriggerEndpoint");

  if (externalRestApiIntegrationStepTaskModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={"Call Operation"} />
      <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
        ruleEvaluation={runRequestRuleEvaluation}
      />
      <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
        endpointType={"Call Operation"}
        endpoint={runRequestCallOperationEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary
        endpoint={runRequestHeaderTokenEndpoint}
        className={"mt-2"}
      />
      <ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary
        endpoint={runRequestConnectionCheckEndpoint}
        className={"mt-2"}
      />
    </div>
  );
}

ExternalRestApiIntegrationCallOperationEndpointOrchestrationSummary.propTypes = {
  externalRestApiIntegrationStepTaskModel: PropTypes.object,
  className: PropTypes.string,
};