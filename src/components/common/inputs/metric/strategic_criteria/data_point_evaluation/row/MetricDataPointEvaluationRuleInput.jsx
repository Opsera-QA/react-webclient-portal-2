import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Model from "core/data_model/model";
import dataPointEvaluationRowMetadata
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/dataPointEvaluationRowMetadata";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import dataPointEvaluationRulesMetadata
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/dataPointEvaluationRules.metadata";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import DataPointEvaluationTriggerFilterSelectInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/DataPointEvaluationTriggerFilterSelectInput";
import DataPointEvaluationTriggerValuesInput
  from "components/common/inputs/metric/strategic_criteria/data_point_evaluation/row/DataPointEvaluationTriggerValuesInput";

function MetricDataPointEvaluationRuleInput({ruleData, updateRule, fieldName, icon, title}) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [ruleData]);

  const loadData = () => {
    const parsedRuleData = {
      ...dataPointEvaluationRulesMetadata.newObjectFields[fieldName],
      ...ruleData
    };

    let newModel = new Model({...parsedRuleData}, dataPointEvaluationRowMetadata, false);
    setRuleModel({...newModel});
  };

  const updateRuleRow = (newModel) => {
    setRuleModel(newModel);
    updateRule(fieldName, newModel?.getPersistData());
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <PropertyInputContainer
      titleIcon={icon}
      field={null}
      titleText={title}
    >
      <Row className={"m-2"}>
        <Col sm={12} lg={4}>
          <DataPointEvaluationTriggerFilterSelectInput
            model={ruleModel}
            setModel={setRuleModel}
            updateRule={updateRuleRow}
          />
        </Col>
        <Col sm={12} lg={8}>
          <DataPointEvaluationTriggerValuesInput
            model={ruleModel}
            setModel={setRuleModel}
            updateRule={updateRule}
            triggerFilter={ruleModel?.getData("trigger_filter")}
          />
        </Col>
      </Row>
    </PropertyInputContainer>
  );
}

MetricDataPointEvaluationRuleInput.propTypes = {
  ruleData: PropTypes.object,
  fieldName: PropTypes.string,
  updateRule: PropTypes.func,
  icon: PropTypes.object,
  title: PropTypes.string,
};

export default MetricDataPointEvaluationRuleInput;