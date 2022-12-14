import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import azurePipelineActions from "../azure-pipeline-actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import {faSync} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import toolsActions from "components/inventory/tools/tools-actions";
import IconBase from "components/common/icons/IconBase";

function AzureAcrPushStepRegistryNameSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  azureToolConfigId,
  resource,
  applicationId,
}) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [azureRegistryList, setAzureRegistryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [placeholder, setPlaceholderText] = useState("Select an Azure Registry");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    setAzureRegistryList([]);

    if (
      hasStringValue(azureToolConfigId) === true &&
      hasStringValue(resource) === true &&
      (hasStringValue(dataObject?.getData("toolType")) && dataObject?.getData("toolType") === "azure"
        ? hasStringValue(applicationId)
        : true)
    ) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [azureToolConfigId, resource, applicationId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAzureRegistries(cancelSource);
    } catch (error) {
      setPlaceholderText("There was an error pulling Azure Registries");
      setErrorMessage("There was an error pulling Azure Registries.");
      toastContext.showErrorDialog(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAzureRegistries = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, azureToolConfigId);
    const tool = response?.data?.data;
    let applicationData = {};

    if (tool == null) {
      setPlaceholderText("Error Pulling Clusters!");
      setErrorMessage("Could not find Tool to grab Clusters.");
      return;
    }

    if (dataObject?.getData("toolType") === "azure") {
      const applicationResponse = await toolsActions.getRoleLimitedToolApplicationByIdV2(
        getAccessToken,
        cancelSource,
        azureToolConfigId,
        applicationId
      );
      applicationData = applicationResponse?.data?.data;

      if (applicationData == null) {
        setPlaceholderText("Error Pulling Clusters!");
        setErrorMessage(`
        The selected Application was not found. 
        It may have been deleted, or the Tool's access roles may have been updated.
        Please select another Application or create another in the Tool Registry.
      `);
        return;
      }
    }

    const azureResponse = await azurePipelineActions.getAzureRegistries(
      getAccessToken,
      cancelSource,
      tool,
      resource,
      dataObject?.getData("toolType"),
      applicationData
    );

    const result = azureResponse?.data?.data;
    if (Array.isArray(result) && result.length > 0) {
      setErrorMessage("");
      setAzureRegistryList(result);
    }

    if (result?.length === 0) {
      setPlaceholderText("No registry found with this azure configuration");
      setErrorMessage("No Azure Registry have been found associated with this Azure Tool Registry Account");
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, selectedOption.name);
    newDataObject.setData("acrLoginUrl", selectedOption.url);
    newDataObject.setDefaultValue("azureRepoName");
    setDataObject({ ...newDataObject });
  };

  const getInfoText = () => {
    if (dataObject?.getData("resource")?.length > 0) {
      return (
        <small>
          <IconBase icon={faSync} className={"pr-1"} />
          Click here to refresh Azure Registries
        </small>
      );
    }
  };

  return (
    <>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={azureRegistryList}
        busy={isLoading}
        valueField={"name"}
        textField={"name"}
        disabled={isLoading}
        placeholder={placeholder}
        errorMessage={errorMessage}
      />
      <div onClick={() => loadData()} className="text-muted ml-3 dropdown-data-fetch">
        {getInfoText()}
      </div>
    </>
  );
}

AzureAcrPushStepRegistryNameSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  azureToolConfigId: PropTypes.string,
  resource: PropTypes.string,
  applicationId: PropTypes.string,
};

AzureAcrPushStepRegistryNameSelectInput.defaultProps = {
  fieldName: "azureRegistryName",
};

export default AzureAcrPushStepRegistryNameSelectInput;
