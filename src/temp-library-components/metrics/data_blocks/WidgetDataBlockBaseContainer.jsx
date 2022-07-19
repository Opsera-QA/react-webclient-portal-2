import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function WidgetDataBlockBaseContainer(
  {
    heightSize,
    backgroundColor,
    borderColor,
    fontColor,
    fontFamily,
    children,
    className,
  }) {
  const getHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      return `${heightSize * 50}px`;
    }

    return "100px";
  };

  const getBorder = () => {
    if (hasStringValue(borderColor) === true) {
      return `1px solid ${borderColor}`;
    }
  };

  return (
    <div
      className={className}
      style={{
        borderRadius: "1em",
        height: getHeight(),
        border: getBorder(),
        backgroundColor: backgroundColor,
        color: fontColor,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </div>
  );
}

WidgetDataBlockBaseContainer.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.number,
  widthSize: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

WidgetDataBlockBaseContainer.defaultProps = {
  heightSize: 2,
};

export default WidgetDataBlockBaseContainer;
