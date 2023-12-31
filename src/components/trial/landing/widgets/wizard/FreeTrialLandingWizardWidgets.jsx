import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FreeTrialLandingSalesforcePipelineWizardWidget
  from "components/trial/landing/widgets/wizard/FreeTrialLandingSalesforcePipelineWizardWidget";
import FreeTrialLandingSdlcPipelineWizardWidget
  from "components/trial/landing/widgets/wizard/FreeTrialLandingSdlcPipelineWizardWidget";
import FreeTrialLandingGitCustodianWizardWidget
  from "components/trial/landing/widgets/wizard/FreeTrialLandingGitCustodianWizardWidget";

export default function FreeTrialLandingWizardWidgets({className}) {
  const {themeConstants} = useComponentStateReference();

  return (
    <div className={className}>
      <Row>
        <Col xs={4}>
          <FreeTrialLandingSdlcPipelineWizardWidget
          />
        </Col>
        <Col xs={4}>
          <FreeTrialLandingSalesforcePipelineWizardWidget
          />
        </Col>
        <Col xs={4}>
          <FreeTrialLandingGitCustodianWizardWidget
          />
        </Col>
      </Row>
    </div>
  );
}

FreeTrialLandingWizardWidgets.propTypes = {
  className: PropTypes.string,
};
