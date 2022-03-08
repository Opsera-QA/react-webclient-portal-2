import React from "react";
import PropTypes from "prop-types";
import MetricDataPointEvaluationRulesInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/MetricDataPointEvaluationRulesInput";

function MetricStrategicCriteriaPanel({model, setModel, strategicCriteria}) {
  return (
    <div className={"mt-2"}>
      <MetricDataPointEvaluationRulesInput
        model={model}
        setModel={setModel}
        strategicCriteria={strategicCriteria}
        fromDashboardMetric={false}
      />
    </div>
  );
}

MetricStrategicCriteriaPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  strategicCriteria: PropTypes.object,
};

export default MetricStrategicCriteriaPanel;