//PP-95 Deploy Step form for AWS Elastic Beanstalk

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "Single Container Docker", label: "Single Container Docker" },
  { value: "Multicontainer Docker", label: "Multiple Container Docker" },
  { value: "Preconfigured Docker", label: "Pre-configured Docker" },
  { value: "Go", label: "Go" },
  { value: "Java SE", label: "Java SE" },
  { value: "Tomcat", label: "Tomcat" },
  { value: ".NET on Windows Server", label: ".NET on Windows Server" },
  { value: "Node.js", label: "Node.js" },
  { value: "PHP", label: "PHP" },
  { value: "Python", label: "Python" },
  { value: "Ruby", label: "Ruby" }
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  accessKey: "",
  secretKey: "",
  bucketName: "",
  regions: "",
  applicationName: "",
  applicationVersionLabel: "",
  description: "",
  port: "",
  ec2KeyName: "",
  platform: ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function ElasticBeanstalkDeploy( { data, parentCallback }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");

  useEffect(() => {
    if (typeof(data) !== "undefined") {
      let { configuration, threshold } = data;
      if (typeof(configuration) !== "undefined") {
        setFormData(configuration);
      }
      if (typeof(threshold) !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  const callbackFunction = () => {
    if (validateRequiredFields()) {
      const item = {
        configuration: formData,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        }
      };
      parentCallback(item);
    }
  };


  const validateRequiredFields = () => {
    let { accessKey, secretKey, regions, bucketName, port, ec2KeyName } = formData;
    if (
      accessKey.length === 0 || 
      secretKey.length === 0 || 
      regions.length === 0 || 
      port.length === 0 || 
      ec2KeyName.length === 0 || 
      bucketName.length === 0) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };


  
  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      <Form.Group controlId="accessKey">
        <Form.Label>AWS Account Access Key*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="secretKey">
        <Form.Label>AWS Access Secret Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="bucketName">
        <Form.Label>S3 Bucket Name*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.bucketName || ""} onChange={e => setFormData({ ...formData, bucketName: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="regions">
        <Form.Label>Region*</Form.Label>
        <Form.Control maxLength="25" type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value })} />
        <small className="form-text text-muted mt-2 text-left pb-2">Region where S3 bucket resides</small>
      </Form.Group>

      <Form.Group controlId="ec2KeyName">
        <Form.Label>EC2 Key Name*</Form.Label>
        <Form.Control maxLength="10" type="text" placeholder="" value={formData.ec2KeyName || ""} onChange={e => setFormData({ ...formData, ec2KeyName: e.target.value })} />
        <small className="form-text text-muted mt-2 text-left pb-2">Key-pair file name used to access the EC2 instance</small>
      </Form.Group>

      <Form.Group controlId="port">
        <Form.Label>Application Port*</Form.Label>
        <Form.Control maxLength="10" type="text" placeholder="" value={formData.port || ""} onChange={e => setFormData({ ...formData, port: e.target.value })} />
        <Form.Text className="text-muted">className="form-text text-muted mt-2 text-left pb-2">Port the application needs to run</Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Service*</Form.Label>
        {data.workflow.source !== undefined ?
          <DropdownList
            data={PLATFORM_OPTIONS}
            valueField='id'
            textField='label'
            defaultValue={data.workflow.source.service ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value === data.workflow.source.service)] : PLATFORM_OPTIONS[0]}
            onChange={handleServiceChange}             
          /> : null }
      </Form.Group>


      <Form.Group controlId="applicationName">
        <Form.Label>Application Name</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.applicationName || ""} onChange={e => setFormData({ ...formData, applicationName: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="applicationVersionLabel">
        <Form.Label>Application Version</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.applicationVersionLabel || ""} onChange={e => setFormData({ ...formData, applicationVersionLabel: e.target.value })} />
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        <FontAwesomeIcon icon={faSave} className="mr-1"/> Save
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

ElasticBeanstalkDeploy.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func
};

export default ElasticBeanstalkDeploy;
