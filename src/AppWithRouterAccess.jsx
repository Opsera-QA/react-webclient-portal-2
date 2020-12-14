import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import useAxios, { configure } from "axios-hooks";
import AuthContextProvider from "./contexts/AuthContext";
import LoadingDialog from "./components/common/status_notifications/loading";
import Home from "./Home";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./components/dashboard/DashboardHome";
import Profile from "./components/user/Profile";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import OnlineHelp from "./components/about/Help";
import Inventory from "./components/inventory/Inventory";
import Signup from "./components/user/Signup";
import ApiConnector from "./components/api_connector/ApiConnector";
import Pipeline from "./components/pipeline/index";
import Platform from "./components/platform/Platform";
import Analytics from "./components/analytics/Analytics";
import Insights from "./components/insights/Insights";
import DashboardDetailView from "./components/insights/dashboard_details/DashboardDetailView"
import Logs from "./components/logs/Logs";
import Update from "./components/update/Update";
import AdminTools from "./components/admin/AdminTools";
import DeleteTools from "./components/admin/delete_tools/DeleteTools";
import RegisteredUsersManagement from "./components/admin/registered_users/RegisteredUsersManagement";
import RegisteredUserDetailView
  from "./components/admin/registered_users/registered_user_details/RegisteredUserDetailView";
import ManageSystems from "./components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "./components/admin/analytics/ReportsRegistration";
import SystemStatus from "./components/admin/status/SystemStatus";
import Registration from "./components/landing/Registration";
import TagEditor from "./components/settings/tags/TagManagement";
import TagDetailView from "./components/settings/tags/tags_detail_view/TagDetailView";
import KpiManagement from "./components/admin/kpi_editor/KpiManagement";
import KpiDetailView from "./components/admin/kpi_editor/kpi_detail_view/KpiDetailView";
import TemplateManagement from "./components/admin/template_editor/TemplateManagement";
import OPBlueprintMain from "./components/blueprint/blueprint";
import LdapOrganizationsView from "./components/admin/accounts/ldap/organizations/LdapOrganizationManagement";
import LdapOrganizationDetailView
  from "./components/admin/accounts/ldap/organizations/organizations_detail_view/LdapOrganizationDetailView";
import LdapCustomerOnboardView from "./components/admin/accounts/ldap/customer_onboard/LdapCustomerOnboard";
import FreeTrialRegistration from "./components/free_trial/Registration";
import FreeTrialLanding from "./components/free_trial/landing_page/Landing";
import ApiConnectionDemo from "./components/api_connector/ApiDemo";
import CommonTableDemo from "./components/common/samples/tableImplementation";
import CustomerSystemStatus from "./components/settings/customer_system_status/CustomerSystemStatus";
import LdapUserManagement from "./components/settings/ldap_users/LdapUserManagement";
import LdapUserDetailView from "./components/settings/ldap_users/users_detail_view/LdapUserDetailView";
import AccountSettingsView from "./components/settings/AccountSettings";
import LdapGroupManagement from "./components/settings/ldap_groups/LdapGroupManagement";
import LdapGroupDetailView from "./components/settings/ldap_groups/ldap_group_detail/LdapGroupDetailView";
import ToolDetailView from "./components/inventory/tools/tool_details/ToolDetailView";
import TemplateDetailView from "./components/admin/template_editor/template_detail_view/TemplateDetailView";
import ToolManagement from "./components/admin/tools/ToolManagement";
import ToolTypeDetailView from "./components/admin/tools/tool_type/tool_type_detail_view/ToolTypeDetailView";
import ToolIdentifierDetailView
  from "./components/admin/tools/tool_identifier/tool_identifier_detail_view/ToolIdentifierDetailView";
import Axios from "axios";
import Pipelines from "./components/workflow/pipelines/Pipelines";
import PipelineDetailView from "./components/workflow/pipelines/pipeline_details/PipelineDetailView";
import ErrorDialog from "./components/common/status_notifications/error";
import LdapOrganizationAccountDetailView
  from "./components/admin/accounts/ldap/organization_accounts/organization_accounts_detail_view/LdapOrganizationAccountDetailView";
import LdapOrganizationAccountManagement
  from "./components/admin/accounts/ldap/organization_accounts/LdapOrganizationAccountManagement";
import ToastContextProvider from "./contexts/DialogToastContext";
import LdapDepartmentManagement from "./components/admin/accounts/ldap/ldap_departments/LdapDepartmentManagement";
import LdapDepartmentDetailView
  from "./components/admin/accounts/ldap/ldap_departments/department_detail_view/LdapDepartmentDetailView";
import Reports from "./components/reports/Reports";
import ToolReports from "./components/reports/tools/ToolReports";
import PipelineReports from "./components/reports/pipelines/PipelineReports";
import TagReports from "./components/reports/tags/TagReports";
import Reports_Old from "./components/reports/Reports_Old";
import Marketplace from "components/insights/kpi_marketplace/Marketplace";
import AnalyticsProfileSettings from "./components/settings/analytics/analyticsProfileSettings";

const OktaAuth = require("@okta/okta-auth-js");
const config = require("./config");


const AppWithRouterAccess = () => {
  const [hideSideBar, setHideSideBar] = useState(false);
  const history = useHistory();
  const onAuthRequired = (authService) => {
    console.log("onAuthRequired being called!");
    console.log(authService._authState);

    if (authService && !authService.isAuthenticated) {
      history.push("/login");
    }
  };

  const OKTA_CONFIG = {
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_OPSERA_OKTA_REDIRECTURI,
    disableHttpsCheck: false,
    pkce: true,
    onAuthRequired: onAuthRequired,
  };

  const authClient = new OktaAuth({
    issuer: OKTA_CONFIG.issuer,
    clientId: OKTA_CONFIG.client_id,
    redirectUri: OKTA_CONFIG.redirect_uri,
    tokenManager: {
      autoRenew: true,
      expireEarlySeconds: 160,
    },
  });

// Triggered when a token has expired
  authClient.tokenManager.on("expired", function(key, expiredToken) {
    console.log("Token with key", key, " has expired:");
    //console.log("could this trigger getting new token here?");
    //authClient.getAccessToken();
    //console.log(expiredToken);
  });
// Triggered when a token has been renewed
  authClient.tokenManager.on("renewed", function(key, newToken, oldToken) {
    console.log("Token with key", key, "has been renewed");
    //console.log("Old token:", oldToken);
    //console.log("New token:", newToken);
  });
// Triggered when an OAuthError is returned via the API (typically during token renew)
  authClient.tokenManager.on("error", function(err) {
    console.log("TokenManager error:", err);
    window.location.reload(false);
    // err.name
    // err.message
    // err.errorCode
    // err.errorSummary
    // err.tokenKey
    // err.accessToken
  });


  const axios = Axios.create({
    baseURL: config.apiServerUrl,
  });

  axios.interceptors.request.use(async (config) => {
      try {
        const tokenObject = await authClient.tokenManager.get("accessToken");
        if (tokenObject && tokenObject.accessToken) {
          config.headers["authorization"] = `Bearer ${tokenObject.accessToken}`;
          config.headers["cache-control"] = `no-cache`;
        }
        return config;
      } catch (err) {
        console.error("Error in authClient.tokenManager via Users Axios.interceptors");
        console.error(err);
      }
    },
    function(error) {
      return Promise.reject(error);
    },
  );
  configure({ axios });
  const [{ data, loading, error }, refetch] = useAxios(
    "/users",
  );

  useEffect(() => {
    enableSideBar(history.location.pathname);
  }, [data, history.location.pathname]);


  const enableSideBar = (path) => {
    if (path === "/login" || path === "/signup" || path === "/registration" || path === "/trial/registration") {
      setHideSideBar(true);
    } else {
      setHideSideBar(false);
    }
  };

  const refreshToken = () => {
    refetch();
  };

  const redirectFromLogin = () => {
    console.log("redirectFromLogin called");
    refetch();
    history.push("/");
  };


  if (!data && loading && !error) {
    return (<LoadingDialog/>);
  } else {
    return (
      <Security {...OKTA_CONFIG}>
        {
          (error &&
            !error.message.includes("401") &&
            !error.message.includes("undefined") &&
            !error.message.includes("cancelToken")) &&
          <div style={{ height: "55px" }}><ErrorDialog align="top" error={error}/></div>
        }
        <AuthContextProvider userData={data} refreshToken={refreshToken} authClient={authClient}>
          <ToastContextProvider>
            <Navbar hideAuthComponents={hideSideBar} userData={data}/>
            <div className="container-fluid" style={{ margin: "0" }}>
              <div className="d-flex flex-row">
                <Sidebar userData={data} hideSideBar={hideSideBar}/>

                <div className="w-100 pt-4 pb-4">
                  <Route path="/" exact component={Home}/>
                  {/*<SecureRoute path="/" exact component={Overview}/>*/}

                  <Route path='/login' render={(authClient) => <Login redirectFromLogin={redirectFromLogin}
                                                                      authClient={authClient}/>}/>
                  <Route path='/implicit/callback' component={LoginCallback}/>
                  <Route path="/logout" exact component={Logout}/>

                  <Route path="/signup" exact component={Signup}/>
                  <Route path="/about" exact component={About}/>
                  <Route path="/about/pricing" component={Pricing}/>
                  <Route path="/help" component={OnlineHelp}/>
                  <Route path="/registration" exact component={Registration}/>


                  <SecureRoute path="/profile" component={Profile}/>
                  <SecureRoute path="/inventory/:view" exact component={Inventory}/>
                  <SecureRoute path="/inventory/tools/details/:id" exact component={ToolDetailView}/>
                  <SecureRoute path="/dashboard" component={Dashboard}/>
                  <SecureRoute path="/tools/:id?" component={ApiConnector}/>
                  <SecureRoute path="/platform" component={Platform}/>
                  <SecureRoute path="/analytics" exact component={Analytics}/>
                  <SecureRoute path="/insights/dashboards" exact component={Insights}/>
                  <SecureRoute path="/insights/dashboards/:id/:tab?" exact component={DashboardDetailView}/>
                  <SecureRoute path="/logs" exact component={Logs}/>
                  <SecureRoute path="/blueprint" exact component={OPBlueprintMain}/>
                  <SecureRoute path="/update" component={Update}/>

                  {/* Reports */}
                  <SecureRoute path="/reports" exact component={Reports}/>
                  <SecureRoute path="/reports/registry" exact component={ToolReports}/>
                  <SecureRoute path="/reports/pipelines" exact component={PipelineReports}/>
                  <SecureRoute path="/reports/tags" exact component={TagReports}/>

                  {/* marketplace */}
                  <SecureRoute path="/insights/marketplace" component={Marketplace}/>

                  {/* Administration Pages */}
                  <SecureRoute path="/admin" exact component={AdminTools}/>
                  <SecureRoute path="/admin/delete" component={DeleteTools}/>
                  <SecureRoute path="/admin/manage_systems" component={ManageSystems}/>
                  <SecureRoute path="/admin/registered-users" exact component={RegisteredUsersManagement}/>
                  <SecureRoute path="/admin/registered-users/:id" exact component={RegisteredUserDetailView}/>
                  <SecureRoute path="/admin/system-status" component={SystemStatus}/>
                  <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration}/>
                  <SecureRoute path="/admin/tools/:tabKey?" exact component={ToolManagement}/>
                  <SecureRoute path="/admin/tools/types/details/:toolTypeId" exact component={ToolTypeDetailView}/>
                  <SecureRoute path="/admin/tools/identifiers/details/:toolIdentifierId" exact
                               component={ToolIdentifierDetailView}/>
                  <SecureRoute path="/admin/kpis" exact component={KpiManagement}/>
                  <SecureRoute path="/admin/kpis/:id" exact component={KpiDetailView}/>
                  <SecureRoute path="/admin/templates" exact component={TemplateManagement}/>
                  <SecureRoute path="/admin/templates/details/:templateId" exact component={TemplateDetailView}/>
                  <SecureRoute path="/admin/reports" exact component={Reports_Old}/>

                  {/* Ldap Account Pages */}
                  <SecureRoute path="/admin/organizations" exact component={LdapOrganizationsView}/>
                  <SecureRoute path="/admin/organizations/details/:organizationName" exact
                               component={LdapOrganizationDetailView}/>
                  <SecureRoute path="/admin/organization-accounts/:organizationName?" exact
                               component={LdapOrganizationAccountManagement}/>
                  <SecureRoute path="/admin/organization-accounts/:organizationDomain/details" exact
                               component={LdapOrganizationAccountDetailView}/>
                  <SecureRoute path="/accounts/create" exact component={LdapCustomerOnboardView}/>

                  {/*TODO: Move to settings?*/}
                  <SecureRoute path="/admin/departments" exact component={LdapDepartmentManagement}/>
                  <SecureRoute path="/admin/:orgDomain/departments/details/:departmentName" exact
                               component={LdapDepartmentDetailView}/>

                  {/*Pipelines*/}
                  <SecureRoute path="/pipeline" component={Pipeline}/> {/*Old Pipeline*/}
                  <SecureRoute path="/workflow/:tab?" exact component={Pipelines}/>
                  <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView}/>

                  {/*Settings*/}
                  <SecureRoute path="/settings" exact component={AccountSettingsView}/>
                  <SecureRoute path="/settings/:orgDomain?/groups/" exact component={LdapGroupManagement}/>
                  <SecureRoute path="/settings/:orgDomain/groups/details/:groupName" exact
                               component={LdapGroupDetailView}/>
                  <SecureRoute path="/settings/:orgDomain?/users/" exact component={LdapUserManagement}/>
                  <SecureRoute path="/settings/:orgDomain/users/details/:userEmail" exact
                               component={LdapUserDetailView}/>
                  <SecureRoute path="/settings/tags" exact component={TagEditor}/>
                  <SecureRoute path="/settings/tags/:id" exact component={TagDetailView}/>
                  <SecureRoute path="/settings/customer-system-status" exact component={CustomerSystemStatus}/>
                  <SecureRoute path="/settings/analytics-profile" exact component={AnalyticsProfileSettings}/>

                  <SecureRoute path="/demo/api" component={ApiConnectionDemo}/>
                  <SecureRoute path="/demo/table" component={CommonTableDemo}/>

                  {(process.env.REACT_APP_STACK === "free-trial") && <>
                    <Route path="/trial/registration" exact component={FreeTrialRegistration}/>
                    <SecureRoute path="/trial/landing/:id?" exact component={FreeTrialLanding}/>
                  </>}
                </div>
              </div>
              <div className="row fixed-row-footer-bottom">
                <div className="col text-center m-1" style={{ padding: 0, margin: 0, fontSize: ".6em" }}>© 2020 Opsera, Inc. The Continuous Orchestration Platform™
                </div>
              </div>
            </div>
          </ToastContextProvider>
        </AuthContextProvider>
      </Security>
    );
  }
};

export default AppWithRouterAccess;