import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { Col, Row } from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import IconBase from "../../../../../../../common/icons/IconBase";
import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/pro-light-svg-icons";

function BoomiReportSummaryOverview({ boomiResultsModel, jobType }) {
  if (boomiResultsModel == null) {
    return (
      <Row className={"my-3 p-2"}>
        <Col lg={12}>
          <H4FieldSubHeader subheaderText={"Execution Overview"} />
        </Col>
        <Col lg={12}>
          <IconBase
            className={"mr-2"}
            icon={faExclamationCircle}
          />
          There were no summary stats captured with this execution.
        </Col>
      </Row>
    );
  }

  return (
    <Row className={"my-3"}>
      <Col lg={12}>
        <H4FieldSubHeader subheaderText={"Execution Overview"} />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={boomiResultsModel}
          fieldName={jobType === "CREATE_PACKAGE_COMPONENT" ? "numberOfComponentsTotal" : "numberOfPackagesTotal"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={boomiResultsModel}
          fieldName={jobType === "CREATE_PACKAGE_COMPONENT" ? "numberOfComponentsSuccess" : "numberOfPackagesSuccess"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={boomiResultsModel}
          fieldName={jobType === "CREATE_PACKAGE_COMPONENT" ? "numberOfComponentsErrors" : "numberOfPackagesErrors"}
        />
      </Col>
    </Row>
  );
}

BoomiReportSummaryOverview.propTypes = {
  boomiResultsModel: PropTypes.object,
  jobType: PropTypes.string
};

export default BoomiReportSummaryOverview;
