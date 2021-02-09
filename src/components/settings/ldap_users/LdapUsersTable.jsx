import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import {ldapUsersMetaData} from "./ldap-users-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import NewLdapUserModal from "components/settings/ldap_users/NewLdapUserModal";

function LdapUsersTable({ userData, orgDomain, isLoading, authorizedActions, loadData }) {
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const fields = ldapUsersMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "preferredName"})),
      getTableTextColumn(fields.find(field => { return field.id === "firstName"})),
      getTableTextColumn(fields.find(field => { return field.id === "lastName"})),
      getTableTextColumn(fields.find(field => { return field.id === "emailAddress"})),
      getTableTextColumn(fields.find(field => { return field.id === "title"})),
      getTableTextColumn(fields.find(field => { return field.id === "departmentName"})),
      getTableTextColumn(fields.find(field => { return field.id === "division"})),
      getTableTextColumn(fields.find(field => { return field.id === "region"})),
    ],
    [fields]
  );

  const onRowSelect = (rowData, type) => {
    history.push(`/settings/${orgDomain}/users/details/${rowData.original.emailAddress}`);
  };

  const createUser = () => {
    setShowCreateUserModal(true);
  };

  return (
    <div className="px-2 pb-2">
      <CustomTable
        isLoading={isLoading}
        tableTitle={"Users"}
        onRowSelect={onRowSelect}
        data={userData}
        type={"User"}
        columns={columns}
        createNewRecord={authorizedActions?.includes("create_user") && createUser}
      />
      <NewLdapUserModal
        authorizedActions={authorizedActions}
        showModal={showCreateUserModal}
        setShowModal={setShowCreateUserModal}
        loadData={loadData}
        orgDomain={orgDomain}
      />
    </div>
  );
}

LdapUsersTable.propTypes = {
  userData: PropTypes.array,
  orgDomain: PropTypes.string,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapUsersTable;