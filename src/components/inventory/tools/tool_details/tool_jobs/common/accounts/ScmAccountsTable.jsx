import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";

function ScmAccountsTable({ data, selectedRow, isLoading }) {

  const initialState = {
    pageIndex: 0,
    sortBy: [
      {
        id: "name",
        desc: false
      }
    ]
  };

  const columns = useMemo(
    () => [
      {
        Header: "Reviewer Name",
        accessor: "reviewerName",
      },
      {
        Header: "Repository",
        accessor: "repository",
      },
      // },
      // {
      //   Header: "Type",
      //   accessor: "type",
      // },
      // {
      //   Header: "Password/Token",
      //   accessor: "token"
      // }        
    ],
    []
  );

  return (
    <>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          initialState={initialState}
          onRowSelect={selectedRow}
          isLoading={isLoading}
        >
        </CustomTable>
      </div>
    </>
  );
}

ScmAccountsTable.propTypes = {
  data: PropTypes.array,
  rowInfo: PropTypes.func,
  selectedRow: PropTypes.func,
  isLoading: PropTypes.bool
};

export default ScmAccountsTable;