import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";

function OneLineGoalDataBlockBase({ goal, className, icon, }) {

  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 text-center mx-auto"}>
        {getLeftDataBlockIcon()}
        <Col xs={12} className={"my-auto"}>
          {goal}
        </Col>
        <Col xs={12} className="mt-auto text-muted">
          Goals
        </Col>
      </Row>
    </div>
  );
}

OneLineGoalDataBlockBase.propTypes = {
  goal: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default OneLineGoalDataBlockBase;