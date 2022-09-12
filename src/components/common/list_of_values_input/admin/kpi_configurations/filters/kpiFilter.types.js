export const KPI_FILTER_TYPES = {
  TAGS: "tags",
  DATE: "date",
  GOALS: "goals",
  NOTES: "notes",
  JENKINS_RESULT: "jenkins-result",
  JENKINS_JOB_URL: "jenkins-job-url",
  JENKINS_BUILD_NUMBER: "jenkins-build-number",
  JIRA_ISSUE_TYPE: "jira-issue-type",
  JIRA_ISSUE_COMPONENTS: "jira-issue-components",
  JIRA_ISSUE_LABELS: "jira-issue-labels",
  JIRA_ISSUE_STATUS: "jira-issue-status",
  JIRA_ISSUE_START_STATUS: "jira-issue-start-status",
  JIRA_ISSUE_DONE_STATUS: "jira-issue-done-status",
  SONAR_PROJECT_KEY: "sonar-project-key",
  DOMAIN: "domain",
  APPLICATION: "application",
  RELEASE: "release",
  SPRINT: "sprint",
  PROJECT: "project",
  SELENIUM_TEST_SUITES: "selenium-test-suites",
  SONAR_PROJECT_LANGUAGES: "sonar-project-languages",
  SERVICE_NOW_PRIORITIES: "servicenow-priorities",
  SERVICE_NOW_TOOLS: "servicenow-tools",
  SERVICE_NOW_ASSIGNMENT_GROUPS: "servicenow-assignment-groups",
  SERVICE_NOW_SERVICE_OFFERINGS: "servicenow-service-offerings",
  SERVICE_NOW_CONFIGURATION_ITEMS: "servicenow-configuration-items",
  SERVICE_NOW_BUSINESS_SERVICES: "servicenow-business-services",
  HIERARCHY_FILTERS: "hierarchyFilters",
  DEPLOYMENT_STAGE: "deployment-stage",
  GITLAB_PROJECT: "gitlab-project",
  JIRA_PRIORITIES:"jira-priorities",
  JIRA_PROJECTS:"jira-projects"
};

export const KPI_FILTER_TYPE_LABELS = {
  TAGS: "Tags",
  DATE: "Date",
  GOALS: "Goals",
  NOTES: "Notes",
  JENKINS_RESULT: "Jenkins Result",
  JENKINS_JOB_URL: "Jenkins Build URL",
  JENKINS_BUILD_NUMBER: "Jenkins Build Number",
  JIRA_ISSUE_TYPE: "Jira Issues Type",
  JIRA_ISSUE_COMPONENTS: "Jira Issues Components",
  JIRA_ISSUE_LABELS: "Jira Issues Labels",
  JIRA_ISSUE_STATUS: "Jira Issue Status",
  JIRA_ISSUE_START_STATUS: "Jira Issue Start Status",
  JIRA_ISSUE_DONE_STATUS: "Jira Issue Done Status",
  SONAR_PROJECT_KEY: "Sonar Project Keys",
  DOMAIN: "Domain",
  APPLICATION: "Application",
  RELEASE: "Release",
  SPRINT: "Sprint",
  PROJECT: "Project",
  SELENIUM_TEST_SUITES: "Selenium Test Suites",
  SONAR_PROJECT_LANGUAGES: "Sonar Project Languages",
  SERVICE_NOW_PRIORITIES: "Service Now Priorities",
  SERVICE_NOW_TOOLS: "Service Now Tool",
  SERVICE_NOW_ASSIGNMENT_GROUPS: "Service Now Assignment Groups",
  SERVICE_NOW_SERVICE_OFFERINGS: "Service Now Service Offerings",
  SERVICE_NOW_CONFIGURATION_ITEMS: "Service Now Configuration Items",
  SERVICE_NOW_BUSINESS_SERVICES: "Service Now Business Services",
  HIERARCHY_FILTERS: "Hierarchy Filters",
  DEPLOYMENT_STAGE: "Deployment Stage",
  GITLAB_PROJECT: "Gitlab Repository",
  JIRA_PRIORITIES:"Jira Priorities",
  JIRA_PROJECTS:"Jira Projects"
};

export const getKpiFilterTypeLabel = (kpiFilterType) => {
  switch (kpiFilterType) {
    case KPI_FILTER_TYPES.TAGS:
      return KPI_FILTER_TYPE_LABELS.TAGS;
    case KPI_FILTER_TYPES.DATE:
      return KPI_FILTER_TYPE_LABELS.DATE;
    case KPI_FILTER_TYPES.GOALS:
      return KPI_FILTER_TYPE_LABELS.GOALS;
    case KPI_FILTER_TYPES.NOTES:
      return KPI_FILTER_TYPE_LABELS.NOTES;
    case KPI_FILTER_TYPES.JENKINS_RESULT:
      return KPI_FILTER_TYPE_LABELS.JENKINS_RESULT;
    case KPI_FILTER_TYPES.JENKINS_JOB_URL:
      return KPI_FILTER_TYPE_LABELS.JENKINS_JOB_URL;
    case KPI_FILTER_TYPES.JENKINS_BUILD_NUMBER:
      return KPI_FILTER_TYPE_LABELS.JENKINS_BUILD_NUMBER;
    case KPI_FILTER_TYPES.JIRA_ISSUE_TYPE:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_TYPE;
    case KPI_FILTER_TYPES.JIRA_ISSUE_COMPONENTS:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_COMPONENTS;
    case KPI_FILTER_TYPES.JIRA_ISSUE_LABELS:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_LABELS;
    case KPI_FILTER_TYPES.JIRA_ISSUE_STATUS:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_STATUS;
    case KPI_FILTER_TYPES.JIRA_ISSUE_START_STATUS:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_START_STATUS;
    case KPI_FILTER_TYPES.JIRA_ISSUE_DONE_STATUS:
      return KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_DONE_STATUS;
    case KPI_FILTER_TYPES.SONAR_PROJECT_KEY:
      return KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_KEY;
    case KPI_FILTER_TYPES.DOMAIN:
      return KPI_FILTER_TYPE_LABELS.DOMAIN;
    case KPI_FILTER_TYPES.APPLICATION:
      return KPI_FILTER_TYPE_LABELS.APPLICATION;
    case KPI_FILTER_TYPES.RELEASE:
      return KPI_FILTER_TYPE_LABELS.RELEASE;
    case KPI_FILTER_TYPES.SPRINT:
      return KPI_FILTER_TYPE_LABELS.SPRINT;
    case KPI_FILTER_TYPES.PROJECT:
      return KPI_FILTER_TYPE_LABELS.PROJECT;
    case KPI_FILTER_TYPES.SELENIUM_TEST_SUITES:
      return KPI_FILTER_TYPE_LABELS.SELENIUM_TEST_SUITES;
    case KPI_FILTER_TYPES.SONAR_PROJECT_LANGUAGES:
      return KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_LANGUAGES;
    case KPI_FILTER_TYPES.SERVICE_NOW_PRIORITIES:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_PRIORITIES;
    case KPI_FILTER_TYPES.SERVICE_NOW_TOOLS:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_TOOLS;
    case KPI_FILTER_TYPES.SERVICE_NOW_ASSIGNMENT_GROUPS:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_ASSIGNMENT_GROUPS;
    case KPI_FILTER_TYPES.SERVICE_NOW_SERVICE_OFFERINGS:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_SERVICE_OFFERINGS;
    case KPI_FILTER_TYPES.SERVICE_NOW_CONFIGURATION_ITEMS:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_CONFIGURATION_ITEMS;
    case KPI_FILTER_TYPES.SERVICE_NOW_BUSINESS_SERVICES:
      return KPI_FILTER_TYPE_LABELS.SERVICE_NOW_BUSINESS_SERVICES;
    case KPI_FILTER_TYPES.HIERARCHY_FILTERS:
      return KPI_FILTER_TYPE_LABELS.HIERARCHY_FILTERS;
    case KPI_FILTER_TYPES.DEPLOYMENT_STAGE:
      return KPI_FILTER_TYPE_LABELS.DEPLOYMENT_STAGE;
    case KPI_FILTER_TYPES.GITLAB_PROJECT:
      return KPI_FILTER_TYPE_LABELS.GITLAB_PROJECT;
    case KPI_FILTER_TYPES.JIRA_PRIORITIES:
      return KPI_FILTER_TYPE_LABELS.JIRA_PRIORITIES;
    case KPI_FILTER_TYPES.JIRA_PROJECTS:
      return KPI_FILTER_TYPE_LABELS.JIRA_PROJECTS;
    default:
      return kpiFilterType;
  }
};

export const KPI_FILTER_SELECT_OPTIONS = [
  {
    type: KPI_FILTER_TYPES.TAGS,
    text: KPI_FILTER_TYPE_LABELS.TAGS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.DATE,
    text: KPI_FILTER_TYPE_LABELS.DATE,
    value: null,
  },
  {
    type: KPI_FILTER_TYPES.GOALS,
    text: KPI_FILTER_TYPE_LABELS.GOALS,
    value: {},
  },
  {
    type: KPI_FILTER_TYPES.NOTES,
    text: KPI_FILTER_TYPE_LABELS.NOTES,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_RESULT,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_RESULT,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_JOB_URL,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_JOB_URL,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.JENKINS_BUILD_NUMBER,
    text: KPI_FILTER_TYPE_LABELS.JENKINS_BUILD_NUMBER,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_TYPE,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_TYPE,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_COMPONENTS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_COMPONENTS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_START_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_START_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_ISSUE_DONE_STATUS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_ISSUE_DONE_STATUS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SONAR_PROJECT_KEY,
    text: KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_KEY,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.DOMAIN,
    text: KPI_FILTER_TYPE_LABELS.DOMAIN,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.APPLICATION,
    text: KPI_FILTER_TYPE_LABELS.APPLICATION,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.RELEASE,
    text: KPI_FILTER_TYPE_LABELS.RELEASE,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SPRINT,
    text: KPI_FILTER_TYPE_LABELS.SPRINT,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.PROJECT,
    text: KPI_FILTER_TYPE_LABELS.PROJECT,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SELENIUM_TEST_SUITES,
    text: KPI_FILTER_TYPE_LABELS.SELENIUM_TEST_SUITES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SONAR_PROJECT_LANGUAGES,
    text: KPI_FILTER_TYPE_LABELS.SONAR_PROJECT_LANGUAGES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_PRIORITIES,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_PRIORITIES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_TOOLS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_TOOLS,
    value: "",
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_ASSIGNMENT_GROUPS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_ASSIGNMENT_GROUPS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_SERVICE_OFFERINGS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_SERVICE_OFFERINGS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_CONFIGURATION_ITEMS,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_CONFIGURATION_ITEMS,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.SERVICE_NOW_BUSINESS_SERVICES,
    text: KPI_FILTER_TYPE_LABELS.SERVICE_NOW_BUSINESS_SERVICES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.HIERARCHY_FILTERS,
    text: KPI_FILTER_TYPE_LABELS.HIERARCHY_FILTERS,
    value: {
      filter1: [],
      filter2: [],
      filter3: [],
      filter4: [],
      filter5: [],
      filter6: [],
    },
  },
  {
    type: KPI_FILTER_TYPES.DEPLOYMENT_STAGE,
    text: KPI_FILTER_TYPE_LABELS.DEPLOYMENT_STAGE,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.GITLAB_PROJECT,
    text: KPI_FILTER_TYPE_LABELS.GITLAB_PROJECT,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_PRIORITIES,
    text: KPI_FILTER_TYPE_LABELS.JIRA_PRIORITIES,
    value: [],
  },
  {
    type: KPI_FILTER_TYPES.JIRA_PROJECTS,
    text: KPI_FILTER_TYPE_LABELS.JIRA_PROJECTS,
    value: [],
  },
];
