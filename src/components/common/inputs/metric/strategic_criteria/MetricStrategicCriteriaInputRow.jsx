import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RuleTypeSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/RuleTypeSelectInput";
import RuleValueMultiSelectInput
  from "components/common/list_of_values_input/workflow/wizard/rules/SfdcRuleValueMulitSelectInput";
import SfdcRuleFieldSelectInput from "components/common/list_of_values_input/workflow/wizard/rules/SfdcRuleFieldSelectInput";
import Model from "core/data_model/model";
import SfdcPipelineWizardRuleFieldFilterSelectInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/rules/SfdcPipelineWizardRuleFieldFilterSelectInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";
import metricStrategicCriteriaMetadata
  from "components/common/inputs/metric/strategic_criteria/metricStrategicCriteria.metadata";

function MetricStrategicCriteriaInputRow({model, ruleData, index, addRule, deleteRule, updateRule,}) {
  const [ruleModel, setRuleModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, [index, ruleData]);

  const loadData = () => {
    let newModel = new Model({...ruleData}, metricStrategicCriteriaMetadata, false);
    setRuleModel({...newModel});
  };

  const updateData = (newModel) => {
    setRuleModel(newModel);
    updateRule(index, newModel?.getPersistData());
  };

  // TODO: When finalizing this design everywhere make own component
  const getDeleteRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteRule(index)}>
        <span><FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/></span>
      </Button>
    );
  };

  // TODO: When finalizing this design everywhere make own component
  const getAddRuleButton = (index) => {
    return (
      <Button variant="link" onClick={() => addRule(index)}>
        <span><FontAwesomeIcon className="opsera-primary" icon={faPlus} fixedWidth/></span>
      </Button>
    );
  };

  const getRulesFieldComponent = () => {
    return (<SfdcRuleFieldSelectInput dataObject={ruleModel} setDataObject={updateData} showLabel={false} />);
  };

  const getRuleValueInput = () => {
    switch (ruleModel.getData("fieldFilter")) {
      case "startsWith":
      case "endsWith":
      case "contains":
        return (
          <MultiTextInputBase
            dataObject={ruleModel}
            setDataObject={updateData}
            fieldName={"values"}
            showLabel={false}
          />
        );
      case "equals":
      default:
        return (
          <RuleValueMultiSelectInput
            ruleField={ruleModel?.getData("field")}
            dataObject={ruleModel}
            setDataObject={updateData}
            showLabel={false}
            componentTypes={ruleModel?.getData("componentTypes")}
            model={model}
          />
        );
    }
  };

  if (ruleModel == null) {
    return null;
  }

  return (
    <Row className="d-flex mx-2 justify-content-between" key={index}>
      <Col sm={12} className={"px-0"}>
        <Row className={"mx-0"}>
          <Col xs={1} className={"pr-1 pl-0"}>
            <RuleTypeSelectInput
              dataObject={ruleModel}
              setDataObject={updateData}
              showLabel={false}
            />
          </Col>
          <Col xs={3} className={"px-0"}>
            {/*<SfdcRuleComponentTypeMultiSelectInput*/}
            {/*  dataObject={ruleModel}*/}
            {/*  setDataObject={updateData}*/}
            {/*  showLabel={false}*/}
            {/*  fetchAttribute={fetchAttribute}*/}
            {/*  model={model}*/}
            {/*/>*/}
          </Col>
          <Col xs={2} className={"px-1"}>
            {getRulesFieldComponent()}
          </Col>
          <Col xs={2} className={"pl-0 pr-1"}>
            <SfdcPipelineWizardRuleFieldFilterSelectInput
              setModel={updateData}
              model={ruleModel}
              showLabel={false}
            />
          </Col>
          <Col xs={3} className={"px-0"}>
            {getRuleValueInput()}
          </Col>
          <Col xs={1} className={"my-auto d-flex"}>
            {getAddRuleButton(index)}
            {getDeleteRuleButton(index)}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

MetricStrategicCriteriaInputRow.propTypes = {
  ruleData: PropTypes.object,
  index: PropTypes.number,
  addRule: PropTypes.func,
  deleteRule: PropTypes.func,
  updateRule: PropTypes.func,
  fetchAttribute: PropTypes.string,
  isGitTab: PropTypes.bool,
  model: PropTypes.object
};

export default MetricStrategicCriteriaInputRow;