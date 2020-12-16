// This is where the custom ToolsConfiguration.configuration form will reside for this tool.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import {getFormValidationErrorDialog} from "../../../common/toasts/toasts";
import TestToolConnectionButton from "../../../common/buttons/connection/TestToolConnectionButton";


//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accessKey: "", 
  secretKey: "", // store in vault
  regions: "",
  awsAccountId: "",
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function AWSToolConfiguration( { toolData, toolId, fnSaveChanges, fnSaveToVault }) {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({});
  // TODO: Remove when wiring up DTO fields
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (typeof(toolData) !== "undefined") {
      let { configuration } = toolData;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
        setIsNew(false);
      }      
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [toolData]);


  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let newConfiguration = formData;
      
      if (typeof(newConfiguration.secretKey) === "string") {
        newConfiguration.secretKey = await saveToVault(toolId, toolData.tool_identifier, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
      }
      if (typeof(newConfiguration.accessKey) === "string") {
        newConfiguration.accessKey = await saveToVault(toolId, toolData.tool_identifier, "accessKey", "Vault Secured Key", newConfiguration.accessKey);
      }
      if (typeof(newConfiguration.awsAccountId) === "string") {
        newConfiguration.awsAccountId = await saveToVault(toolId, toolData.tool_identifier, "awsAccountId", "Vault Secured Key", newConfiguration.awsAccountId);
      }

      const item = {
        configuration: newConfiguration
      };
      console.log("item: ", item);
      await fnSaveChanges(item); 
      setIsSaving(false);
    }
  };

  const saveToVault = async (toolId, toolIdentifier, key, name, value) => {
    //const keyName = `${pipelineId}-${stepId}-${key}`;  //old keyname with pipelineID
    const keyName = `${toolId}-${toolIdentifier}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await fnSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, key: {} };
      });
      return "";
    }
  };

  const validateRequiredFields = () => {
    let {  accessKey, secretKey, regions, awsAccountId } = formData;
    if ( accessKey.length === 0 ||
      secretKey.length === 0 ||
      regions.length === 0 ||
      awsAccountId.length === 0 ) {
      let toast = getFormValidationErrorDialog(setShowToast);
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <Row>
        <div className="ml-auto"><TestToolConnectionButton recordData={toolData} toolName={"aws"} disable={isNew}/></div>
      </Row>
      <Form>
        {showToast && toast}


        <Form.Group controlId="accessKey">
          <Form.Label>AWS Access Key ID*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="accessKey">
          <Form.Label>AWS Secret Access Key*</Form.Label>
          <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value.trim() })} />
          <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text>
        </Form.Group>

        <Form.Group controlId="awsRegion">
          <Form.Label>AWS Region*</Form.Label>
          <Form.Control maxLength="150" type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value.trim() })} />
        </Form.Group>

        <Form.Group controlId="awsAccountId">
          <Form.Label>AWS Account ID*</Form.Label>
          <Form.Control maxLength="150" type="password" placeholder="" value={formData.awsAccountId || ""} onChange={e => setFormData({ ...formData, awsAccountId: e.target.value.trim() })} />
        </Form.Group>

        {/*TODO: Replace with SaveButton once converted to using data model*/}
        <Row>
          <div className="ml-auto mt-3 px-3">
            <div className="d-flex">
              {isSaving &&
              <div className="text-center mr-3 mt-1"><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>Saving is in progress</div>}
              <Button size="sm" variant="primary" disabled={isSaving} onClick={() => callbackFunction()}><FontAwesomeIcon
                icon={faSave} fixedWidth className="mr-2"/>Save</Button>
            </div>
          </div>
        </Row>

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </div>
  );
}

AWSToolConfiguration.propTypes = {
  toolData: PropTypes.object,
  toolId:  PropTypes.string,
  fnSaveChanges: PropTypes.func,
  fnSaveToVault: PropTypes.func
};

export default AWSToolConfiguration;