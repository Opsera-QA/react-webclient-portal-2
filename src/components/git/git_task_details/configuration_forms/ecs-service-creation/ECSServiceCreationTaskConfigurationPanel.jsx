import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import modelHelpers from "components/common/model/modelHelpers";
import ec2ServiceCreationTaskConfigurationMetadata from "./ecs-service-creation-git-task-configuration";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AWSToolSelectInput from "./inputs/AWSToolSelectInput";
import TextInputBase from "../../../../common/inputs/text/TextInputBase";
import ClusterTemplateSelectInput from "./inputs/ClusterTemplateSelectInput";
import VPCSelectInput from "./inputs/VPCSelectInput";
import ClusterSelectInput from "./inputs/ClusterSelectInput";
import LoadBalancerSelectInput from "./inputs/LoadBalancerSelectInput";
import NetworkingOnlySubForm from "../ecs-cluster-creation/sub_forms/NetworkingOnlySubForm";
import EC2SubForm from "../ecs-cluster-creation/sub_forms/EC2SubForm";
import IAMRoleSelectInput from "./inputs/IAMRoleSelectInput";
import SubnetSelectInput from "./inputs/SubnetSelectInput";

function ECSServiceCreationTaskConfigurationPanel({
  gitTasksDataDto,
  gitTasksConfigurationData,
  setGitTasksConfigurationData,
}) {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const configurationData = modelHelpers.getToolConfigurationModel(
      gitTasksDataDto.getData("configuration"),
      ec2ServiceCreationTaskConfigurationMetadata
    );
    setGitTasksConfigurationData({ ...configurationData });
  };

  const getDynamicFields = () => {
    if(gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") && gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities") === "FARGATE"){
      return (
        <>
        <Col lg={12}>
          <IAMRoleSelectInput
            dataObject={gitTasksConfigurationData}
            setDataObject={setGitTasksConfigurationData}
            disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0}
            toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
          />
        </Col>
      <Col lg={12}>
        <SubnetSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("ecsServiceVpcId").length === 0}
          vpc={gitTasksConfigurationData?.getData("ecsServiceVpcId")}
        />
      </Col>
        </>
      );
    }
  };

  if (gitTasksDataDto == null || gitTasksConfigurationData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <Row>
      <Col lg={12}>
        <AWSToolSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"toolConfigId"}
        />
      </Col>
      <Col lg={12}>
        <ClusterTemplateSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceRequiresCompatibilities"}
        />
      </Col>
      <Col lg={12}>
        <ClusterSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0 || gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities").length === 0}
          requiresCompatibilities={gitTasksConfigurationData?.getData("ecsServiceRequiresCompatibilities")}
        />
      </Col>
      <Col lg={12}>
      <VPCSelectInput
        dataObject={gitTasksConfigurationData}
        setDataObject={setGitTasksConfigurationData}
        disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0}
        toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
      />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceName"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceDesiredCount"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceContainerPort"}
        />
      </Col>
      <Col lg={12}>
        <TextInputBase
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          fieldName={"ecsServiceLogGroup"}
        />
      </Col>
      <Col lg={12}>
        <LoadBalancerSelectInput
          dataObject={gitTasksConfigurationData}
          setDataObject={setGitTasksConfigurationData}
          disabled={gitTasksConfigurationData?.getData("toolConfigId").length === 0}
          toolConfigId={gitTasksConfigurationData?.getData("toolConfigId")}
        />
      </Col>
      {getDynamicFields()}
    </Row>
  );
}

ECSServiceCreationTaskConfigurationPanel.propTypes = {
  gitTasksDataDto: PropTypes.object,
  gitTasksConfigurationData: PropTypes.object,
  setGitTasksConfigurationData: PropTypes.func,
};

export default ECSServiceCreationTaskConfigurationPanel;
