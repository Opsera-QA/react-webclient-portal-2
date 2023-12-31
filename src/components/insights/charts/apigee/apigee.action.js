import baseActions from "utils/actionsBase";
import {
  getDateObjectFromKpiConfiguration,
  getTagsFromKpiConfiguration,
  getUseKpiTagsFromKpiConfiguration,
  getUseDashboardTagsFromKpiConfiguration,
} from "components/insights/charts/charts-helpers";

const apigeeBaseURL = "analytics/apigee/v1/";

const apigeeActions = {};

apigeeActions.getPipelines = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  tableFilterDto
) => {
  const apiUrl = apigeeBaseURL + "getPipelines";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tagsApplied = _getTagsApplied(kpiConfiguration, dashboardTags, dashboardOrgs);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tagsApplied.tags,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    dashboardOrgs: tagsApplied.dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getReport = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  tableFilterDto,
  pipelineId,
) => {
  const apiUrl = apigeeBaseURL + "report";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tagsApplied = _getTagsApplied(kpiConfiguration, dashboardTags, dashboardOrgs);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tagsApplied.tags,
    pipelineId: pipelineId,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    assetType: tableFilterDto?.getData("assetType"),
    dashboardOrgs: tagsApplied.dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getReportDetails = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  pipelineId,
  organization,
  environment,
  tableFilterDto,
  assetType
) => {
  const apiUrl = apigeeBaseURL + "report/details";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tagsApplied = _getTagsApplied(kpiConfiguration, dashboardTags, dashboardOrgs);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tagsApplied.tags,
    pipelineId: pipelineId,
    organization: organization,
    environment: environment,
    page: tableFilterDto?.getData("currentPage") ? tableFilterDto?.getData("currentPage") : 1,
    size: tableFilterDto?.getData("pageSize") ? tableFilterDto?.getData("pageSize") : 5,
    search: tableFilterDto?.getData("search"),
    assetType: assetType,
    dashboardOrgs: tagsApplied.dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

apigeeActions.getSummaryChartDetails = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
) => {
  const apiUrl = apigeeBaseURL + "metrics";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tagsApplied = _getTagsApplied(kpiConfiguration, dashboardTags, dashboardOrgs);
  
  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tagsApplied.tags,
    dashboardOrgs: tagsApplied.dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);

};

apigeeActions.downloadReport = async (
  getAccessToken,
  cancelTokenSource,
  kpiConfiguration,
  dashboardTags,
  dashboardOrgs,
  tableFilterDto,
  pipelineId,
) => {
  const apiUrl = apigeeBaseURL + "report/download";
  const dateRange = getDateObjectFromKpiConfiguration(kpiConfiguration);
  const tagsApplied = _getTagsApplied(kpiConfiguration, dashboardTags, dashboardOrgs);

  const postBody = {
    startDate: dateRange?.start,
    endDate: dateRange?.end,
    tags: tagsApplied.tags,
    pipelineId: pipelineId,    
    search: tableFilterDto?.getData("search"),
    assetType: tableFilterDto?.getData("assetType"),
    dashboardOrgs: tagsApplied.dashboardOrgs,
  };

  return await baseActions.handleNodeAnalyticsApiPostRequest(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

const _getTagsApplied = (kpiConfiguration, dashboardTags, dashboardOrgs) => {
  let tags = getTagsFromKpiConfiguration(kpiConfiguration);

  const useKpiTags = getUseKpiTagsFromKpiConfiguration(kpiConfiguration);
  const useDashboardTags = getUseDashboardTagsFromKpiConfiguration(kpiConfiguration);

  if (!useKpiTags) {
    tags = null;
  }
  if (!useDashboardTags) {
    dashboardTags = null;
    dashboardOrgs = null;
  }
  return ({
    tags: tags && dashboardTags ? tags.concat(dashboardTags) : dashboardTags?.length > 0 ? dashboardTags : tags,
    dashboardOrgs: dashboardOrgs,
  });
};

export default apigeeActions;
