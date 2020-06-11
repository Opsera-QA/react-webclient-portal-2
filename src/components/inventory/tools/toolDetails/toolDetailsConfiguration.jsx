import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";


import JenkinsConfiguration from "../forms/jenkins";

import "components/inventory/tools/tools.css";


function ToolConfiguration(props) {
  const { toolId, toolData, fnSaveChanges } = props;

  const saveToolConfiguration = (item) => {
    console.log("saving configuration item: ", item);
    toolData.configuration = item.configuration;
    console.log("new toolData: ", toolData);
    
    fnSaveChanges(toolData);

  };
  

  return (
    <div className="mt-4 p-2">
      <div className="text-muted pb-3">Enter tool specific configuration information below.  These settings will be used in pipelines</div>
      { typeof(toolId) !== "undefined" ? 
        <>
          {toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinsConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} /> : null }
          

        </> : null}

    </div>
  );
}

ToolConfiguration.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func
};


export default ToolConfiguration;
