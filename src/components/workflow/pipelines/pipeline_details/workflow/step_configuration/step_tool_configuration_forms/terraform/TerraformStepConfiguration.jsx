import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TerraformJobTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformJobTypeSelectInput";
import TerraformScmToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolTypeSelectInput";
import TerraformScmToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformScmToolSelectInput";
import TerraformBitbucketWorkspaceInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformBitbucketWorkspaceInput";
import TerraformGitRepositoryInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitRepositoryInput";
import TerraformGitBranchInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformGitBranchInput";
import TerraformAWSCredsSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformAWSCredsSelectInput";
import terraformStepFormMetadata from "./terraform-stepForm-metadata";
import TerraformCustomParametersInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformCustomParametersInput";
import TerraformRuntimeArgsInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/inputs/TerraformRuntimeArgsInput";
import TerraformIAMRolesSelectInput from "./inputs/TerraformIAMRolesSelectInput";
import TerraformIAmRoleFlagBooleanInput from "./inputs/TerraformIAmRoleFlagBooleanInput";

function TerraformStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jobType, setJobType] = useState("");
  const [terraformStepConfigurationModel, setTerraformStepConfigurationModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  // const [configuration, setConfiguration] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);

    let { threshold, job_type } = stepTool;
    let terraformConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, terraformStepFormMetadata);
    
    setTerraformStepConfigurationModel(terraformConfigurationData);
    
    if (job_type) {
      setJobType(job_type);
    }

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: terraformStepConfigurationModel?.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    await parentCallback(item);
  };
 
  if (isLoading || terraformStepConfigurationModel == null) {
    return <DetailPanelLoadingDialog />;
  }
  
  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={terraformStepConfigurationModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TerraformJobTypeSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformScmToolTypeSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformScmToolSelectInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformBitbucketWorkspaceInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformGitRepositoryInput model={terraformStepConfigurationModel} setModel={setTerraformStepConfigurationModel} />
      <TerraformGitBranchInput  dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TextInputBase dataObject={terraformStepConfigurationModel} fieldName={"gitFilePath"} setDataObject={setTerraformStepConfigurationModel}/>
      <TerraformAWSCredsSelectInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformIAmRoleFlagBooleanInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      {!terraformStepConfigurationModel?.getData('iamRoleFlag') ?
      (<><TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"accessKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"secretKeyParamName"} />
      <TextInputBase dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} fieldName={"regionParamName"} />
      </>):(
        <TerraformIAMRolesSelectInput  
          dataObject={terraformStepConfigurationModel}
          setDataObject={setTerraformStepConfigurationModel}
          disabled={terraformStepConfigurationModel?.getData("awsToolConfigId").length === 0}
          toolConfigId={terraformStepConfigurationModel?.getData("awsToolConfigId")} />
      )}
      <TerraformRuntimeArgsInput dataObject={terraformStepConfigurationModel} setDataObject={setTerraformStepConfigurationModel} />
      <TerraformCustomParametersInput
        model={terraformStepConfigurationModel}
        setModel={setTerraformStepConfigurationModel}
      />    
    </PipelineStepEditorPanelContainer>
  );
}

TerraformStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default TerraformStepConfiguration;
