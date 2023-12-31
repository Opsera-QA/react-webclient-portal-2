import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import {Col, Row} from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SalesforceLogSummarySuccessfulTestsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummarySuccessfulTestsTable";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import SalesforceLogSummaryFailedTestsTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/deploy_results/tests/SalesforceLogSummaryFailedTestsTable";
import SalesforceLogSummaryCodeCoverageTable from "../../components/SalesforceLogSummaryCodeCoverageTable";

function SalesforceLogSummaryTestResultsSummaryPanel({ salesforceDeployResultsModel, successfulTests, unsuccessfulTests, codeCoverageWarnings }) {
  if (salesforceDeployResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Salesforce Unit Test Details"}
        size={'sm'}
      />
    );
  }

  const getCodeCoverageComponents = () => {
    return codeCoverageWarnings;
  };

  return (
    <SummaryPanelContainer className={"m-3"}>
      <Row>
        <Col lg={12}>
          <H4FieldSubHeader subheaderText={"Unit Test Details"} />
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
            successfulTests={successfulTests}
            hasUnsuccessfulTests={unsuccessfulTests?.length > 0}
          />
        </Col>
        <Col lg={12}>
          <SalesforceLogSummaryFailedTestsTable
            unsuccessfulTests={unsuccessfulTests}
            hasSuccessfulTests={successfulTests?.length > 0}
          />
        </Col>
        <Col lg={12}>
          <SalesforceLogSummaryCodeCoverageTable
            codeCoverageComponents={getCodeCoverageComponents()}
            hasCodeCoverageComponents={getCodeCoverageComponents()?.length > 0}
          />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}


SalesforceLogSummaryTestResultsSummaryPanel.propTypes = {
  salesforceDeployResultsModel: PropTypes.object,
  successfulTests: PropTypes.array,
  unsuccessfulTests: PropTypes.array,
  codeCoverageWarnings: PropTypes.array,
};

export default SalesforceLogSummaryTestResultsSummaryPanel;