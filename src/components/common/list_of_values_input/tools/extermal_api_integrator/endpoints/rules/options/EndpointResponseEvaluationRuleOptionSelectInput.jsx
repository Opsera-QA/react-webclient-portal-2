import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SUPPORTED_RULE_OPTIONS = [
  {
    text: "Status Code",
    value: "status",
  },
  {
    text: "Response Field Evaluation",
    value: "field_evaluation",
  },
];

function EndpointResponseEvaluationRuleOptionSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
    className,
    endpoint,
  }) {
  // TODO: Find better way to disable options
  const getOptions = () => {
    const supportedRuleOptions = [{
      text: "Status Code",
      value: "status",
    },];

    if (endpoint?.responseBodyType === "object") {
      const responseBodyFields = endpoint?.responseBodyFields;

      if (Array.isArray(responseBodyFields) && responseBodyFields.length > 0) {
        supportedRuleOptions.push({
          text: "Response Field Evaluation",
          value: "field_evaluation",
        });
      }
    }

    const simpleResponseEvaluationSupportedResponseBodyTypes = ["boolean", "array", "string"];
    if (simpleResponseEvaluationSupportedResponseBodyTypes.includes(endpoint?.responseBodyType)) {
      supportedRuleOptions.push({
        text: "API Response Evaluation",
        value: "response_evaluation",
      });
    }

    return supportedRuleOptions;
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={getOptions()}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      setDataFunction={setDataFunction}
      // customInfoTextMessage={"Field Evaluation is only available if Response Fields are registered in the selected Endpoint."}
    />
  );
}

EndpointResponseEvaluationRuleOptionSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  endpoint: PropTypes.object,
};

export default EndpointResponseEvaluationRuleOptionSelectInput;