import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CustomModalDialog({ header, message, button, handleHideModal }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: true }
  );

  useEffect(() => {
    setState({ show: true });
  }, []);

  const handleClose = () => {
    setState({ show: false });
  };
  
  const handleConfirm = () => {
    setState({ show: false });
    handleHideModal();
  };

  return (
    <>
      <Modal show={state.show}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            <FontAwesomeIcon icon={faCheck} fixedWidth /> 
            {button ? button : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CustomModalDialog.propTypes = {
  header: PropTypes.string,
  message: PropTypes.string,
  button: PropTypes.string,
  handleHideModal: PropTypes.func.isRequired
};

export default CustomModalDialog;