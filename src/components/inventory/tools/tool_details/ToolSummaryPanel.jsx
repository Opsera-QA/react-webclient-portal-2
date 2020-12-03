import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import DtoTextField from "../../../common/form_fields/dto_form_fields/dto-text-field";
import DtoDateField from "../../../common/form_fields/dto_form_fields/dto-date-field";
import SummaryPanelContainer from "../../../common/panels/detail_view/SummaryPanelContainer";

function ToolSummaryPanel({ toolData, setActiveTab }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"name"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"tool_identifier"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"tool_type_identifier"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"_id"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"account"} />
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={toolData} fieldName={"createdAt"} />
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={toolData} fieldName={"description"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolSummaryPanel.propTypes = {
  toolData: PropTypes.object,
  setActiveTab: PropTypes.func
}

export default ToolSummaryPanel;
