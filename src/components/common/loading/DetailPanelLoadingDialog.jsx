import React from "react";
import PropTypes from "prop-types";
import LoadingIcon from "components/common/icons/LoadingIcon";

function DetailPanelLoadingDialog({ type }) {
  return (
    <div className="p-5 text-lg-center">
      <span className="m-auto"><LoadingIcon className={"mr-2"}/>Loading {type}</span>
    </div>
  );
}

DetailPanelLoadingDialog.propTypes = {
  type: PropTypes.string
};

DetailPanelLoadingDialog.defaultProps = {
  type: "data",
};

export default DetailPanelLoadingDialog;