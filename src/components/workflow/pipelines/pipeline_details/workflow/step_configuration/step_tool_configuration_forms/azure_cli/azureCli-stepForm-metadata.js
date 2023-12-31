import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const azureCliStepFormMetadata = {
  type: "Azure Functions Configuration",
  fields: [    
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequired: true
    },
    {
      label: "Script Type",
      id: "scriptType",
      isRequired: true
    },
    {
      label: "Commands",
      id: "commands",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "inline" || model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Opsera Script Library",
      id: "scriptId",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "script";
      },
    },    
    {
      label: "Source Code Management Type",
      id: "type",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },    
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Workspace",
      id: "bitbucketWorkspace",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Workspace/Project",
      id: "bitbucketWorkspaceName",
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Repository",
      id: "gitRepository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },    
    {
      label: "Repository",
      id: "gitRepositoryID",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Branch",
      id: "defaultBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequiredFunction: (model) => {
        return model?.getData("scriptType") === "package";
      },
    },
    {
      label: "Input Parameters",
      id: "enableInputParameters"
    },
    {
      label: "Parameters",
      id: "inputParameters",
      maxItems: 15,
      isRequiredFunction: (model) => {
        return model?.getData("enableInputParameters") === true;
      },
    },
    {
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Environment Variables",
      id: "environmentVariables",
      isRequiredFunction: (model) => {
        return model?.getData("saveEnvironmentVariables") === true;
      },
    },            
  ],
  newObjectFields: {    
    azureToolConfigId: "",
    azureCredentialId: "",    
    scriptType: "",
    commands: "",
    scriptId: "",
    type: "",
    gitToolId: "",
    bitbucketWorkspace: "",
    bitbucketWorkspaceName: "",
    gitRepository: "",
    gitRepositoryID: "",
    defaultBranch: "",
    enableInputParameters: false,
    inputParameters: [],
    saveEnvironmentVariables: false,
    environmentVariables: [],
  }
};

export default azureCliStepFormMetadata;
