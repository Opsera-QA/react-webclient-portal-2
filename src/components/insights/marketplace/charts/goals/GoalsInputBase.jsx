import React from "react";
import PropTypes from "prop-types";
import SalesforceDurationByStageGoals from "components/insights/marketplace/charts/goals/salesforce_duration_by_stage/SalesforceDurationByStageGoals";
import BuildAndDeployGoals from "components/insights/marketplace/charts/goals/build_and_deploy_statistics/BuildAndDeployGoals";

function GoalsInputBase({ dataObject, setDataObject, kpiName }) {
  switch (kpiName) {
    case "salesforce-duration-by-stage":
      return (
        <SalesforceDurationByStageGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />
      );
    case "build-deployment-statistics":
      return <BuildAndDeployGoals kpiConfigurationData={dataObject} setKpiConfigurationData={setDataObject} />;
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
