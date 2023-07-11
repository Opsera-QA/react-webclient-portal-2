import React, { useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import GitlabMergeRequestActionableMetadata from "./GitlabOpenMergeActionableMetadata";
import { getTableDateTimeColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";

function GitlabOpenMergeActionableRepoTable({ data, isLoading, loadData, filterModel, setFilterModel, priority, tableTitleIcon, count, range }) {
  const fields = GitlabMergeRequestActionableMetadata.fields;
  const tableTitle = "Repos Report";
  const noDataMessage = "No report found";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "repoName"), "repoName"),
      getTableTextColumn(getField(fields, "totalMR"), "totalMR"),
      getTableTextColumn(getField(fields, "users"), "users"),
      getTableTextColumn(getField(fields, "avgTimeToMerge"), "avgTimeToMerge"),
      getTableTextColumn(getField(fields, "branches"), "branches"),
    ],
    []
  );

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div>
      <FilterContainer
        isLoading={isLoading}
        title={tableTitle}
        titleIcon={tableTitleIcon}
        body={getTable()}
        className={"px-2 pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
      />
    </div>
  );
}

GitlabOpenMergeActionableRepoTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  priority: PropTypes.number,
  tableTitleIcon: PropTypes.object,
  count: PropTypes.number,
  range: PropTypes.string,
};

export default GitlabOpenMergeActionableRepoTable;