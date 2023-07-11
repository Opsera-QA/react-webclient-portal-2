import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function RoleRestrictedCoverityToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
    filterDataFunction,
    setDataFunction,
    clearDataFunction,
  }) {
  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"coverity"}
      toolFriendlyName={"Coverity"}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      filterDataFunction={filterDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

RoleRestrictedCoverityToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  valueField: PropTypes.string,
  setDataFunction: PropTypes.func,
  filterDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default RoleRestrictedCoverityToolSelectInput;
