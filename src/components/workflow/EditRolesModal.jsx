import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import TooltipWrapper from "components/common/tooltip/tooltipWrapper";
import {unsavedChanges} from "components/common/tooltip/popover-text";

// TODO Replace with EditRolesModal in inline_inputs and delete this after wiring up Model wrapped object
function EditRolesModal({visible, pipelineModel, setPipelineModel, onHide, onClick, data}) {
  const [roles, setRoles] = useState(pipelineModel.getData("roles"));

  useEffect(() => {
    let newObjectModel = pipelineModel;
    newObjectModel.setData("roles", data);
    setPipelineModel({...newObjectModel});
  }, []);

  const setDataFunction = (newDataObject) => {
    setRoles(newDataObject.getData("roles"));
    setPipelineModel({...newDataObject});
  };

  return (
    <Modal size={"lg"} show={visible} onHide={() => onHide()} className="tag-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Roles</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-3">
          <RoleAccessInput dataObject={pipelineModel} setDataObject={setDataFunction} fieldName={"roles"} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <TooltipWrapper innerText={unsavedChanges}>
          <Button variant="secondary" onClick={() => onHide()}>Cancel</Button>
        </TooltipWrapper>
        <Button variant="success" onClick={() => onClick(roles)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}


EditRolesModal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  onClick: PropTypes.func,
  pipelineModel: PropTypes.object,
  setPipelineModel: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default EditRolesModal;


