import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import ldapDepartmentMetaData from "./ldap-department-metadata";
import {getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {getField} from "../../../../common/metadata/metadata-helpers";
import NewLdapDepartmentModal from "./NewLdapDepartmentModal";
import FilterBar from "../../../../common/filters/FilterBar";

function LdapDepartmentsTable({ departmentData, departmentFilterDto, authorizedActions, setDepartmentFilterDto, domain, loadData, isLoading }) {
  const [showCreateDepartmentModal, setShowCreateDepartmentModal] = useState(false);
  const fields = ldapDepartmentMetaData.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "ownerEmail")),
      getTableTextColumn(getField(fields, "departmentGroupName")),
    ],
    [fields]
  );

  const onRowSelect = (rowData, type) => {
    history.push(`/admin/${domain}/departments/details/${rowData.original.name}`);
  };

  const createNewDepartment = () => {
    setShowCreateDepartmentModal(true);
  }


  const getFilterBar = () => {
    if (departmentFilterDto == null) {
      return null;
    }

    return(
      <FilterBar
        loadData={loadData}
        filterDto={departmentFilterDto}
        setFilterDto={setDepartmentFilterDto}
        // activeFilterDto={activeDepartmentFilterDto}
        // filters={["status", "toolIdentifier", "tag", "search"]}
        addRecordFunction={createNewDepartment}
      >
      </FilterBar>
    );
  };


  return (
    <div>
      <CustomTable onRowSelect={onRowSelect}
                   data={departmentData}
                   columns={columns}
                   isLoading={isLoading}
                   tableTitle={"Departments"}
                   loadData={loadData}
                   tableFilterBar={getFilterBar()}
      />
      <NewLdapDepartmentModal
        showModal={showCreateDepartmentModal}
        loadData={loadData}
        setShowModal={setShowCreateDepartmentModal}
        authorizedActions={authorizedActions}
        orgDomain={domain}
      />
    </div>
  );
}

LdapDepartmentsTable.propTypes = {
  departmentData: PropTypes.array,
  authorizedActions: PropTypes.array,
  departmentFilterDto: PropTypes.object,
  setDepartmentFilterDto: PropTypes.func,
  domain: PropTypes.string,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default LdapDepartmentsTable;