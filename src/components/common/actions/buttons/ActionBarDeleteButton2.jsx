import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import DeleteModal from "components/common/modal/DeleteModal";

// TODO: This will supersede the other delete button
function ActionBarDeleteButton2({handleDelete, relocationPath, visible, dataObject, className}) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteObject = async () => {
    try {
      let result = await handleDelete();

      if (result) {
        if (result?.error == null) {
          toastContext.showDeleteSuccessResultDialog(dataObject.getType());
          setShowDeleteModal(false);

          if (relocationPath) {
            history.push(relocationPath);
          }
        }
        else
        {
          toastContext.showDeleteFailureResultDialog(dataObject.getType(), result.error);
        }
      }
    }
    catch (error) {
      toastContext.showDeleteFailureResultDialog(dataObject.getType());
    }
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(true);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className={className}>
      <ActionBarButton action={toggleDeleteModal} icon={faTrash} iconClasses={"danger-red"} popoverText={`Delete this ${dataObject.getType()}`} />
      <DeleteModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} dataObject={dataObject} handleDelete={deleteObject} />
    </div>
  );
}

ActionBarDeleteButton2.propTypes = {
  handleDelete: PropTypes.func,
  relocationPath: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool
};

ActionBarDeleteButton2.defaultProps = {
  visible: true
};

export default ActionBarDeleteButton2;