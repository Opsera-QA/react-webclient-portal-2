import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import awsECSDeployStepFormMetadata from "./awsECSDeploy-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";
import TaskSelectInput from "./inputs/TaskSelectInput";
import DynamicNameToggleInput from "./inputs/DynamicNameToggleInput";
import DeleteResourceToggle from "./inputs/DeleteResourceToggle";

function AwsEcsDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [ecsServicesModel, setAWSECSDeployModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let ecsServiceConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      awsECSDeployStepFormMetadata
    );
    setAWSECSDeployModel(ecsServiceConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: ecsServicesModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || ecsServicesModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={ecsServicesModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <DockerPushStepSelectInput
        dataObject={ecsServicesModel}
        setDataObject={setAWSECSDeployModel}
        plan={plan}
        stepId={stepId}
      />
      <TaskSelectInput dataObject={ecsServicesModel} setDataObject={setAWSECSDeployModel} />
      <DynamicNameToggleInput
        dataObject={ecsServicesModel}
        setDataObject={setAWSECSDeployModel}
        fieldName={"dynamicServiceName"}
        pipelineId={pipelineId}
      />
      {ecsServicesModel && !ecsServicesModel?.getData("dynamicServiceName") && (
        <TextInputBase
          dataObject={ecsServicesModel}
          setDataObject={setAWSECSDeployModel}
          fieldName={"ecsServiceName"}
        />
      )}
      <TextInputBase
        dataObject={ecsServicesModel}
        setDataObject={setAWSECSDeployModel}
        fieldName={"ecsServiceContainerPort"}
      />
      <DeleteResourceToggle
        dataObject={ecsServicesModel}
        setDataObject={setAWSECSDeployModel}
        fieldName={"ecsDeleteResource"}
        disabled={true}
        pipelineId={pipelineId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AwsEcsDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AwsEcsDeployStepConfiguration;
