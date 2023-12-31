import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import azureAcrPushStepFormMetadata from "./azureAcrPush-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import AzureAcrPushStepJenkinsToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/inputs/AzureAcrPushStepJenkinsToolSelectInput";
import AzureAcrPushStepJenkinsJobSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/inputs/AzureAcrPushStepJenkinsJobSelectInput";
import AzureAcrPushAzureToolConfigIdSelectInput from "./inputs/AzureAcrPushAzureToolConfigIdSelectInput";
import AzureAcrPushBuildStepSelectInput from "./inputs/AzureAcrPushBuildStepSelectInput";
import AzureAcrPushStepRegistryNameSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/inputs/AzureAcrPushStepRegistryNameSelectInput";
import AzureAcrPushNewRepoBooleanInput from "./inputs/AzureAcrPushNewRepoBooleanInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import AzureAcrPushRepositoryNameSelectInput from "./inputs/AzureAcrPushRepositoryNameSelectInput";
import AzureAcrPushUseRunCountBooleanInput from "./inputs/AzureAcrPushUseRunCountBooleanInput";
import AzureAcrPushStepToolTypeSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/inputs/AzureAcrPushStepToolTypeSelectInput";
import AzureAcrPushCredentialIdSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_acr_push/inputs/AzureAcrPushCredentialIdSelectInput";

function AzureAcrPushStepConfiguration({ stepTool, closeEditorPanel, plan, stepId, pipelineId, createJob }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureAcrPushModel, setAzureAcrPushModel] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }
    let azureAcrPushConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureAcrPushStepFormMetadata
    );
    setAzureAcrPushModel(azureAcrPushConfigurationData);
    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const toolId = azureAcrPushModel.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);
      const toolConfiguration = {
        configuration: azureAcrPushModel.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: azureAcrPushModel.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);
      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const getRepositoryDropdown = () => {
    if (azureAcrPushModel.getData("newRepo") === true) {
      return (
        <AzureAcrPushRepositoryNameSelectInput
          dataObject={azureAcrPushModel}
          setDataObject={setAzureAcrPushModel}
          acrLoginUrl={azureAcrPushModel.getData("acrLoginUrl")}
          azureToolId={azureAcrPushModel.getData("azureToolConfigId")}
          applicationId={azureAcrPushModel?.getData("azureCredentialId")}
        />
      );
    }

    return (
      <TextInputBase
        setDataObject={setAzureAcrPushModel}
        dataObject={azureAcrPushModel}
        fieldName={"azureRepoName"}
      />
    );
  };

  if (isLoading || azureAcrPushModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureAcrPushModel}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <AzureAcrPushStepJenkinsToolSelectInput model={azureAcrPushModel} setModel={setAzureAcrPushModel} />
      <AzureAcrPushStepJenkinsJobSelectInput model={azureAcrPushModel} setModel={setAzureAcrPushModel} />
      <AzureAcrPushBuildStepSelectInput
        dataObject={azureAcrPushModel}
        setDataObject={setAzureAcrPushModel}
        plan={plan}
        stepId={stepId}
      />
      <AzureAcrPushStepToolTypeSelectInput
        model={azureAcrPushModel}
        setModel={setAzureAcrPushModel}
      />
      <AzureAcrPushAzureToolConfigIdSelectInput
        model={azureAcrPushModel}
        setModel={setAzureAcrPushModel}
        service={azureAcrPushModel?.getData("toolType")}
      />
      <AzureAcrPushCredentialIdSelectInput
        model={azureAcrPushModel}
        setModel={setAzureAcrPushModel}
      />
      <TextInputBase
        fieldName={"resource"}
        dataObject={azureAcrPushModel}
        setDataObject={setAzureAcrPushModel}
      />
      <AzureAcrPushStepRegistryNameSelectInput
        model={azureAcrPushModel}
        setModel={setAzureAcrPushModel}
        azureToolConfigId={azureAcrPushModel.getData("azureToolConfigId")}
        resource={azureAcrPushModel.getData("resource")}
        applicationId={azureAcrPushModel?.getData("azureCredentialId")}
      />
      <AzureAcrPushNewRepoBooleanInput dataObject={azureAcrPushModel} setDataObject={setAzureAcrPushModel} />
      {getRepositoryDropdown()}
      <AzureAcrPushUseRunCountBooleanInput dataObject={azureAcrPushModel} setDataObject={setAzureAcrPushModel} />
    </PipelineStepEditorPanelContainer>
  );
}

AzureAcrPushStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
  createJob: PropTypes.func,
};

export default AzureAcrPushStepConfiguration;
