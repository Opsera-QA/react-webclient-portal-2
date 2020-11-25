import {axiosApiService} from "../../../api/apiService";
import baseActions from "../../../utils/actionsBase";
const toolsActions = {};

toolsActions.checkToolConnectivity = async (toolId, toolName, getAccessToken) => {
  const apiUrl = `/tools/${toolId}/check-connectivity?name=${toolName}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

toolsActions.deleteTool = async (dataObject, getAccessToken) => {
  const apiUrl = `/registry/${dataObject.getData("_id")}`;
  return baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

toolsActions.updateTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  }
  let id = toolDataDto.getData("_id");
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${id}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.createTool = async (toolDataDto, getAccessToken) => {
  const postBody = {
    ...toolDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users?page=1&size=10000";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getTools = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/tools";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.getToolRegistryList = async (toolFilterDto, getAccessToken) => {
  let sortOption = toolFilterDto.getData("sortOption");

  let urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      page: toolFilterDto.getData("currentPage"),
      size: toolFilterDto.getData("pageSize"),
      tag: toolFilterDto.getFilterValue("tag"),
      status: toolFilterDto.getFilterValue("status"),
      tool: toolFilterDto.getFilterValue("toolIdentifier"),
      search: toolFilterDto.getFilterValue("search")
    }
  }

  const apiUrl = `/registry`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

toolsActions.getToolTypes = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/registry/types";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

toolsActions.updateToolConfiguration = async (toolData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${toolData._id}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, toolData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
}

toolsActions.installJiraApp = async (toolId, getAccessToken) => {
  const apiUrl = `/connectors/jira/${toolId}/app/install`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

export default toolsActions;