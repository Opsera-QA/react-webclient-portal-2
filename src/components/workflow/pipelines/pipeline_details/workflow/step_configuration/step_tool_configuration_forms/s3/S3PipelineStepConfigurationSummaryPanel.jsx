import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

function S3PipelineStepConfigurationSummaryPanel({ s3DataObject, pipelineData, setActiveTab }) {
  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"jobType"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"s3Url"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"buildStepId"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"bucketName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={s3DataObject} fieldName={"awsToolConfigId"} />
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

S3PipelineStepConfigurationSummaryPanel.propTypes = {
  s3DataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default S3PipelineStepConfigurationSummaryPanel;
