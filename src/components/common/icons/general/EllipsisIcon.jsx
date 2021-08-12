import React from "react";
import PropTypes from "prop-types";
import {faEllipsisH} from "@fortawesome/pro-light-svg-icons";
import {OverlayTrigger} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Popover from "react-bootstrap/Popover";

function EllipsisIcon({ overlay, className, size, placement, maxWidth }) {
  const getPopover = () => {
    return (
      <Popover id={`input-popover`} style={{ width: "1000px", maxWidth: maxWidth }}>
        {overlay}
      </Popover>
    );
  };

  if (overlay == null) {
    return null;
  }

  return (
    <OverlayTrigger trigger={"click"} rootClose placement={placement} overlay={getPopover()}>
      <span className={className}>
        <IconBase
          icon={faEllipsisH}
          className={"pointer"}
          iconSize={size}
          onClick={() => document.body.click()}
        />
      </span>
    </OverlayTrigger>
  );
}

EllipsisIcon.propTypes = {
  className: PropTypes.string,
  overlay: PropTypes.any,
  size: PropTypes.string,
  placement: PropTypes.string,
  maxWidth: PropTypes.string,
};

EllipsisIcon.defaultProps = {
  placement: "left",
  maxWidth: "1500px",
};

export default React.memo(EllipsisIcon);