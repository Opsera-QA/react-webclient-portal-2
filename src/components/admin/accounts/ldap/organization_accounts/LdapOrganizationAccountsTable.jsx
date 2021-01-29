import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router-dom";
import {ldapOrganizationAccountMetaData} from "components/admin/accounts/ldap/organization_accounts/ldap-organization-account-form-fields";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import CustomTable from "components/common/table/CustomTable";
import NewLdapOrganizationAccountModal
  from "components/admin/accounts/ldap/organization_accounts/NewLdapOrganizationAccountModal";

function LdapOrganizationAccountsTable({ldapOrganizationAccounts, ldapOrganizationData, authorizedActions, isLoading, loadData }) {
  const [showCreateOrganizationAccountModal, setShowCreateOrganizationAccountModal] = useState(false);
  let fields = ldapOrganizationAccountMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwner"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgOwnerEmail"})),
      getTableTextColumn(fields.find(field => { return field.id === "accountName"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableTextColumn(fields.find(field => { return field.id === "orgDomain"})),
    ],
    []
  );

  const onRowSelect = (selectedRow) => {
    history.push(`/admin/organization-accounts/${selectedRow.original.orgDomain}/details/`);
  };

  const createOrganizationAccount = () => {
    setShowCreateOrganizationAccountModal(true);
  };

  return (
    <div>
      <CustomTable
        columns={columns}
        isLoading={isLoading}
        data={ldapOrganizationAccounts}
        createNewRecord={authorizedActions?.includes("create_organization_account") && createOrganizationAccount}
        onRowSelect={onRowSelect}
        type={"Organization Account"}
        tableTitle={"Organization Accounts"}
      />
      <NewLdapOrganizationAccountModal
        ldapOrganizationData={ldapOrganizationData}
        authorizedActions={authorizedActions}
        showModal={showCreateOrganizationAccountModal}
        loadData={loadData}
        setShowModal={setShowCreateOrganizationAccountModal}
      />
    </div>
  );
}

LdapOrganizationAccountsTable.propTypes = {
  ldapOrganizationAccounts: PropTypes.array,
  ldapOrganizationData: PropTypes.object,
  authorizedActions: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapOrganizationAccountsTable;
