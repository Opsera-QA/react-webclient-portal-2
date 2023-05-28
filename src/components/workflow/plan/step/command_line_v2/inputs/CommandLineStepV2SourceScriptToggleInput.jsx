import React, {useState} from "react";
import PropTypes from "prop-types";
import commandLineStepV2Metadata from "components/workflow/plan/step/command_line_v2/commandLineStepV2.metadata";
import InputContainer from "components/common/inputs/InputContainer";
import {Form} from "react-bootstrap";

function CommandLineStepV2SourceScriptToggleInput({dataObject, setDataObject, fieldName, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));

  const triggerAuthenticationChange = () => {
    let newDataObject = dataObject;
    let sourceScriptFlag = !dataObject.getData("sourceScript");
    newDataObject.setData("sourceScript", sourceScriptFlag);
    newDataObject.setMetaDataFields(sourceScriptFlag === true ? commandLineStepV2Metadata.fieldsAlt : commandLineStepV2Metadata.fields);
    newDataObject.setData("commands", "");
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer fieldName={fieldName}>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => triggerAuthenticationChange()}
      />
    </InputContainer>

  );
}

CommandLineStepV2SourceScriptToggleInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default CommandLineStepV2SourceScriptToggleInput;