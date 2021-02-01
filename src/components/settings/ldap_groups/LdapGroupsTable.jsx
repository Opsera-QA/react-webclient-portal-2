import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import NewLdapGroupModal from "components/settings/ldap_groups/NewLdapGroupModal";
import {
  getCountColumnWithoutField,
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldap-groups-metadata";

function LdapGroupsTable({ groupData, orgDomain, isLoading, authorizedActions, loadData, currentUserEmail, useMembers }) {
  let fields = ldapGroupMetaData.fields;
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const history = useHistory();

  const getDynamicColumn = () => {
    if (useMembers) {
      return (getCountColumnWithoutField("Members", "members"));
    }

    return getTableTextColumn(getField(fields, "memberCount"));
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "externalSyncGroup")),
      getTableTextColumn(getField(fields, "groupType")),
      getDynamicColumn(),
      getTableBooleanIconColumn(getField(fields, "isSync"))
    ],
    []
  );

  const createGroup = () => {
    setShowCreateGroupModal(true);
  };
  
  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/groups/details/${rowData.original.name}`);
  };

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        data={groupData}
        columns={columns}
        tableTitle={"Groups"}
        type={"Group"}
        createNewRecord={!useMembers && authorizedActions ? createGroup : undefined}
      />
      <NewLdapGroupModal
        loadData={loadData}
        authorizedActions={authorizedActions}
        orgDomain={orgDomain}
        showModal={showCreateGroupModal}
        currentUserEmail={currentUserEmail}
        setShowModal={setShowCreateGroupModal}
      />
    </div>
  );
}

LdapGroupsTable.propTypes = {
  groupData: PropTypes.array,
  orgDomain: PropTypes.string,
  isLoading: PropTypes.bool,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  currentUserEmail: PropTypes.string,
  useMembers: PropTypes.bool
};

export default LdapGroupsTable;