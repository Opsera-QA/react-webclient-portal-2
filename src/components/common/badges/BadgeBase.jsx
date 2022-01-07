import React  from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function BadgeBase({icon, badgeText, className}) {
  const getIcon = () => {
    if (icon) {
      return (
        <IconBase
          icon={icon}
          className={"mr-1"}
        />
      );
    }
  };

  if (hasStringValue(badgeText) !== true) {
    return null;
  }

  return (
    <span className={`badge standard-badge ${className} p-1`}>
      <span>{getIcon()}{badgeText}</span>
    </span>
  );
}

BadgeBase.propTypes = {
  icon: PropTypes.object,
  badgeText: PropTypes.any,
  className: PropTypes.string
};

export default React.memo(BadgeBase);