import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit, faUserTimes, faPeopleArrows} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PopoverContainer from "components/common/tooltip/PopoverContainer";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import toolsActions from "components/inventory/tools/tools-actions";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import CancelButton from "components/common/buttons/CancelButton";
import Model from "core/data_model/model";

function ActionBarTransferToolButton({ toolData, loadTool }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolCopy, setToolCopy] = useState(new Model({...toolData.data}, toolData.getMetaData(), false));
  const [transferringOwner, setTransferringOwner] = useState(false);

  const changeToolOwner = async () => {
    try {
      setTransferringOwner(true);
      await toolsActions.updateTool(toolCopy, getAccessToken);
      toastContext.showUpdateSuccessResultDialog("Tool Owner");
      await loadTool();
      document.body.click();
    }
    catch (error) {
      toastContext.showUpdateFailureResultDialog("Tool Owner", error);
    }
    finally {
      setTransferringOwner(false);
    }
  }

  const popoverContent = (
      <div>
        <div className="pb-2">
          <LdapUserSelectInput fieldName={"owner"} dataObject={toolCopy} setDataObject={setToolCopy} />
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" disabled={transferringOwner} onClick={() => changeToolOwner()}
                    className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faUserEdit} fixedWidth className="mr-2"/>Transfer</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <CancelButton size={"sm"} className={"w-100"} cancelFunction={() => document.body.click()} />
          </div>
        </div>
      </div>
    );

  return (
    <PopoverContainer
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Tool"}
      content={popoverContent}>
      <div className="mx-2">
        <ActionBarPopoverButton disabled={isLoading} icon={faPeopleArrows} popoverText={`Transfer tool to new Owner`} />
      </div>
    </PopoverContainer>
  );
}

ActionBarTransferToolButton.propTypes = {
  toolData: PropTypes.object,
  loadTool: PropTypes.func
};

export default ActionBarTransferToolButton;