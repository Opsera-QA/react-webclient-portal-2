import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconBase from "components/common/icons/IconBase";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WizardWidgetDataBlockBase(
  {
    text,
    onClickFunction,
    className,
    icon,
    iconStyling,
    iconSize,
    disabled,
  }) {
  const {themeConstants} = useComponentStateReference();

  const getTopIcon = () => {
    if (icon) {
      return (
        <div>
          <IconBase
            icon={icon}
            iconSize={iconSize}
            iconStyling={iconStyling}
          />
        </div>
      );
    }
  };


  const getText = () => {
    if (text) {
      return (
        <div className={"light-gray-text-secondary font-inter-light-300 metric-block-footer-text"}>
          {text}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <WidgetDataBlockBaseContainer
        backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
        borderColor={themeConstants.BORDER_COLORS.GRAY}
        heightSize={3}
        widthSize={5}
        className={"mx-auto"}
        onClickFunction={onClickFunction}
        disabled={disabled}
      >
        <CenteredContentWrapper>
          <Row className={"w-100 h-100 mx-auto text-center"}>
            <Col xs={12} className={"text-center mx-0 mb-2"}>
              {getTopIcon()}
            </Col>
            <Col xs={12} className={"mt-auto text-center"}>
              {getText()}
            </Col>
          </Row>
        </CenteredContentWrapper>
      </WidgetDataBlockBaseContainer>
    </div>
  );
}

WizardWidgetDataBlockBase.propTypes = {
  text: PropTypes.any,
  className: PropTypes.string,
  icon: PropTypes.object,
  iconStyling: PropTypes.object,
  iconSize: PropTypes.string,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
};