import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import BooleanField from "components/common/fields/boolean/BooleanField";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import DtoItemField from "components/common/form_fields/dto_form_fields/dto-item-field";
import DtoPropertiesField from "components/common/form_fields/dto_form_fields/dto-properties-field";
import DtoDateField from "components/common/form_fields/dto_form_fields/dto-date-field";

function ToolIdentifierSummaryPanel({ toolIdentifierData, setActiveTab }) {

  if (toolIdentifierData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"identifier"}/>
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"tool_type_identifier"}/>
        </Col>
        <Col lg={6}>
          <DtoDateField dataObject={toolIdentifierData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={toolIdentifierData} fieldName={"active"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={toolIdentifierData} fieldName={"usageType"}/>
        </Col>
        <Col lg={12}>
          <DtoItemField dataObject={toolIdentifierData} fieldName={"tags"}/>
        </Col>
        <Col lg={6}>
          <BooleanField dataObject={toolIdentifierData} fieldName={"enabledInRegistry"}/>
        </Col>
        <Col lg={6}>
          <DtoPropertiesField dataObject={toolIdentifierData} fieldName={"properties"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

ToolIdentifierSummaryPanel.propTypes = {
  toolIdentifierData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default ToolIdentifierSummaryPanel;
