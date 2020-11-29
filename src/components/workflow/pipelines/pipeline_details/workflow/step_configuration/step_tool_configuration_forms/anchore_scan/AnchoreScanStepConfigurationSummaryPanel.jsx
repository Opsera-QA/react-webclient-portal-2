import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import SummaryPanelContainer from "../../../../../../../common/panels/detail_view/SummaryPanelContainer";
import DtoTextField from "../../../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import TextField from "../../../../../../../common/form_fields/text-field";
import PipelineStepSummaryPanelContainer from "../../PipelineStepSummaryPanelContainer";

function AnchoreScanStepConfigurationSummaryPanel({ anchoreDataObject, pipelineData, setActiveTab }) {

  if (anchoreDataObject == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <PipelineStepSummaryPanelContainer setActiveTab={setActiveTab} pipelineData={pipelineData}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={anchoreDataObject} fieldName={"anchoreToolConfigId"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={anchoreDataObject} fieldName={"accountUsername"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={anchoreDataObject} fieldName={"anchoreUrl"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={anchoreDataObject} fieldName={"dockerImageUrl"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={anchoreDataObject} fieldName={"ecrPushStepId"}/>
        </Col>
      </Row>
    </PipelineStepSummaryPanelContainer>
  );
}

AnchoreScanStepConfigurationSummaryPanel.propTypes = {
  anchoreDataObject: PropTypes.object,
  pipelineData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default AnchoreScanStepConfigurationSummaryPanel;
