import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner, faTimes} from "@fortawesome/pro-light-svg-icons";

function OverlayTitleBar({ titleText, titleIcon, isLoading, handleClose }) {
  const getTitleIcon = () => {
    if (titleIcon) {
      return (
        <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>
      );
    }
  };

  if (titleText == null) {
    return (
      <div className="pointer float-right" onClick={() => { handleClose();}}>
        <FontAwesomeIcon icon={faTimes} fixedWidth/>
      </div>
    );
  }

  if (isLoading) {
    return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
  }

  return (
    <div className="d-flex justify-content-between">
      <div><span>{getTitleIcon()}{titleText}</span></div>
      <div className="pointer" onClick={() => { handleClose();}}>
        <FontAwesomeIcon icon={faTimes} fixedWidth/>
      </div>
    </div>
  );
}


OverlayTitleBar.propTypes = {
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool
};

export default OverlayTitleBar;