import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { useParams } from "react-router-dom";


import JenkinsConfiguration from "../forms/jenkins";
import GitHubConfiguration from "../forms/github";

import "components/inventory/tools/tools.css";
import GitlabToolConfiguration from "../forms/gitlab";
import BitbucketToolConfiguration from "../forms/bitbucket";
import SpinnakerToolConfiguration from "../forms/spinnaker";
import CypressToolConfiguration from "../forms/cypress";
import ArgoToolConfiguration from "../forms/argo";
import AnchoreToolConfiguration from "../forms/anchore";


function ToolConfiguration(props) {
  const { toolId, toolData, fnSaveChanges, fnSaveToVault } = props;

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
        <div className="tool-content-block p-3">
          {toolData.tool_identifier.toLowerCase() === "jenkins" ? <JenkinsConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "github" ? <GitHubConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "gitlab" ? <GitlabToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "bitbucket" ? <BitbucketToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "spinnaker" ? <SpinnakerToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "cypress" ? <CypressToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "argo" ? <ArgoToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          {toolData.tool_identifier.toLowerCase() === "anchore-scan" ? <AnchoreToolConfiguration toolId={toolId} toolData={toolData} fnSaveChanges={saveToolConfiguration} fnSaveToVault={fnSaveToVault} /> : null }
          
        </div>
        : null}

    </div>
  );
}

ToolConfiguration.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};


export default ToolConfiguration;
