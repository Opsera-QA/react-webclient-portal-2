import React, {useContext, useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import azurePipelineActions
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/azure-pipeline-actions";

function AzureDevopsPipelineSelectInput({ fieldName, model, setModel, disabled, organization, projectName, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken, getUserRecord } = useContext(AuthContext);
  const [azureDevopsList, setAzureDevopsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setAzureDevopsList([]);

    if (organization != null && organization !== "" && projectName != null && projectName !== "") {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [organization, projectName]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzurePipelines(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadAzurePipelines = async (cancelSource = cancelTokenSource) => {
    try {
      const vaultResults = await azurePipelineActions.getAzurePersonalAccessToken(getAccessToken, cancelTokenSource, model.getData("accessToken"));
      const user = await getUserRecord();
      const results = await azurePipelineActions.getAzurePipelines(getAccessToken, cancelSource, model, vaultResults?.data, user._id);
      const azurePipelinesArray = await results?.data?.message?.message?.value;
    
      if (Array.isArray(azurePipelinesArray) && azurePipelinesArray.length > 0) {
        setAzureDevopsList(azurePipelinesArray);
      }
      else {
        setErrorMessage("No Azure Pipelines Found");
      }
    } catch(error) {
      if (isMounted?.current === true) {
        setErrorMessage("There was an error pulling Azure Pipelines!");
        console.error(error);
        toastContext.showServiceUnavailableDialog();
      }
    } finally {
      if (isMounted?.current === true) {
      }
    }
  };

  const setDataFunction = async (fieldName, value) => {
    if (fieldName === "azurePipelineId") {
      let newDataObject = model;
      newDataObject.setData("azurePipelineId", value.id);
      setModel({ ...newDataObject });
    }
  };

  return (
      <SelectInputBase
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        model={model}
        setModel={setModel}
        selectOptions={azureDevopsList}
        busy={isLoading}
        errorMessage={errorMessage}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select an Azure Devops Pipeline"}
        disabled={disabled || isLoading || azureDevopsList?.length === 0}
      />
  );
}

AzureDevopsPipelineSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  organization: PropTypes.string,
  projectName: PropTypes.string
};

AzureDevopsPipelineSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default AzureDevopsPipelineSelectInput;