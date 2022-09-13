import React from "react";
import PropTypes from "prop-types";

function RadioButtonOption({ fieldName, dataObject, setDataObject, value, setDataFunction, className, label, disabled, visible}) {
  const validateAndSetData = (fieldName, value) => {
    if (setDataFunction) {
      setDataFunction(fieldName, value);
    }
    else {
      let newDataObject = dataObject;
      newDataObject.setData(fieldName, value);
      setDataObject({...newDataObject});
    }
  };

  if (visible === false) {
    return null;
  }

  return (
    <div className={disabled ? `${className} disabled-radio-option` : className}>
      <div className="d-flex">
        <input
          type={"radio"}
          value={value}
          checked={dataObject?.getData(fieldName) === value}
          onChange={(event) => validateAndSetData(fieldName, event.target.value)}
          disabled={disabled}
        />
        <div className={"ml-2"}>
          {label}
        </div>
      </div>
    </div>
  );
}

RadioButtonOption.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool
};

export default RadioButtonOption;