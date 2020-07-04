import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "components/inventory/tools/tools.css";

function ToolLogs(props) {
  const { toolId, toolData, accessToken } = props;
  

  return (
    <>
      <div className="text-center p-5 text-muted mt-5">Tool based jobs activity log data coming soon</div>
    </>
  );
}

ToolLogs.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string
};


export default ToolLogs;
