import useApiService from "hooks/api/service/useApiService";

export default function useLdapGroupActions() {
  const apiService = useApiService();
  const ldapGroupActions = {};

  ldapGroupActions.getResourcesWithGroupAssigned = async (
    group,
    type,
  ) => {
    const apiUrl = `/account/groups/assigned-roles/resources/`;
    const queryParameters = {
      group: group,
      type: type,
    };

    return await apiService.handleApiGetRequest(
      apiUrl,
      queryParameters,
    );
  };

  ldapGroupActions.getLdapUserGroups = async () => {
    const apiUrl = `/account/groups`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  ldapGroupActions.getLdapUserGroupsWithDomain = async (
    domain,
  ) => {
    const apiUrl = `/account/groups/${domain}`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  ldapGroupActions.getLdapUserGroupByNameWithDomain = async (
    domain,
    groupName,
  ) => {
    const apiUrl = `/account/groups/${domain}/name/${groupName}`;
    return await apiService.handleApiGetRequest( apiUrl);
  };

  ldapGroupActions.deleteLdapGroup = async (
    domain,
    groupName,
  ) => {
    const apiUrl = `/account/groups/${domain}/name/${groupName}`;
    return await apiService.handleApiDeleteRequest( apiUrl);
  };

  ldapGroupActions.revokeAssignedGroupAccessRules = async (
    domain,
    groupName,
  ) => {
    const apiUrl = `/account/groups/${domain}/name/${groupName}/assigned-roles`;
    return await apiService.handleApiDeleteRequest( apiUrl);
  };

  return ldapGroupActions;
}