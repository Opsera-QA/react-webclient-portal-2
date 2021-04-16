import regexHelpers from "utils/regexHelpers";

const sfdcGitBranchTaskConfigurationMetadata = {
  type: "SFDC Git Branch Structuring Task Configuration",
  fields: [
    {
      label: "Select Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true,
      maxLength: 250,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },  
    {
      label: "Auto Scaling",
      id: "autoScaleEnable"
    },
    {
      label: "Agent Label",
      id: "agentLabels",
      regexValidator: regexHelpers.regexTypes.generalTextWithoutSpacesPeriod,
      maxLength: 50
    },  
    {
      label: "Jenkins Job Name",
      id: "jobName",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Select SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      regexValidator: regexHelpers.regexTypes.loweCaseLetters
    },    
    {
      label: "Select Account",
      id: "gitCredential",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },        
    {
      id: "projectId",
      maxLength: 20,
      regexValidator: regexHelpers.regexTypes.generalText
    },
    {
      label: "Conversion Type",
      id: "conversionType",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.generalText
    },
    {
      id: "gitUrl",
    },
    
    {
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },

    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Destination Branch",
      id: "destinationBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      id: "sfdcToolId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "SFDC Account",
      id: "sfdcToolName",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
  ],
  newObjectFields:
    {
    toolConfigId: "",
    jobType: "SFDC_CONVERT_METADATA",
    autoScaleEnable: false,
    toolName: "",
    jobName: "",
    agentLabels: "",
    toolJobId: "",
    projectId: "",
    gitToolId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",
    defaultBranch: "",
    dependencyType:"",
    sfdcToolId: "",
    sfdcToolName: "",
    accountUsername: "",
    conversionType: "",
    destinationBranch: ""
    }
};

export default sfdcGitBranchTaskConfigurationMetadata;