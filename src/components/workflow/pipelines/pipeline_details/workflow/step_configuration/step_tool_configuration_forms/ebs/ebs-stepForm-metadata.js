// TODO: This will be used for both the regular and free trial registration screens, but putting it here so I can check in this half first
const ebsStepFormMetadata = {
  type: "EBS Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "AWS Tool Configuration",
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Docker Volume Path",
      id: "dockerVolumePath",
      formText : "Enter Source, Target path as a JSON Object"
    },
    {
      label: "Environments",
      id: "environments",
      formText : "Enter environments as a JSON Object"
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true
    },
    {
      label: "Regions",
      id: "regions"
    },
    {
      label: "Application Name",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Environment Name",
      id: "environmentName",
      isRequired: true
    },
    {
      label: "Application Version",
      id: "applicationVersionLabel",
      isRequired: true
    },
    {
      label: "S3/ECR Step",
      id: "s3ECRStepId",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
      isRequired: true
    },
    {
      label: "EC2 Key Name",
      id: "ec2KeyName"
    },
    {
      label: "Application Port",
      id: "port",
    },
    {
      label: "Platform",
      id: "platform",
      isRequired: true
    },
    {
      label: "Bucket Access",
      id: "bucketAccess",
      isRequired: true
    },
    {
      label: "Route 53 Host Zone ID",
      id: "hostedZoneId",
    },
    {
      label: "Route 53 Domain Name",
      id: "domainName",
    },
    {
      label: "Create Domain",
      id: "createDomain",
    },
    {
      label: "Solution Stack Version",
      id: "solutionStackName",
      isRequired: true
    },
    {
      label: "Custom Docker Compose",
      id: "customDockerCompose",
    },
    {
      label: "Docker Script",
      id: "dockerComposeScriptId",
      isRequiredFunction: (model) => {
        return model?.getData("customDockerCompose") === true;
      },
    },
    {
      label: "App startup wait Time(mins)",
      id: "delayTime",
      formText : "Max time to wait until environment health turns Green, limit 0-10mins",
      regexValidator: /\b([0-9]|10)\b/,
    },
    {
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Environment Variables",
      id: "environmentVariables"
    },
  ],
  
  fieldsAlt: [
    {
      label: "AWS Tool Configuration",
      id: "awsToolConfigId",
      isRequired: true
    },
    {
      label: "Docker Volume Path",
      id: "dockerVolumePath",
      formText : "Enter Source, Target path as a JSON Object"
    },
    {
      label: "Environments",
      id: "environments",
      formText : "Enter environments as a JSON Object"
    },
    {
      label: "S3 Bucket Name",
      id: "bucketName",
      isRequired: true
    },
    {
      label: "Regions",
      id: "regions"
    },
    {
      label: "Application Name",
      id: "applicationName",
      isRequired: true
    },
    {
      label: "Environment Name",
      id: "environmentName",
      isRequired: true
    },
    {
      label: "Application Version",
      id: "applicationVersionLabel",
      isRequired: true
    },
    {
      label: "S3/ECR Step",
      id: "s3ECRStepId",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
      isRequired: true
    },
    {
      label: "EC2 Key Name",
      id: "ec2KeyName"
    },
    {
      label: "Application Port",
      id: "port",
      isRequired: true
    },
    {
      label: "Platform",
      id: "platform",
      isRequired: true
    },
    {
      label: "Bucket Access",
      id: "bucketAccess",
      isRequired: true
    },
    {
      label: "Route 53 Host Zone ID",
      id: "hostedZoneId",
      isRequired: true
    },
    {
      label: "Route 53 Domain Name",
      id: "domainName",
      isRequired: true
    },
    {
      label: "Create Domain",
      id: "createDomain",
    },
    {
      label: "Solution Stack Version",
      id: "solutionStackName",
      isRequired: true
    },
    {
      label: "Custom Docker Compose",
      id: "customDockerCompose",
    },
    {
      label: "Docker Script",
      id: "dockerComposeScriptId",
      isRequiredFunction: (model) => {
        return model?.getData("customDockerCompose") === true;
      },
    },
    {
      label: "App startup wait Time(mins)",
      id: "delayTime",
      formText : "Max time to wait until environment health turns Green, limit 0-10mins",
      regexValidator: /\b([0-9]|10)\b/,
    },
    {
      label: "Specify Environment Variables",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Environment Variables",
      id: "environmentVariables"
    },
  ],

  newObjectFields:
    {
      awsToolConfigId: "",
      bucketName: "",
      regions: "",
      applicationName: "",
      applicationVersionLabel: "",
      s3ECRStepId: "",
      description: "",
      port: "",
      ec2KeyName: "",
      platform: "",
      dockerVolumePath: {},
      environments : {},
      bucketAccess : "",
      hostedZoneId: "",
      domainName : "",
      solutionStackName: "",
      createDomain: false,
      customDockerCompose: false,
      dockerComposeScriptId: "",
      delayTime: "",
      saveEnvironmentVariables: false,
      environmentVariables: [],
    }
};

export default ebsStepFormMetadata;