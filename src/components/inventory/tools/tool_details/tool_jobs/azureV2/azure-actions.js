import baseActions from "utils/actionsBase";

const azureActions = {};

azureActions.createAzureCredential = async (getAccessToken, cancelTokenSource, toolId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/create`;
  const postBody = {
    ...azureApplicationModel,
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};


azureActions.updateAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId, azureApplicationModel) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}/update`;
  const postBody = {
    ...azureApplicationModel
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

azureActions.deleteAzureCredential = async (getAccessToken, cancelTokenSource, toolId, applicationId) => {
  const apiUrl = `/tools/${toolId}/azure/${applicationId}`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.getRepositoriesFromAzureInstanceV2 = async (getAccessToken, cancelTokenSource, toolId) => {
  const apiUrl = `/azure-devops/${toolId}/repositories`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

azureActions.getRepositoriesFromAzureInstanceV2 = async (getAccessToken, cancelTokenSource, toolId, repositoryId) => {
  const apiUrl = `/azure-devops/${toolId}/repositories`;
  const queryParams = {
    params: {
      repositoryId: repositoryId
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, queryParams);
};

export default azureActions;
