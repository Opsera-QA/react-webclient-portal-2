import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import {ldapUserMetadata} from "components/admin/accounts/ldap/users/ldapUser.metadata";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import UserManagementSubNavigationBar from "components/settings/users/UserManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import LdapUserRoleHelper from "@opsera/know-your-role/roles/accounts/users/ldapUserRole.helper";
import UserDetailPanel from "components/settings/users/details/UserDetailPanel";

function UserDetailView() {
  const {userEmail, orgDomain} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [ldapUserData, setLdapUserData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {
    accessRoleData,
    cancelTokenSource,
    isMounted,
    userData,
    getAccessToken,
    isOpseraAdministrator,
    isSiteAdministrator,
    isPowerUser,
    isAuditor,
    isSecurityManager,
  } = useComponentStateReference();
  const domain = DataParsingHelper.parseNestedString(userData, "ldap.domain");

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async () => {
    try {
      if ((accessRoleData.OpseraAdministrator === true || domain === orgDomain) && LdapUserRoleHelper.canGetUserDetails(userData) === true) {
        setIsLoading(true);
        await getLdapUser();
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLdapUser = async () => {
    const response = await accountsActions.getUserByEmailV2(getAccessToken, cancelTokenSource, userEmail);

    if (response?.data != null) {
      setLdapUserData(new Model(response.data, ldapUserMetadata, false));
    }
  };

  const getActionBar = () => {
    if (ldapUserData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/user-management/"} />
          </div>
          <div>
          </div>
        </ActionBarContainer>
      );
    }
  };

  if ((accessRoleData.OpseraAdministrator !== true && domain !== orgDomain) || LdapUserRoleHelper.canGetUserDetails(userData) !== true) {
    return null;
  }

  // TODO: Instead of doing it this way, instead make a separate component for user profile view
  const accessAllowed = isOpseraAdministrator === true || isSiteAdministrator === true || isPowerUser === true || isAuditor === true || isSecurityManager === true;

  return (
    <DetailScreenContainer
      breadcrumbDestination={accessAllowed === true ? "activeUserDetailView" : "ldapUserDetailViewLimited"}
      metadata={ldapUserMetadata}
      dataObject={ldapUserData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      navigationTabContainer={<UserManagementSubNavigationBar activeTab={"userViewer"} />}
      detailPanel={
        <UserDetailPanel
          setLdapUserData={setLdapUserData}
          orgDomain={orgDomain}
          ldapUserData={ldapUserData}
        />
      }
    />
  );
}

export default UserDetailView;