import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/fields/input/InfoText";

function ActivityToggleInput({ fieldName, dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setData(field.id, value);
    setDataObject({...newDataObject});
  };

  return (
    <InputContainer>
      <Form.Check
        type="switch"
        id={field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={dataObject.getData(fieldName) ? "Active" : "Inactive"}
        onChange={() => {
          validateAndSetData(!dataObject.getData(fieldName));
        }}
      />
      <InfoText field={field} errorMessage={null}/>
    </InputContainer>
  );
}

ActivityToggleInput.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setData: PropTypes.func
};

export default ActivityToggleInput;