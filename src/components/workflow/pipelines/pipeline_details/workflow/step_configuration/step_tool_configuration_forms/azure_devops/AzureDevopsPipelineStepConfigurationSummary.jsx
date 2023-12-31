import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import PipelineStepSummaryPanelContainer
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/PipelineStepSummaryPanelContainer";
import ToolNameField from "components/common/fields/inventory/ToolNameField";

function AzureDevopsPipelineStepConfigurationSummaryPanel({ azureDevopsPipelineDataObject, pipelineData, setActiveTab }) {
  if (azureDevopsPipelineDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <ToolNameField model={azureDevopsPipelineDataObject} fieldName={"toolConfigId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureDevopsPipelineDataObject} fieldName={"organizationName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureDevopsPipelineDataObject} fieldName={"azurePipelineId"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureDevopsPipelineDataObject} fieldName={"projectName"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={azureDevopsPipelineDataObject} fieldName={"pipelineVersion"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AzureDevopsPipelineStepConfigurationSummaryPanel.propTypes = {
  azureDevopsPipelineDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AzureDevopsPipelineStepConfigurationSummaryPanel;
