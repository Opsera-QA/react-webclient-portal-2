import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/form_fields/input/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";

// TODO: This is tailored to Parameters but leaving here for potential generic use
function VisibleVaultTextInput({fieldName, dataObject, setDataObject, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valueShown, setValueShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (!dataObject.isNew()) {
      getValueFromVault().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const getValueFromVault = async () => {
    try {
      setIsLoading(true);
      if (dataObject?.getData("vaultEnabled") === true) {
        await dataObject.getValueFromVault(fieldName);
        setValueShown(true);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        if (error?.response?.status === 404) {
          setErrorMessage("No value stored in vault");
        } else {
          setErrorMessage("Could not pull value from Vault");
          console.error(error);
        }
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const hideValue = () => {
    setValueShown(false);
  };

  const getPullFromVaultButton = () => {
    if (dataObject?.getData("vaultEnabled") === true) {
      return (
        <ShowSensitiveDataButton
          isLoading={isLoading}
          showData={getValueFromVault}
          hideData={hideValue}
          className={"input-button mr-2"}
          valueShown={valueShown}
        />
      );
    }
  };

  const getButtons = () => {
    if (!dataObject?.isNew()) {
      return (
        <div className={"d-flex ml-2"}>
          {getPullFromVaultButton()}
          <CopyToClipboardButton copyString={dataObject?.getData(fieldName)} className={"input-button"} />
        </div>
      );
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <div className={"d-flex"}>
        <input
          type={dataObject?.getData("vaultEnabled") === true && valueShown === false && !isLoading ? "password" : undefined}
          disabled={disabled || isLoading}
          value={isLoading ? "Loading Value From Vault" : dataObject?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
        />
        {getButtons()}
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VisibleVaultTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default VisibleVaultTextInput;