import useApiService from "hooks/api/service/useApiService";

export default function useAccessTokenActivityLogActions() {
  const apiService = useApiService();
  const accessTokenActivityLogActions = {};

  accessTokenActivityLogActions.getUserAccessTokenActivityLogs = async (
    userId,
    filterModel,
  ) => {
    const apiUrl = `/account/access-tokens/logs/${userId}`;
    const queryParameters = {
      search: filterModel?.getFilterValue("search"),
      scope: filterModel?.getFilterValue("scope"),
      sortOption: filterModel?.getFilterValue("sortOption"),
      currentPage: filterModel?.getFilterValue("currentPage"),
      pageSize: filterModel?.getFilterValue("pageSize"),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  accessTokenActivityLogActions.getAccessTokenActivityLogs = async (
    filterModel,
  ) => {
    const apiUrl = `/account/access-tokens/logs/`;
    const queryParameters = {
      search: filterModel?.getFilterValue("search"),
      userId: filterModel?.getFilterValue("userId"),
      scope: filterModel?.getFilterValue("scope"),
      sortOption: filterModel?.getFilterValue("sortOption"),
      currentPage: filterModel?.getFilterValue("currentPage"),
      pageSize: filterModel?.getFilterValue("pageSize"),
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  accessTokenActivityLogActions.getUsersByAccessTokenUsage = async () => {
    const apiUrl = `/account/access-tokens/logs/usage/users`;
    return await apiService.handleApiGetRequest(
      apiUrl,
    );
  };

  return accessTokenActivityLogActions;
}
