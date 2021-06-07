import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function KafkaConnectActionSelectInput({dataObject, setDataObject, isLoading, disabled}) {

  const ACTION_LIST = [
    {
      name: "Create",
      value: "create",
    },
    {
      name: "Update",
      value: "update",
    },
    {
      name: "Delete",
      value: "delete",
    },
    {
      name: "Validate",
      value: "validate",
    },
    {
      name: "Restart",
      value: "restart",
    },
    {
      name: "Resume",
      value: "resume",
    },
    {
      name: "Pause",
      value: "pause",
    },
  ];

  return (

    <SelectInputBase
      fieldName={"kafkaConnectAction"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Kafka Connect Action"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

KafkaConnectActionSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default KafkaConnectActionSelectInput;