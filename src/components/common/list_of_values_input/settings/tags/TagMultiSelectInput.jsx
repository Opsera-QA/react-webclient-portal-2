import React from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import TagMultiSelectInputBase from "components/common/list_of_values_input/settings/tags/TagMultiSelectInputBase";

function TagMultiSelectInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    setDataFunction,
    showLabel,
    className,
    infoOverlay,
    inputHelpOverlay,
    helpTooltipText,
  }) {
  const field = dataObject.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className} fieldName={fieldName}>
      <InputLabel
        field={field}
        showLabel={showLabel}
        model={dataObject}
        infoOverlay={infoOverlay}
        inputHelpOverlay={inputHelpOverlay}
        helpTooltipText={helpTooltipText}
        disabled={disabled}
      />
      <TagMultiSelectInputBase
        fieldName={fieldName}
        model={dataObject}
        setModel={setDataObject}
        setDataFunction={setDataFunction}
        disabled={disabled}
      />
    </InputContainer>
  );
}

TagMultiSelectInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
  helpTooltipText: PropTypes.string,
};

TagMultiSelectInput.defaultProps = {
  fieldName: "tags"
};

export default TagMultiSelectInput;