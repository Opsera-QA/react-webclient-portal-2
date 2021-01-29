import React, {useEffect, useState, useContext} from "react";
import {Col} from "react-bootstrap";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import accountsActions from "components/admin/accounts/accounts-actions.js";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import LoadingDialog from "components/common/status_notifications/loading";

function LdapGroupEditorPanel({ldapGroupData, currentUserEmail, orgDomain, setLdapGroupData, handleClose, authorizedActions}) {
  const {getAccessToken} = useContext(AuthContext);
  const [ldapGroupDataDto, setLdapGroupDataDto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setLdapGroupDataDto(ldapGroupData);
    setIsLoading(false)
  };

  const createGroup = async () => {
    return await accountsActions.createGroup(orgDomain, ldapGroupDataDto, currentUserEmail, getAccessToken);
  };

  const updateGroup = async () => {
    return await accountsActions.updateGroup(orgDomain, ldapGroupDataDto, getAccessToken);
  };

  if (isLoading) {
    return (<LoadingDialog />);
  }

  if (!authorizedActions.includes("update_group")) {
    return <WarningDialog warningMessage={"You do not have the required permissions to update this group"} />;
  }

  return (
    <EditorPanelContainer
      createRecord={createGroup}
      updateRecord={updateGroup}
      setRecordDto={setLdapGroupDataDto}
      recordDto={ldapGroupDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={12}>
          <TextInputBase disabled={!ldapGroupDataDto.isNew()} fieldName={"name"} dataObject={ldapGroupDataDto} setDataObject={setLdapGroupDataDto}/>
        </Col>
        <Col lg={12}>
          <TextInputBase fieldName={"groupType"} dataObject={ldapGroupDataDto} setDataObject={setLdapGroupDataDto} disabled={true} />
        </Col>
        <Col lg={12}>
          <TextInputBase
            disabled={ldapGroupDataDto.getData("groupType") !== "project"}
            fieldName={"externalSyncGroup"}
            dataObject={ldapGroupDataDto}
            setDataObject={setLdapGroupDataDto}
          />
        </Col>
        <Col lg={12}>
          <BooleanToggleInput
            disabled={true}
            fieldName={"isSync"}
            dataObject={ldapGroupDataDto}
            setDataObject={setLdapGroupDataDto}
          />
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

LdapGroupEditorPanel.propTypes = {
  currentUserEmail: PropTypes.string,
  orgDomain: PropTypes.string,
  setLdapGroupData: PropTypes.func,
  ldapGroupData: PropTypes.object,
  ldapOrganizationData: PropTypes.object,
  handleClose: PropTypes.func,
  authorizedActions: PropTypes.array
};

export default LdapGroupEditorPanel;


