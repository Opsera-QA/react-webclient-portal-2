import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import DtoTextField from "../../../../../common/form_fields/dto_form_fields/dto-text-field";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import SummaryPanelContainer from "../../../../../common/panels/detail_view/SummaryPanelContainer";

function LdapOrganizationSummaryPanel({ ldapOrganizationData, setActiveTab }) {

  if (ldapOrganizationData == null) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgName"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"description"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"envCount"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"numberOfLicenses"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"objectCount"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgOwner"}/>
        </Col>
        <Col lg={6}>
          <DtoTextField dataObject={ldapOrganizationData} fieldName={"orgOwnerEmail"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

LdapOrganizationSummaryPanel.propTypes = {
  ldapOrganizationData: PropTypes.object,
  setActiveTab: PropTypes.func
};

export default LdapOrganizationSummaryPanel;
