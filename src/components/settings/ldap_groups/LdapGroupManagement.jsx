import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import LdapGroupsTable from "./LdapGroupsTable";
import accountsActions from "components/admin/accounts/accounts-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import GroupManagementSubNavigationBar from "components/settings/ldap_groups/GroupManagementSubNavigationBar";

function LdapGroupManagement() {
  const history = useHistory();
  const {orgDomain} = useParams();
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [existingGroupNames, setExistingGroupNames] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [orgDomain]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true && orgDomain != null) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    const {ldap} = user;

    if (isMounted?.current === true && userRoleAccess) {
      setCurrentUserEmail(user?.email);
      if (orgDomain == null || (ldap?.domain !== orgDomain && !userRoleAccess?.OpseraAdministrator)) {
        history.push(`/settings/${ldap.domain}/groups`);
      }

      setAccessRoleData(userRoleAccess);

      if (
           userRoleAccess?.OpseraAdministrator
        || userRoleAccess?.Administrator
        || userRoleAccess?.PowerUser
        || userRoleAccess?.OrganizationOwner
        || userRoleAccess?.OrganizationAccountOwner
      ) {
        await getGroupsByDomain(cancelSource);
      }
    }
  };

  const getGroupsByDomain = async (cancelSource = cancelTokenSource) => {
    if (orgDomain != null) {
      try {
        const response = await accountsActions.getLdapUserGroupsWithDomainV2(getAccessToken, cancelSource, orgDomain);
        const groups = response?.data?.data;

        if (Array.isArray(groups)) {
          const existingGroupNames = groups.map((group) => {return group.name.toLowerCase();});
          setExistingGroupNames(existingGroupNames);
          setGroupList(groups);
        }
      } catch (error) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      navigationTabContainer={<GroupManagementSubNavigationBar activeTab={"groups"} />}
      breadcrumbDestination={"ldapGroupManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
    >
      <LdapGroupsTable
        className={"mx-2"}
        isLoading={isLoading}
        groupData={groupList}
        isMounted={isMounted}
        loadData={loadData}
        orgDomain={orgDomain}
        existingGroupNames={existingGroupNames}
        currentUserEmail={currentUserEmail}
      />
    </ScreenContainer>
  );
}


export default LdapGroupManagement;