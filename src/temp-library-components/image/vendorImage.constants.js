const baseBucketUrl = `${process.env.REACT_APP_OPSERA_S3_STORAGE_URL}/vendor-logos`;

export const vendorImageConstants = {};

vendorImageConstants.IMAGE_LINKS = {
  ANCHOR: `${baseBucketUrl}/anchor-96-256.png`,
  ANSIBLE: `${baseBucketUrl}/ansible-98-124.png`,
  AWS: `${baseBucketUrl}/icons8-amazon-web-services-96.png`,
  AZURE: `${baseBucketUrl}/icons8-azure-96.png`,
  BITBUCKET: `${baseBucketUrl}/bitbucket-76-75.png`,
  DOCKER: `${baseBucketUrl}/icons8-docker-96.png`,
  GIT: `${baseBucketUrl}/icons8-git-96.png`,
  GITHUB: `${baseBucketUrl}/icons8-github-96.png`,
  GITLAB: `${baseBucketUrl}/icons8-gitlab-96.png`,
  GOOGLE_CLOUD_PLATFORM: `${baseBucketUrl}/hashicorp-terraform-48.png`,
  JENKINS: `${baseBucketUrl}/jenkins-98-113.png`,
  JIRA: `${baseBucketUrl}/jira-74-220.png`,
  JUNIT: `${baseBucketUrl}/junit-97-172.png`,
  MICROSOFT_TEAMS: `${baseBucketUrl}/icons8-microsoft-teams-48.png`,
  MONGO_DB: `${baseBucketUrl}/icons8-mongodb-96.png`,
  NEXUS: `${baseBucketUrl}/nexus-122-116.png`,
  OPSERA: `/img/logos/opsera_bird_infinity_171_126.png`,
  SELENIUM: `${baseBucketUrl}/selenium-64-261.png`,
  SLACK: `${baseBucketUrl}/slack-64-252.png`,
  TEAMCITY: `${baseBucketUrl}/teamcity-120-120.png`,
  TERRAFORM: `${baseBucketUrl}/hashicorp-terraform-48.png`,
  TWISTLOCK: `${baseBucketUrl}/twistlock-64-254.png`,
  XUNIT: `${baseBucketUrl}/xunit-60-213.png`,
};

vendorImageConstants.TOOL_IDENTIFIER_LOGOS = {
  ANCHORE_INTEGRATOR: vendorImageConstants.IMAGE_LINKS.ANCHOR,
  ANCHORE_SCAN: vendorImageConstants.IMAGE_LINKS.ANCHOR,
  ANSIBLE: vendorImageConstants.IMAGE_LINKS.ANSIBLE,
  APIGEE: undefined,
  APPROVAL: vendorImageConstants.IMAGE_LINKS.OPSERA,
  ARGO: undefined,
  AWS_ACCOUNT: vendorImageConstants.IMAGE_LINKS.AWS,
  AWS_DEPLOY: vendorImageConstants.IMAGE_LINKS.AWS,
  AWS_ECS_DEPLOY: vendorImageConstants.IMAGE_LINKS.AWS,
  AWS_LAMDA: vendorImageConstants.IMAGE_LINKS.AWS,
  AQUASEC: undefined,
  AZURE: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_ACCOUNT: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_ACR_PUSH: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_AKS_DEPLOY: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_CLI: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_DEVOPS: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_FUNCTIONS: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_SCRIPTS: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_WEBAPPS: vendorImageConstants.IMAGE_LINKS.AZURE,
  AZURE_ZIP_DEPLOYMENT: vendorImageConstants.IMAGE_LINKS.AZURE,
  BITBUCKET: vendorImageConstants.IMAGE_LINKS.BITBUCKET,
  BLACKDUCK: undefined,
  BOOMI: undefined,
  BUILDKITE: undefined,
  CHILD_PIPELINE: vendorImageConstants.IMAGE_LINKS.OPSERA,
  COMMAND_LINE: undefined,
  COVERITY: undefined,
  CYPRESS: undefined,
  DATABRICKS_NOTEBOOK: undefined,
  DOCKER_PUSH: vendorImageConstants.IMAGE_LINKS.DOCKER,
  DOCKER_CLI: vendorImageConstants.IMAGE_LINKS.DOCKER,
  DOT_NET: undefined,
  DOT_NET_CLI: undefined,
  ELASTIC_BEANSTALK: vendorImageConstants.IMAGE_LINKS.AWS,
  EXTERNAL_API_INTEGRATOR: vendorImageConstants.IMAGE_LINKS.OPSERA,
  EXTERNAL_REST_API_INTEGRATION: vendorImageConstants.IMAGE_LINKS.OPSERA,
  FLYWAY_DATABASE_MIGRATOR: undefined,
  FORTIFY: undefined,
  GCHAT: undefined,
  GCP_ACCOUNT: vendorImageConstants.IMAGE_LINKS.GOOGLE_CLOUD_PLATFORM,
  GCP_DEPLOY: vendorImageConstants.IMAGE_LINKS.GOOGLE_CLOUD_PLATFORM,
  GITHUB: vendorImageConstants.IMAGE_LINKS.GITHUB,
  GITHUB_DEPLOY_KEY: vendorImageConstants.IMAGE_LINKS.GITHUB,
  GITLAB: vendorImageConstants.IMAGE_LINKS.GITLAB,
  GITOPS: vendorImageConstants.IMAGE_LINKS.GIT,
  GIT_OPERATION: vendorImageConstants.IMAGE_LINKS.GIT,
  GITSCRAPER: vendorImageConstants.IMAGE_LINKS.OPSERA,
  HASHICORP_VAULT: undefined,
  HELM: undefined,
  INFORMATICA: undefined,
  INFORMATICA_IDQ: undefined,
  JENKINS: undefined,
  JFROG_ARTIFACTORY_DOCKER: undefined,
  JFROG_ARTIFACTORY_MAVEN: undefined,
  JIRA: vendorImageConstants.IMAGE_LINKS.JIRA,
  JMETER: undefined,
  JUNIT: vendorImageConstants.IMAGE_LINKS.JUNIT,
  KAFKA_CONNECT: undefined,
  LIQUIBASE: undefined,
  MOCK_STEP: undefined,
  MONGO_DB: vendorImageConstants.IMAGE_LINKS.MONGO_DB,
  MONGODB_REALM: vendorImageConstants.IMAGE_LINKS.MONGO_DB,
  NEXUS: vendorImageConstants.IMAGE_LINKS.NEXUS,
  NPM: undefined,
  NUNIT: undefined,
  OCTOPUS: undefined,
  PACKER: undefined,
  PARALLEL_PROCESSOR: vendorImageConstants.IMAGE_LINKS.OPSERA,
  PMD: undefined,
  POWERSHELL: undefined,
  PROVAR: undefined,
  RUNTIME_SETTINGS: undefined,
  S3: undefined,
  SAP_CPQ: undefined,
  SALESFORCE_CODE_ANALYZER: undefined,
  SELENIUM: vendorImageConstants.IMAGE_LINKS.SELENIUM,
  SENTINEL: undefined,
  SERVICE_NOW: undefined,
  SFDC_CONFIGURATOR: undefined,
  SLACK: vendorImageConstants.IMAGE_LINKS.SLACK,
  SNAPLOGIC: undefined,
  SNYK: undefined,
  SONAR: undefined,
  SPINNAKER: undefined,
  SSH_UPLOAD: undefined,
  TEAMCITY: vendorImageConstants.IMAGE_LINKS.TEAMCITY,
  TEAMS: vendorImageConstants.IMAGE_LINKS.MICROSOFT_TEAMS,
  TERRAFORM: vendorImageConstants.IMAGE_LINKS.TERRAFORM,
  TERRAFORM_CLOUD: vendorImageConstants.IMAGE_LINKS.TERRAFORM,
  TERRAFORM_VCS: vendorImageConstants.IMAGE_LINKS.TERRAFORM,
  TERRASCAN: undefined,
  TWISTLOCK: vendorImageConstants.IMAGE_LINKS.TWISTLOCK,
  USER_ACTION: undefined,
  XUNIT: vendorImageConstants.IMAGE_LINKS.XUNIT,
  YAML_GIT_PROCESSOR: undefined,
};