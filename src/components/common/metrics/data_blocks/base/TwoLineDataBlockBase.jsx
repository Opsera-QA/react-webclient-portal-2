import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TwoLineDataBlockBase({ title, subtitle, className, icon,}) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

  const getTitle = () => {
    if (title) {
      return (
        <div>
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div>
          {subtitle}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Row className={"w-100 h-100 text-center mx-auto"}>
        {getLeftDataBlockIcon()}
        <Col xs={12} className="text-center data-block-focal-text">
          {getTitle()}
        </Col>
        <Col xs={12} className="text-center text-muted">
          {getSubtitle()}
        </Col>
      </Row>
    </div>
  );
}

TwoLineDataBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default TwoLineDataBlockBase;