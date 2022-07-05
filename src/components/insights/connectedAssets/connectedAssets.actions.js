import baseActions from "utils/actionsBase";
import { addDays } from "date-fns";

const connectedAssetsBaseURL = "/analytics/connectedAssets/v1/";

const connectedAssetsActions = {};

connectedAssetsActions.getConnectedAssetsData = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
) => {
  const apiUrl = "/analytics/metrics";

  const postBody = {
    request: request,
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

connectedAssetsActions.getListOfRepositories = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getSelectedRepoDetailedInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  repository
) => {

  const apiURL = connectedAssetsBaseURL + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    selectedRepository: repository,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getPipelinesInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'pipelines/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getTasksInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'tasks/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getUsersInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'users/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getSelectedUserDetailedInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  user
) => {

  const apiURL = connectedAssetsBaseURL + 'users/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    selectedUser: user,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getSelectedUserDetailedInfoForAnalytics = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  user
) => {

  const apiURL = connectedAssetsBaseURL + 'users/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    selectedUserAndTool: user,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getJobsInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto
) => {

  const apiURL = connectedAssetsBaseURL + 'jobs/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search")
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getWebhooksInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  repository
) => {

  const apiURL = connectedAssetsBaseURL + 'webhooks/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    selectedRepository: repository
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

connectedAssetsActions.getPackagesInfo = async (
  getAccessToken,
  cancelTokenSource,
  request,
  startDate,
  endDate,
  tableFilterDto,
  pipeline
) => {

  const apiURL = connectedAssetsBaseURL + 'packages/' + request;
  const postBody = {
    startDate: startDate ? startDate : new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)).toISOString(),
    endDate: endDate ? endDate : addDays(new Date(new Date().setHours(0, 0, 0, 0)), 1).toISOString(),
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    selectedPipeline: pipeline
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiURL, postBody);
};

export default connectedAssetsActions;
