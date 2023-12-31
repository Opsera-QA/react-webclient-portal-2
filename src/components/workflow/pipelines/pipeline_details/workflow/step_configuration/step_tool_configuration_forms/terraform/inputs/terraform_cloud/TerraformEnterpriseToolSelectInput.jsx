import React from "react";
import PropTypes from "prop-types";

import RoleRestrictedToolByIdentifierInputBase from "../../../../../../../../../common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function TerraformEnterpriseToolSelectInput({ fieldName, model, setModel, disabled, textField, valueField }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData("organizationName", "");
    newModel.setData(fieldName, selectedOption?._id);
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setData("organizationName", "");
    newModel.setData(fieldName, "");
    setModel({ ...newModel });
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={"terraform-cloud"}
      toolFriendlyName={"Terraform Cloud"}
      fieldName={fieldName}
      configurationRequired={true}
      placeholderText={"Select Terraform Tool"}
      model={model}
      textField={textField}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

TerraformEnterpriseToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

TerraformEnterpriseToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "terraformCloudId",
  disabled: false
};

export default TerraformEnterpriseToolSelectInput;
