import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";
import ReactJson from "react-json-view";


function ModalActivityLogsDialog({ header, size, jsonData, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState("log");
  const [dataView, setDataView] = useState(jsonData);
  
  useEffect(() => {
    setShowModal(show);
    if (jsonData !== undefined) {
      setViewType(jsonData.action);      
      const new_obj = iterate(jsonData);      
      setDataView(new_obj);
    }    
  }, [jsonData, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility(false);
  };

  const iterate = (obj) => {
    Object.keys(obj).forEach(key => {
      if (key === "configuration") {
        obj[key] = { data: "hidden" };
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        iterate(obj[key]);
      }
    });
    return obj;
  };


  if (viewType === "console output") {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Console Output</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-2">
              <div className="float-right">{format(new Date(jsonData.createdAt), "yyyy-MM-dd', 'hh:mm a")}</div> 
              <span className="upper-case-first">Step: {jsonData.step_name} <br/>Tool: {jsonData.step_configuration ? jsonData.step_configuration.tool_identifier : null }</span></div>
            { typeof(jsonData.api_response) !== "object" ?
              <div className="console-text m-3">
                {jsonData.api_response}
              </div> : <>
                { jsonData.api_response.buildLog !== undefined ?
                  <div className="console-text m-3">
                    {jsonData.api_response.buildLog}
                  </div> : 
                  <ReactJson src={jsonData.api_response} displayDataTypes={false} /> }
              </> }                       
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactJson src={dataView} displayDataTypes={false} />               
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
     
      </>
    ); 
  }
}

  
ModalActivityLogsDialog.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,  
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func
};

export default ModalActivityLogsDialog;