import baseActions from "utils/actionsBase";

export const dashboardMetricActions = {};

dashboardMetricActions.addMetricToDashboardV2 = async (
  getAccessToken,
  cancelTokenSource,
  dashboardId,
  kpiIdentifierId,
) => {
  const apiUrl = `/analytics/dashboard/${dashboardId}/metric/${kpiIdentifierId}/`;

  return baseActions.apiPutCallV2(
    getAccessToken,
    cancelTokenSource,
    apiUrl,
  );
};

dashboardMetricActions.updateDashboardKpiV2 = async(getAccessToken, cancelTokenSource, dashboardId, kpiModel) => {
  const apiUrl = `/analytics/dashboard/${dashboardId}/metric/${kpiModel?.getData('_id')}/update/`;
  const postData = {
    ...kpiModel?.getPersistData()
  };

  return baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

dashboardMetricActions.deleteDashboardKpiV2 = async(getAccessToken, cancelTokenSource, dashboardId, kpiId) => {
  const apiUrl = `/analytics/dashboard/${dashboardId}/metric/${kpiId}/`;
  return baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};