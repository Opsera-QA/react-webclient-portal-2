import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SalesforceLogSummarySuccessfulTestsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummarySuccessfulTestsTable";
import FieldSubHeader from "components/common/fields/FieldSubHeader";
import SalesforceLogSummaryFailedTestsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummaryFailedTestsTable";

function SalesforceLogSummaryTestResultsSummaryPanel({ salesforceDeployResultsModel, salesforceTestResultsModel }) {
  if (salesforceTestResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Unit Test Details"}
        size={'sm'}
      />
    );
  }

  return (
    <SummaryPanelContainer className={"step-configuration-summary m-3"}>
      <Row>
        <Col lg={12}>
          <FieldSubHeader subheaderText={"Unit Test Details"} />
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsTotal"}/>
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestsCompleted"}/>
        </Col>
        <Col lg={4}>
          <TextFieldBase dataObject={salesforceDeployResultsModel} fieldName={"numberTestErrors"}/>
        </Col>
        <Col lg={12}>
          <SalesforceLogSummarySuccessfulTestsTable
            successfulTests={salesforceTestResultsModel?.getData("successes")}
          />
        </Col>
        <Col lg={12}>
          <SalesforceLogSummaryFailedTestsTable
            failedTests={salesforceTestResultsModel?.getData("failures")}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryTestResultsSummaryPanel.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
  salesforceTestResultsModel: PropTypes.object,
};

export default SalesforceLogSummaryTestResultsSummaryPanel;