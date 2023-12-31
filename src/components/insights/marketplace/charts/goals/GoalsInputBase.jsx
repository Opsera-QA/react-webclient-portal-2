import React from "react";
import PropTypes from "prop-types";
import SalesforceDurationByStageGoals from "components/insights/marketplace/charts/goals/salesforce_duration_by_stage/SalesforceDurationByStageGoals";
import SdlcDurationStatisticsGoals from "components/insights/marketplace/charts/goals/sdlc_duration_statistics/SdlcDurationStatisticsGoals";
import BuildAndDeployGoals from "components/insights/marketplace/charts/goals/build_and_deploy_statistics/BuildAndDeployGoals";
import ServicenowMeanTimeToResolutionGoals from "./servicenow_mean_time_to_resolution/ServicenowMeanTimeToResolutionGoals";
import ServicenowMeanTimeToAcknowledgementGoals from "./servicenow_mean_time_to_acknowledge/ServicenowMeanTimeToAcknowledgementGoals";
import DeploymentFrequencyGoals from "./gitlab_deployment_freqnency_statistics/DeploymentFrequencyGoals";
function GoalsInputBase({ dataObject, setDataObject, kpiName }) {
  switch (kpiName) {
    case "salesforce-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
    case "sdlc-duration-statistics":
      return <SdlcDurationStatisticsGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />;
    case "build-deployment-statistics":
      return <BuildAndDeployGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />;
    case "servicenow-mean-time-to-resolution":
      return (
        <ServicenowMeanTimeToResolutionGoals
          kpiConfigurationData={dataObject}
          setKpiConfigurationData={setDataObject}
        />
      );
    case "servicenow-mean-time-to-acknowledge":
      return (
        <ServicenowMeanTimeToAcknowledgementGoals
          kpiConfigurationData={dataObject}
          setKpiConfigurationData={setDataObject}
        />
      );
      case "gitlab-deployment-frequency":
        return <DeploymentFrequencyGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />;
  }
}

GoalsInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  kpiName: PropTypes.string,
};

GoalsInputBase.defaultProps = {
  fieldName: "value",
};

export default GoalsInputBase;
