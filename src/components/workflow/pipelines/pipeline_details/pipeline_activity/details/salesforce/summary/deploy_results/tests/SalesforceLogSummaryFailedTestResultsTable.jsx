import React, {useMemo} from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import salesforceSummaryLogUnitTestResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogUnitTestResult.metadata";
import {
  getColumnHeader, getColumnId,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import {getField} from "components/common/metadata/metadata-helpers";
import VanityTable from "components/common/table/VanityTable";
import {millisToMinutesAndSeconds} from "utils/helpers";

export const getTimeColumnDefinition = (field, maxLength, className) => {
  return {
    header: getColumnHeader(field),
    id: getColumnId(field),
    sortable: false,
    class: className ? className : undefined,
    tooltipTemplate: function (value, row) {
      const time = `${millisToMinutesAndSeconds(row?.time)}`;
      return `<div class="custom-tooltip"><span>${time}</span></div>`;
    },
    template: (text, row) => {
      return millisToMinutesAndSeconds(row?.time);
    },
  };
};

function SalesforceLogSummaryFailedTestResultsTable({ hasSuccessAndFailureTests, testResults, title, icon,  }) {
  const fields = salesforceSummaryLogUnitTestResultMetadata?.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "methodName")),
      getTimeColumnDefinition(getField(fields, "time")),
      getTableTextColumn(getField(fields, "message")),
      getTableTextColumn(getField(fields, "stackTrace")),
      getTableTextColumn(getField(fields, "outcome")),
    ],
    []
  );

  const getTestResultsTable = () => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const bodySize = vh - 264;
    const halfTableSize = (bodySize * .5)  - 120;
    const tableSize =  bodySize  - 120;

    return (
      <VanityTable
        data={testResults}
        columns={columns}
        tableHeight={hasSuccessAndFailureTests === true ? `${halfTableSize}px` : `${tableSize}px`}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      body={getTestResultsTable()}
      titleIcon={icon}
      title={title}
      className={"mt-3"}
    />
  );
}

SalesforceLogSummaryFailedTestResultsTable.propTypes = {
  testResults: PropTypes.array,
  hasSuccessAndFailureTests: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.object,
};

export default SalesforceLogSummaryFailedTestResultsTable;