import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationTriangle, faFileCode, faFileDownload} from "@fortawesome/pro-light-svg-icons";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";
import ToggleThemeIcon from "components/common/buttons/toggle/ToggleThemeIcon";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";

// TODO: If more are added, make sure to add the respective imports into CodeInputBase
export const CODE_THEME_TYPES = {
  LIGHT: "chrome",
  DARK: "twilight"
};

function CodeInput({model, setModel, fieldName, mode, className, isLoading, disabled, titleBarActionButtons, isDataPulled, dataPullError}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(CODE_THEME_TYPES.LIGHT);

  const validateAndSetData = (value) => {
    let newModel = model;

    if (typeof value === "string" && value.length > 1047576) {
      //1,048,576 is 1MB
      const parsedValue = value.substr(0, 1048576);
      newModel.setData(fieldName, parsedValue);
      setErrorMessage("Code Entry is limited to 1,048,576 characters (1MB). Truncating value.");
    }
    else {
      newModel.setData(fieldName, value);
      setErrorMessage(newModel.getFieldError(fieldName));
    }

    setModel({...newModel});
  };

  const toggleTheme = () => {
    const newTheme = theme === CODE_THEME_TYPES.DARK ? CODE_THEME_TYPES.LIGHT : CODE_THEME_TYPES.DARK;
    setTheme(newTheme);
  };

  const getTitleBarActionButtons = () => {
    return (
      <div className={"d-flex"}>
        <div className={"mr-2"}>
          {titleBarActionButtons}
        </div>
        <ToggleThemeIcon theme={theme} toggleTheme={toggleTheme} />
      </div>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto w-100"}>
            <LoadingDialog size={"sm"} message={"Loading Data"} />
          </div>
        </div>
      );
    }

    if (dataPullError != null && dataPullError !== "") {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto"}>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />{dataPullError}
          </div>
        </div>
      );
    }

    if (isDataPulled === false) {
      return (
        <div className={"h-100 w-100 d-flex"}>
          <div className={"m-auto"}>
            <IconBase icon={faFileDownload} className={"mr-2"} />{model?.getLabel(fieldName)} must be pulled from the database before it can be seen
          </div>
        </div>
      );
    }

    return (
      <CodeInputBase
        mode={mode}
        theme={theme}
        isLoading={isLoading}
        setDataFunction={validateAndSetData}
        inputId={`${model?.getData("_id")}-${fieldName}`}
        value={model?.getData(fieldName)}
        disabled={isLoading || disabled}
      />
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar field={field} icon={faFileCode} isLoading={isLoading} actionButtons={getTitleBarActionButtons()} />
          <div style={{height: "500px"}}>
            {getBody()}
          </div>
        </div>
      </div>
      <div className={"object-properties-footer"}>
        <div className={"px-2"}>
          <InfoText
            field={field}
            errorMessage={errorMessage}
            model={model}
            fieldName={fieldName}
          />
        </div>
      </div>
    </InputContainer>
  );
}

CodeInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  mode: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  titleBarActionButtons: PropTypes.any,
  isDataPulled: PropTypes.bool,
  dataPullError: PropTypes.string
};

export default CodeInput;