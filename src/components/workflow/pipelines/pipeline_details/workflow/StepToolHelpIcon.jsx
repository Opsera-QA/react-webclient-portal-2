import React from "react";
import PropTypes from "prop-types";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import AzureDevopsPipelineStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureDevopsPipelineStepConfigurationHelpDocumentation";
import PipelineStepSetupHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/PipelineStepSetupHelpDocumentation";
import DockerEcrPushStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/DockerEcrPushStepConfigurationHelpDocumentation";
import AwsEcsDeployStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/AwsEcsDeployStepConfigurationHelpDocumentation";
import AzureAksDeployPipelineStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureAksDeployPipelineStepConfigurationHelpDocumentation";
import AzureAcrPushPipelineStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/AzureAcrPushPipelineStepConfigurationHelpDocumentation";
import OctopusDeployStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/OctopusDeployStepConfigurationHelpDocumentation";
import PipelineSourceRepositoryHelpDocumentation
  from "../../../../common/help/documentation/pipelines/step_configuration/PipelineSourceRepositoryHelpDocumentation";
import AnsibleStepConfigurationHelp
  from "../../../../common/help/documentation/pipelines/step_configuration/AnsibleStepConfigurationHelpDocumentation";

function StepToolHelpIcon({type, tool, className, iconClassName}) {
  // TODO: Alphabetize when adding new help panels
  const getToolHelpPanel = () => {
    switch (tool) {
      case "azure-devops":
        return <AzureDevopsPipelineStepConfigurationHelp/>;
      case "docker-push":
        return <DockerEcrPushStepConfigurationHelp/>;
      case "aws_ecs_deploy":
        return <AwsEcsDeployStepConfigurationHelp/>;
      case "azure_aks_deploy":
        return <AzureAksDeployPipelineStepConfigurationHelp/>;
      case "azure_acr_push":
        return <AzureAcrPushPipelineStepConfigurationHelp/>;
      case "octopus":
        return <OctopusDeployStepConfigurationHelp/>;
      case "ansible":
        return <AnsibleStepConfigurationHelp/>;
      case "jenkins":
      case "junit":
      case "xunit":
      case "sonar":
      case "command-line":
      case "npm":
      case "teamcity":
      case "jmeter":
      case "selenium":
      case "twistlock":
      case "aws-deploy":
      case "gcp-deploy":
      case "s3":
      case "databricks-notebook":
      case "ssh-upload":
      case "spinnaker":
      case "approval":
      case "cypress":
      case "argo":
      case "anchore-scan":
      case "anchore-integrator":
      case "sfdc-configurator":
      case "nexus":
      case "terraform":
      case "elastic-beanstalk":
      case "child-pipeline":
      case "mock-step":
      case "parallel-processor":
      case "conditional-operator":
      case "powershell":
      case "dotnet":
      case "nunit":
      case "jfrog_artifactory_docker":
      case "terrascan":
      case "kafka_connect":
      case "aws_lambda":
      case "coverity":
      case "jfrog_artifactory_maven":
      case "azure-functions":
      case "mongodb_realm":
      default:
        return null;
    }

  };

  const getHelpComponent = () => {
    if (type === "source") {
      return <PipelineSourceRepositoryHelpDocumentation/>;
    }

    if (type === "notification") {
      return null;
    }

    if (type === "step") {
      return <PipelineStepSetupHelpDocumentation/>;
    }

    return (getToolHelpPanel());
  };

  return (<LaunchHelpIcon iconClassName={iconClassName} className={className} helpComponent={getHelpComponent()} />);
}

StepToolHelpIcon.propTypes = {
  type: PropTypes.string,
  tool: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string
};

StepToolHelpIcon.defaultProps = {
  className: "mr-2 my-auto"
};

export default StepToolHelpIcon;
