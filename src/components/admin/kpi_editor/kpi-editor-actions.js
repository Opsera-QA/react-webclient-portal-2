import baseActions from "../../../utils/actionsBase";

const KpiActions = {};

KpiActions.getKpis = async (kpiFilterDto, getAccessToken) => {
  const apiUrl = "/analytics/kpi/configurations";
  let sortOption = kpiFilterDto.getData("sortOption");
  let status = kpiFilterDto.getData("status");

  const urlParams = {
    params: {
      sort: sortOption ? sortOption.value : undefined,
      size: kpiFilterDto.getData("pageSize"),
      page: kpiFilterDto.getData("currentPage"),
      status: status ? status.value : undefined,
      search: kpiFilterDto.getData("search")
    },
  };

  return baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

KpiActions.get = async (kpiId, getAccessToken) => {
  const apiUrl = `/analytics/kpi/configurations/${kpiId}`;
  return baseActions.apiGetCall(getAccessToken, apiUrl);
};

KpiActions.createKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData()
  }
  const apiUrl = "analytics/kpi/configurations/create";
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

KpiActions.updateKpi = async (kpiDataDto, getAccessToken) => {
  let postData = {
    ...kpiDataDto.getPersistData()
  }
  const apiUrl = `/analytics/kpi/configurations/${kpiDataDto.getData("_id")}/update/`;
  return baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

KpiActions.deleteKpi = async (kpiDataDto, getAccessToken) => {
  const apiUrl = `/analytics/kpi/configurations/${kpiDataDto.getData("_id")}/`;
  return baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

export default KpiActions;