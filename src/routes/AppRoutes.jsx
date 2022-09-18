import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "components/login/LoginForm";
import { Route, Router, Switch, useHistory } from "react-router-dom";
import { SecureRoute, LoginCallback } from "@okta/okta-react";

import Logout from "components/login/Logout";
import Sidebar from "components/sidebar/Sidebar";
import Dashboard from "components/dashboard/DashboardHome";
import About from "components/about/About";
import Pricing from "components/about/Pricing";
import OnlineHelp from "components/about/Help";
import Inventory from "components/inventory/Inventory";
import Signup from "components/user/signup/Signup";
import ApiConnector from "components/api_connector/ApiConnector";
import Pipeline from "components/pipeline/index";
import Analytics from "components/analytics/Analytics";
import Logs from "components/logs/Logs";
import Update from "components/update/Update";
import Registration from "components/landing/Registration";
import TagEditor from "components/settings/tags/TagManagement";
import TagDetailView from "components/settings/tags/tags_detail_view/TagDetailView";
import AccountSettingsView from "components/settings/AccountSettings";
import LdapGroupManagement from "components/settings/ldap_groups/LdapGroupManagement";
import LdapGroupDetailView from "components/settings/ldap_groups/details/LdapGroupDetailView";
import ToolDetailView from "components/inventory/tools/tool_details/ToolDetailView";
import DataMappingManagement from "components/settings/data_mapping/DataMappingManagement";
import Pipelines from "components/workflow/pipelines/Pipelines";
import PipelineDetailView from "components/workflow/pipelines/pipeline_details/PipelineDetailView";
import LdapDepartmentManagement from "components/settings/ldap_departments/LdapDepartmentManagement";
import LdapDepartmentDetailView
  from "components/settings/ldap_departments/details/LdapDepartmentDetailView";
import Reports from "components/reports/Reports";
import Marketplace from "components/insights/marketplace/Marketplace";
import InsightsSynopsis from "components/insights/summary/InsightsSynopsis";
import AnalyticsProfileSettings from "components/settings/analytics/analyticsProfileSettings";
import NotificationPolicyManagement from "components/notifications/NotificationPolicyManagement";
import ToolsUsedInPipelineReport from "components/reports/tools/pipelines/ToolsUsedInPipelineReport";
import Insights from "components/insights/dashboards/Insights";
import Lookup from "components/insights/lookup/Lookup";
import DashboardDetailView from "components/insights/dashboards/dashboard_details/DashboardDetailView";
import ProjectDataMappingDetailView
  from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailView";
import GitCustodian from "components/insights/gitCustodian/GitCustodian";
import ConnectedAssets from "components/insights/connectedAssets/ConnectedAssets";
import UserDataMappingDetailView from "components/settings/data_mapping/users/details/UserDataMappingDetailView";
import NotificationDetailView from "components/notifications/notification_details/NotificationDetailView";
import ToolProjectsView from "components/inventory/tools/tool_details/projects/ToolProjectsView";
import TagsUsedInPipelineReport from "components/reports/tags/pipelines/TagsUsedInPipelineReport";
import TagsUsedInToolsReport from "components/reports/tags/tools/TagsUsedInToolsReport";
import UserGroupMembershipReport from "components/reports/users/groups/UserGroupMembershipReport";
import UserPipelineOwnershipReport from "components/reports/users/pipelines/UserPipelineOwnershipReport";
import UserToolOwnershipReport from "components/reports/users/tools/UserToolOwnershipReport";
import UserTaskOwnershipReport from "components/reports/users/tasks/UserTaskOwnershipReport";
import ConsolidatedUserReport from "components/reports/users/user/consolidated_user_report/ConsolidatedUserReport";
import AccountRegistration from "components/user/account_registration/AccountRegistration";
import ToolCountsReport from "components/reports/tools/counts/ToolCountsReport";
import UserSettings from "components/user/user_settings/UserSettings";
import AccessTokenDetailView from "components/user/user_settings/access_tokens/details/AccessTokenDetailView";
import TaskDetailView from "components/tasks/details/TaskDetailView";
import TagsUsedInDashboardsReport from "components/reports/tags/dashboards/TagsUsedInDashboardReport";
import OrganizationManagement from "components/settings/organizations/OrganizationManagement";
import OrganizationDetailView from "components/settings/organizations/organization_detail_view/OrganizationDetailView";
import AnalyticsDataEntryManagement from "components/settings/analytics_data_entry/AnalyticsDataEntryManagement";
import AnalyticsDataEntryDetailView
  from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailView";
import Blueprint from "components/blueprint/Blueprint";
import DeleteTools from "components/settings/delete_tools/DeleteTools";
import ParametersInventory from "components/inventory/parameters/ParametersInventory";
import ToolInventory from "components/inventory/tools/ToolInventory";
import ScriptsInventory from "components/inventory/scripts/ScriptsInventory";
import PlatformInventory from "components/inventory/platform/PlatformInventory";
import TagReportsScreen from "components/reports/tags/TagReportsScreen";
import PipelineReportsScreen from "components/reports/pipelines/PipelineReportsScreen";
import ToolReportsScreen from "components/reports/tools/ToolReportsScreen";
import UserReportsScreen from "components/reports/users/UserReportsScreen";
import TaskManagement from "components/tasks/TaskManagement";
import TaskAllActivityPanel from "components/tasks/activity_logs/TaskAllActivityPanel";
import UserManagement from "components/settings/users/UserManagement";
import UserDetailView from "components/settings/users/details/UserDetailView";
import SsoUserDetailView from "components/settings/users/sso_user_details/SsoUserDetailView";
import AwsAccountRegistration from "components/user/aws_registration/AwsAccountRegistration";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import Release360 from "components/insights/release_360/Release360";
import SiteRoleManagement from "components/settings/ldap_site_roles/SiteRoleManagement";
import SiteRoleDetailView from "components/settings/ldap_site_roles/details/SiteRoleDetailView";
import NotificationPoliciesActivityLogs from "components/notifications/NotificationPoliciesActivityLogs";
import PipelineDataMappingDetailView
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailView";
import Faq from "components/about/faq/Faq";
import HelpDocumentationScreen from "components/about/help_documentation/HelpDocumentationScreen";
import SonarPipelineScanReport from "components/insights/reports/SonarPipelineScanReport";
import CoverityScanReport from "components/insights/reports/CoverityScanReport";
import LogsExportManagement from "components/settings/logs_management/LogsExportManagement";
import FreeTrialRegistration from "components/trial/registration/FreeTrialRegistration";
import OpseraFooter from "components/footer/OpseraFooter";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";
import OpseraFreeTrialSettingsManagement from "components/header/OpseraFreeTrialSettingsManagement";
import FreeTrialInsightsLanding from "components/trial/insights/FreeTrialInsightsLanding";
import AdminToolsRoutes from "routes/AdminToolsRoutes";
import Home from "Home";
import ToolchainRoutes from "routes/ToolchainRoutes";
import PageNotFound from "components/not_found/PageNotFound";

const AppRoutes = ({ authenticatedState, isPublicPathState, authClient, userData, hideSideBar }) => {
  const history = useHistory();

  useEffect(() => {
  }, [userData, authenticatedState, isPublicPathState, hideSideBar]);

  // Not used in free trial
  const getSideBar = () => {
    return (
      <Sidebar
        userData={userData}
        hideSideBar={hideSideBar}
      />
    );
  };

  // Authenticated routes
  return (
    <div className={"container-fluid m-0"}>
      <div className={"d-flex flex-row"}>
        {/*{getSideBar()}*/}
        <div className={"w-100 hide-x-overflow"}>
          {/*<Router history={history}>*/}
          {/*  <Switch>*/}
              <Route path="/login" render={() => <LoginForm authClient={authClient} />} />
              <Route path="/implicit/callback" component={LoginCallback} />
              <Route path="/logout" exact component={Logout} />

              <Route path="/trial/registration" exact component={FreeTrialRegistration} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/faq" exact component={Faq} />
              <Route path="/help-documentation" exact component={HelpDocumentationScreen} />
              <Route path="/about" exact component={About} />
              <Route path="/about/pricing" component={Pricing} />
              <Route path="/help" component={OnlineHelp} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/account/registration/:domain" exact component={AccountRegistration} />
              <Route path="/signup/awsmarketplace/:customerId" exact component={AwsAccountRegistration} />

              <Route path="/" exact component={Home} />

              <SecureRoute path="/trial/settings" exact component={OpseraFreeTrialSettingsManagement} />

              <SecureRoute path="/user/:tab?" exact component={UserSettings} />
              <SecureRoute path="/user/access-tokens/details/:tokenId?" exact component={AccessTokenDetailView} />

              <SecureRoute path="/inventory" exact component={Inventory} />
              <SecureRoute path="/inventory/tools" exact component={ToolInventory} />
              <SecureRoute path="/inventory/platform" exact component={PlatformInventory} />
              <SecureRoute path="/inventory/parameters" exact component={ParametersInventory} />
              <SecureRoute path="/inventory/scripts" exact component={ScriptsInventory} />
              <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView} />
              <SecureRoute path="/inventory/tools/details/:id/projects/:projectId" exact
                           component={ToolProjectsView} />

              <ToolchainRoutes />
              <SecureRoute path="/dashboard" component={Dashboard} />
              <SecureRoute path="/tools/:id?" component={ApiConnector} />
              <SecureRoute path="/logs" exact component={Logs} />
              <SecureRoute path="/blueprint/:id?/:run?" exact component={Blueprint} />
              <SecureRoute path="/update" component={Update} />


              <SecureRoute path="/reports" exact component={Reports} />
              <SecureRoute path="/reports/tags" exact component={TagReportsScreen} />
              <SecureRoute path="/reports/tools" exact component={ToolReportsScreen} />
              <SecureRoute path="/reports/pipelines" exact component={PipelineReportsScreen} />
              <SecureRoute path="/reports/users" exact component={UserReportsScreen} />


              <SecureRoute path="/reports/tools/tools-used-in-pipeline" exact component={ToolsUsedInPipelineReport} />
              <SecureRoute path="/reports/tools/tool-counts" exact component={ToolCountsReport} />


              <SecureRoute path="/reports/tags/tags-used-in-pipeline" exact component={TagsUsedInPipelineReport} />
              <SecureRoute path="/reports/tags/tags-used-in-tools" exact component={TagsUsedInToolsReport} />
              <SecureRoute path="/reports/tags/tags-used-in-dashboards" exact
                           component={TagsUsedInDashboardsReport} />


              <SecureRoute path="/reports/users/group-membership" exact component={UserGroupMembershipReport} />
              <SecureRoute path="/reports/users/pipeline-ownership" exact component={UserPipelineOwnershipReport} />
              <SecureRoute path="/reports/users/tool-ownership" exact component={UserToolOwnershipReport} />
              <SecureRoute path="/reports/users/task-ownership" exact component={UserTaskOwnershipReport} />
              <SecureRoute path="/reports/users/user-report" exact component={ConsolidatedUserReport} />


              <SecureRoute path="/notifications" exact component={NotificationPolicyManagement} />
              <SecureRoute path="/notifications/activity" exact component={NotificationPoliciesActivityLogs} />
              <SecureRoute path="/notifications/details/:id" exact component={NotificationDetailView} />


              <SecureRoute path="/insights/analytics" exact component={Analytics} />
              <SecureRoute path="/insights" exact component={Insights} />
              <SecureRoute path="/insights/dashboards/:id/:tab?" exact component={DashboardDetailView} />
              <SecureRoute path="/insights/marketplace/:dashboardId?" component={Marketplace} />
              <SecureRoute path="/insights/lookup" exact component={Lookup} />
              <SecureRoute path="/insights/release360" exact component={Release360} />
              <SecureRoute path="/insights/synopsis" component={InsightsSynopsis} />
              <SecureRoute path="/insights/connected-assets" component={ConnectedAssets} />
              <SecureRoute path="/insights/git-custodian" component={GitCustodian} />

              {/*Insights Reports*/}
              <SecureRoute path="/insights/reports/scans/sonar/:pipelineId/:stepId/:runCount/:issueType"
                           component={SonarPipelineScanReport} />
              <SecureRoute path="/insights/reports/scans/coverity/:pipelineId/:projectName/:runCount/:coveritySeverity"
                           component={CoverityScanReport} />


              <SecureRoute path="/task" exact component={TaskManagement} />
              <SecureRoute path="/task/activity" exact component={TaskAllActivityPanel} />
              <SecureRoute path="/task/details/:id" exact component={TaskDetailView} />

              <AdminToolsRoutes />


              <SecureRoute path="/pipeline" component={Pipeline} />
              <SecureRoute path="/workflow/catalog/library" exact component={PipelineCatalogLibrary} />
              <SecureRoute path="/workflow/:tab?" exact component={Pipelines} />
              <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />


              <SecureRoute path="/settings" exact component={AccountSettingsView} />
              <SecureRoute path="/settings/delete" component={DeleteTools} />
              <SecureRoute path="/settings/:orgDomain?/groups/" exact component={LdapGroupManagement} />
              <SecureRoute path="/settings/:orgDomain/groups/details/:groupName" exact
                           component={LdapGroupDetailView} />
              <SecureRoute path="/settings/:orgDomain?/site-roles/" exact component={SiteRoleManagement} />
              <SecureRoute path="/settings/:orgDomain/site-roles/details/:groupName" exact
                           component={SiteRoleDetailView} />
              <SecureRoute path="/settings/:orgDomain?/departments" exact component={LdapDepartmentManagement} />
              <SecureRoute path="/settings/:orgDomain/departments/details/:departmentName" exact
                           component={LdapDepartmentDetailView} />
              <SecureRoute path="/settings/organizations/" exact component={OrganizationManagement} />
              <SecureRoute path="/settings/organizations/details/:id" exact component={OrganizationDetailView} />
              <SecureRoute path="/settings/analytics-data-entries/" exact component={AnalyticsDataEntryManagement} />
              <SecureRoute path="/settings/analytics-data-entries/details/:id" exact
                           component={AnalyticsDataEntryDetailView} />
              <SecureRoute path="/settings/user-management/" exact component={UserManagement} />
              <SecureRoute path="/settings/user-management/active/:orgDomain/:userEmail/details" exact
                           component={UserDetailView} />
              <SecureRoute path="/settings/user-management/pending/:userId/details" exact
                           component={SsoUserDetailView} />

              <SecureRoute path="/settings/logs-export-management" exact component={LogsExportManagement} />
              <SecureRoute path="/settings/tags" exact component={TagEditor} />
              <SecureRoute path="/settings/tags/:id" exact component={TagDetailView} />
              <SecureRoute path="/settings/analytics-profile" exact component={AnalyticsProfileSettings} />
              <SecureRoute path="/settings/data_mapping" exact component={DataMappingManagement} />
              <SecureRoute path="/settings/data_mapping/projects/details/:projectMappingId" exact
                           component={ProjectDataMappingDetailView} />
              <SecureRoute path="/settings/data_mapping/pipeline/details/:pipelineDataMappingId" exact
                           component={PipelineDataMappingDetailView} />
              <SecureRoute path="/settings/data_mapping/user_mapping/details/:usersMappingId" exact
                           component={UserDataMappingDetailView} />

              <SecureRoute path="/workspace" component={FreeTrialWorkspace} />
              <SecureRoute path="/unified-insights" component={FreeTrialInsightsLanding} />

          {/*    <Route*/}
          {/*      path={"*"}*/}
          {/*      component={PageNotFound}*/}
          {/*    />*/}
          {/*  </Switch>*/}
          {/*</Router>*/}
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
};

AppRoutes.propTypes = {
  authenticatedState: PropTypes.bool,
  isPublicPathState: PropTypes.bool,
  authClient: PropTypes.object,
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default AppRoutes;

