import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function SeleniumPipelineStepConfigurationSummaryPanel({ seleniumDataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"toolConfigId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"jobName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"toolJobId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"gitCredential"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"workspace"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"repository"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={seleniumDataObject} fieldName={"branch"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

SeleniumPipelineStepConfigurationSummaryPanel.propTypes = {
  seleniumDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default SeleniumPipelineStepConfigurationSummaryPanel;
