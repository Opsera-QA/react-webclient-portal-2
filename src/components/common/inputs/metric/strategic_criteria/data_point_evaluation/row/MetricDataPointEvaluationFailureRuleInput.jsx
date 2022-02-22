import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import MetricDataPointEvaluationRuleInputBase
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/MetricDataPointEvaluationRuleInputBase";

function MetricDataPointEvaluationFailureRuleInput(
  {
    dataPointEvaluationRules,
    updateRuleFunction,
  }) {
  return (
    <MetricDataPointEvaluationRuleInputBase
      ruleData={dataPointEvaluationRules?.failure_rule}
      fieldName={"failure_rule"}
      updateRuleFunction={updateRuleFunction}
      title={"Failure Criteria"}
      icon={faExclamationCircle}
    />
  );
}

MetricDataPointEvaluationFailureRuleInput.propTypes = {
  dataPointEvaluationRules: PropTypes.object,
  updateRuleFunction: PropTypes.func,
};

export default MetricDataPointEvaluationFailureRuleInput;