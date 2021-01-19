import paths from "./paths";
import {
  faAnalytics,
  faBuilding, faChartBar, faClipboardList, faCogs, faDraftingCompass, faEdit, faFileInvoice, faHeartbeat, faLink,
  faSitemap, faStream, faTags, faTimes, faUser, faUserCircle, faUserFriends, faUserPlus, faWrench, faChartNetwork,
  faFlag, faEnvelope, faUserTag, faProjectDiagram,
} from "@fortawesome/pro-light-svg-icons";
import { faTools } from "@fortawesome/pro-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";

const breadcrumbs = {
  // Inventory
  toolRegistry: {name: "toolRegistry", path: paths.toolRegistry, label: "Tool Registry", icon: faClipboardList},
  toolDetailView: {name: "toolDetailView", path: paths.toolDetailView, label: "Tool Details", icon: faTools},
  toolProjectDetailView: {name: "toolProjectDetailView", path: paths.toolProjectDetailView, label: "Tool Project Details", icon: faProjectDiagram},

  // Administration
  admin: {name: "admin", path: paths.admin, label: "Administration Tools", icon: faTools},

  systemStatus: {name: "systemStatus", path: paths.systemStatus, label: "System Status", icon: faHeartbeat},
  systemHealthCheck: {name: "systemHealthCheck", path: paths.systemHealthCheck, label: "System Health Check", icon: faHeartbeat},
  deprecatedReports: {name: "deprecatedReports", path: paths.deprecatedReports, label: "Reports", icon: faLink},
  reportsRegistration: {name: "reportsRegistration", path: paths.reportsRegistration, label: "Reports Registration", icon: faChartBar},
  systemManagement: {name: "systemManagement", path: paths.systemManagement, label: "System Management", icon: faEdit},

  siteNotificationManagement: {name: "siteNotificationManagement", path: paths.siteNotificationManagement, label: "Site Notification Management", icon: faFlag},
  siteNotificationDetailView: {name: "siteNotificationDetailView", path: paths.siteNotificationDetailView, label: "Site Notification Detail View", icon: faFlag},

  templateManagement: {name: "templateManagement", path: paths.templateManagement, label: "Template Management", icon: faStream},
  templateDetailView: {name: "templateDetailView", path: paths.templateDetailView, label: "Template Details", icon: faStream},
  toolManagement: {name: "toolManagement", path: paths.toolManagement, label: "Tool Management", icon: faWrench},
  deleteTools: {name: "deleteTools", path: paths.deleteTools, label: "Delete Tools", icon: faTimes},
  toolTypeDetailView: {name: "toolTypeDetailView", path: paths.toolTypeDetailView, label: "Tool Category Details", icon: faWrench},
  toolIdentifierDetailView: {name: "toolIdentifierDetailView", path: paths.toolIdentifierDetailView, label: "Tool Identifier Details", icon: faWrench},
  kpiManagement: {name: "kpiManagement", path: paths.kpiManagement, label: "Kpi Management", icon: faFileInvoice},
  kpiDetailView: {name: "kpiDetailView", path: paths.kpiManagement, label: "Kpi Details", icon: faFileInvoice},
  registeredUsersManagement: {name: "registeredUsersManagement", path: paths.registeredUsersManagement, label: "Registered Users Management", icon: faUserCircle},
  registeredUsersDetailView: {name: "registeredUsersDetailView", path: paths.registeredUsersManagement, label: "Registered User Details", icon: faUserCircle},
  apiManagement: {name: "apiManagement", path: paths.apiManagement, label: "API Management", icon: faLink},

  // Account settings
  accountSettings: {name: "accountSettings", path: paths.accountSettings, label: "Account Settings", icon: faCogs},

  // Customer System Status
  customerSystemStatus: {name: "customerSystemStatus", path: paths.customerSystemStatus, label: "Customer System Status", icon: faHeartbeat},

  // LDAP Users Administration
  ldapUserManagement: {name: "ldapUserManagement", path: paths.ldapUserManagement, label: "Users", icon: faUser},
  ldapUserDetailView: {name: "ldapUserDetailView", path: paths.ldapUserDetailView, label: "User Details", icon: faUser},
  ldapUserDetailViewLimited: {name: "ldapUserDetailViewLimited", path: paths.ldapUserDetailView, label: "My User Details", icon: faUser},

  // LDAP Groups Administration
  ldapGroupManagement: {name: "ldapGroupManagement", path: paths.ldapGroupManagement, label: "Groups", icon: faUserFriends},
  ldapGroupDetailView: {name: "ldapGroupDetailView", path: paths.ldapGroupDetailView, label: "Group Details", icon: faUserFriends},

  // Tag Management
  tagManagement: {name: "tagManagement", path: paths.tagManagement, label: "Tag Management", icon: faTags},
  tagDetailView: {name: "tagDetailView", path: paths.tagDetailView, label: "Tag Details", icon: faTags},

  // Ldap Organizations Administration
  ldapOrganizationManagement: {name: "ldapOrganizationManagement", path: paths.ldapOrganizationManagement, label: "Organizations", icon: faSitemap},
  ldapOrganizationDetailView: {name: "ldapOrganizationDetailView", path: paths.ldapOrganizationDetailView, label: "Organization Details", icon: faSitemap},

  ldapDepartmentManagement: {name: "ldapDepartmentManagement", path: paths.ldapDepartmentManagement, label: "Departments", icon: faBuilding},
  ldapDepartmentDetailView: {name: "ldapDepartmentDetailView", path: paths.ldapDepartmentDetailView, label: "Department Details", icon: faBuilding},

  // Ldap Organization Account Administration
  ldapOrganizationAccountManagement: {name: "ldapOrganizationAccountManagement", path: paths.ldapOrganizationAccountManagement, label: "Organization Accounts", icon: faSitemap},
  ldapOrganizationAccountDetailView: {name: "ldapOrganizationAccountDetailView", path: paths.ldapOrganizationDetailView, label: "Organization Account Details", icon: faUsers},

  customerOnboarding: {name: "customerOnboarding", path: paths.customerOnboarding, label: "Customer Onboarding", icon: faUserPlus},

  //Pipelines
  pipelines: {name: "pipelines", path: paths.pipelines, label: "Pipelines", icon: faDraftingCompass},
  pipelineDetailView: {name: "pipelineDetailView", path: paths.pipelineDetailView, label: "Pipeline Details", icon: faDraftingCompass},

  //Insights
  insights: {name: "insights", path: paths.insights, label: "Insights", icon: faChartNetwork},
  dashboardViewer: {name: "dashboardViewer", path: paths.dashboardViewer, label: "Dashboard Details", icon: faChartNetwork},

  //Reports
  reports: {name: "reports", path: paths.reports, label: "Reports", icon: faAnalytics},
  toolReports: {name: "toolReports", path: paths.toolReports, label: "Tool Reports", icon: faTools},
  toolsUsedInPipelineReport: {name: "toolsUsedInPipelineReport", path: paths.toolsUsedInPipelineReport, label: "Tools Used In Pipelines", icon: faDraftingCompass},
  tagsUsedInPipelineReport: {name: "tagsUsedInPipelineReport", path: paths.tagsUsedInPipelineReport, label: "Tags Used In Pipelines", icon: faTags},
  tagsUsedInToolsReport: {name: "tagsUsedInToolsReport", path: paths.tagsUsedInToolsReport, label: "Tags Used In Tools", icon: faTools},
  tagReports: {name: "tagReports", path: paths.tagReports, label: "Tag Reports", icon: faTags},
  pipelineReports: {name: "pipelineReports", path: paths.pipelineReports, label: "Pipeline Reports", icon: faDraftingCompass},

  //Analytics
  analyticsProfile: {name: "analyticsProfile", path: paths.analyticsProfile, label: "Analytics Profile", icon: faChartNetwork},
  mapping: {name: "mapping", path: paths.mapping, label: "Data Mapping Management", icon: faProjectDiagram},
  projectTaggingDetailView: {name: "projectTaggingDetailView", path: paths.projectTaggingDetailView, label: "Project Mapping Details", icon: faProjectDiagram},
  userTaggingDetailView: {name: "userTaggingDetailView", path: paths.userTaggingDetailView, label: "User Mapping Details", icon: faUserTag},

  //Notifications
  notifications : { name: "notifications", path: paths.notifications, label: "Notifications", icon: faEnvelope},
  notificationDetailView: {name: "notificationDetailView", path: paths.toolDetailView, label: "Notification Details", icon: faEnvelope},

  accessDenied: {name: "accessDenied", path: undefined, label: "Access Denied", icon: faEnvelope},
};

const trails = {
  // Inventory
  toolRegistry: {parent: undefined, breadcrumb: breadcrumbs.toolRegistry},
  toolDetailView: {parent: "toolRegistry", breadcrumb: breadcrumbs.toolDetailView},
  toolProjectDetailView: {parent: "toolRegistry", breadcrumb: breadcrumbs.toolProjectDetailView},

  // Administration
  admin: {parent: undefined, breadcrumb: breadcrumbs.admin},
  systemStatus: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},


  systemHealthCheck: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},
  deprecatedReports: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},
  reportsRegistration: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},
  systemManagement: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},
  // systemStatus: {parent: "admin", breadcrumb: breadcrumbs.systemStatus},


  templateManagement: {parent: "admin", breadcrumb: breadcrumbs.templateManagement},
  templateDetailView: {parent: "templateManagement", breadcrumb: breadcrumbs.templateDetailView},
  toolManagement: {parent: "admin", breadcrumb: breadcrumbs.toolManagement},
  toolTypeDetailView: {parent: "toolManagement", breadcrumb: breadcrumbs.toolTypeDetailView},
  toolIdentifierDetailView: {parent: "toolManagement", breadcrumb: breadcrumbs.toolIdentifierDetailView},
  kpiManagement: {parent: "admin", breadcrumb: breadcrumbs.kpiManagement},
  kpiDetailView: {parent: "kpiManagement", breadcrumb: breadcrumbs.kpiDetailView},
  registeredUsersManagement: {parent: "admin", breadcrumb: breadcrumbs.registeredUsersManagement},
  registeredUsersDetailView: {parent: "registeredUsersManagement", breadcrumb: breadcrumbs.registeredUsersDetailView},
  apiManagement: {parent: "admin", breadcrumb: breadcrumbs.apiManagement},
  siteNotificationManagement: {parent: "admin", breadcrumb: breadcrumbs.siteNotificationManagement},
  siteNotificationDetailView: {parent: "admin", breadcrumb: breadcrumbs.siteNotificationDetailView},

  // Account settings
  accountSettings: {parent: undefined, breadcrumb: breadcrumbs.accountSettings},

  // Customer System Status
  customerSystemStatus: {parent: "accountSettings", breadcrumb: breadcrumbs.customerSystemStatus},

  // LDAP Users Administration
  ldapUserManagement: {parent: "accountSettings", breadcrumb: breadcrumbs.ldapUserManagement},
  ldapUserDetailView: {parent: "ldapUserManagement", breadcrumb: breadcrumbs.ldapUserDetailView},
  ldapUserDetailViewLimited: {parent: "accountSettings", breadcrumb: breadcrumbs.ldapUserDetailViewLimited},

  // LDAP Groups Administration
  ldapGroupManagement: {parent: "accountSettings", breadcrumb: breadcrumbs.ldapGroupManagement},
  ldapGroupDetailView: {parent: "ldapGroupManagement", breadcrumb: breadcrumbs.ldapGroupDetailView},

  // Tag Management
  tagManagement: {parent: "accountSettings", breadcrumb: breadcrumbs.tagManagement},
  tagDetailView: {parent: "tagManagement", breadcrumb: breadcrumbs.tagDetailView},

  // Ldap Organizations Administration
  ldapOrganizationManagement: {parent: "admin", breadcrumb: breadcrumbs.ldapOrganizationManagement},
  ldapOrganizationDetailView: {parent: "ldapOrganizationManagement", breadcrumb: breadcrumbs.ldapOrganizationDetailView},

  ldapDepartmentManagement: {parent: "admin", breadcrumb: breadcrumbs.ldapDepartmentManagement},
  ldapDepartmentDetailView: {parent: "ldapDepartmentManagement", breadcrumb: breadcrumbs.ldapDepartmentDetailView},

  // Ldap Organization Account Administration
  ldapOrganizationAccountManagement: {parent: "admin", breadcrumb: breadcrumbs.ldapOrganizationAccountManagement},
  // TODO: set parent to ldapOrganizationAccountManagement when organization accounts screen is put to use
  ldapOrganizationAccountDetailView: {parent: "admin", breadcrumb: breadcrumbs.ldapOrganizationAccountDetailView},

  //Pipelines
  pipelines: {parent: undefined, destination: {name: "pipelines", path: paths.pipelines, label: "Pipelines"}},
  pipelineDetailView: {parent: "pipelines", destination: {name: "pipelineDetailView", path: paths.pipelineDetailView, label: "Pipeline Details"}},

  //Insights
  insights: {parent: undefined, breadcrumb: breadcrumbs.insights},
  dashboardViewer: {parent: "insights", breadcrumb: breadcrumbs.dashboardViewer},

  //Reports
  reports: {parent: undefined, breadcrumb: breadcrumbs.reports},
  toolReports: {parent: "reports", breadcrumb: breadcrumbs.toolReports},
  toolsUsedInPipelineReport: {parent: "toolReports", breadcrumb: breadcrumbs.toolsUsedInPipelineReport},
  tagsUsedInPipelineReport: {parent: "tagReports", breadcrumb: breadcrumbs.tagsUsedInPipelineReport},
  tagsUsedInToolsReport: {parent: "tagReports", breadcrumb: breadcrumbs.tagsUsedInToolsReport},
  tagReports: {parent: "reports", breadcrumb: breadcrumbs.tagReports},
  pipelineReports: {parent: "reports", breadcrumb: breadcrumbs.pipelineReports},

  // Analytics
  analyticsProfile: {parent: "accountSettings", breadcrumb: breadcrumbs.analyticsProfile},
  mapping : {parent: "accountSettings", breadcrumb : breadcrumbs.mapping},
  projectTaggingDetailView : {parent : "mapping", breadcrumb : breadcrumbs.projectTaggingDetailView},
  userTaggingDetailView : {parent : "mapping", breadcrumb : breadcrumbs.userTaggingDetailView},

  //Notifications
  notifications : {parent: undefined, breadcrumb: breadcrumbs.notifications},
  notificationDetailView: {parent: "notifications", breadcrumb: breadcrumbs.notificationDetailView},

  accessDenied: {parent: undefined, breadcrumb: breadcrumbs.accessDenied},
};

export const getTrail = (breadcrumb) => {
  let trail = trails[breadcrumb];
  let breadcrumbPath = [];
  let endPath = trail.breadcrumb;

  while (trail.parent != null) {
    trail = trails[trail.parent];
    breadcrumbPath.unshift(trail.breadcrumb);
  }

  return {trail: breadcrumbPath, breadcrumb: endPath};
};

export const getBreadcrumb = (breadcrumb) => {
  return breadcrumbs[breadcrumb];
};

export const getParentBreadcrumb = (breadcrumb) => {
  let parentBreadcrumb = trails[breadcrumb]?.parent;
  return parentBreadcrumb ? breadcrumbs[parentBreadcrumb] : null;
};