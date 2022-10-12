import React, { useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory, useParams } from "react-router-dom";
import {
  getCustomTablePipelineStateColumnDefinition,
  getFormattedLabelWithFunctionColumnDefinition,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import FilterContainer, {
} from "components/common/table/FilterContainer";
import { faClipboardUser, faUsers } from "@fortawesome/pro-light-svg-icons";
import { workspaceHelper } from "components/workspace/workspace.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";
import {
  freeTrialUserActivityReportMetadata
} from "components/settings/trial/activity_report/freeTrialUserActivityReport.metadata";
import { workspaceConstants } from "components/workspace/workspace.constants";
import FreeTrialUserActivityReportInlinePlatformSsoUserFilterSelectInput
  from "components/settings/trial/activity_report/workflows/FreeTrialUserActivityReportInlinePlatformSsoUserFilterSelectInput";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function FreeTrialUserActivityReportWorkflowsTable(
  {
    activityReportWorkflows,
    activityReportFilterModel,
    setActivityReportFilterModel,
    userData,
    loadData,
    isLoading,
  }) {
  const { userId } = useParams();
  const fields = freeTrialUserActivityReportMetadata.fields;
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "_id")),
      getFormattedLabelWithFunctionColumnDefinition(
        getField(fields, "workspaceType"),
        workspaceConstants.getLabelForWorkspaceType,
      ),
      getTableTextColumn(getField(fields, "run_count")),
      getTableDateTimeColumn(getField(fields, "firstRunDate")),
      getTableDateTimeColumn(getField(fields, "lastRunDate")),
      getCustomTablePipelineStateColumnDefinition(getField(fields, "lastRunStatus")),
      getTableDateTimeColumn(getField(fields, "createdAt")),
    ],
    [fields]
  );

  const onRowSelect = (row) => {
    const detailViewLink = workspaceHelper.getWorkspaceItemDetailLink(row?.original);

    if (hasStringValue(detailViewLink) === true) {
      history.push(detailViewLink);
    }
  };

  const getInlineFilters = () => {
    if (isMongoDbId(userId) !== true) {
      return (
        <div className={"d-flex"}>
          <FreeTrialUserActivityReportInlinePlatformSsoUserFilterSelectInput
            filterModel={activityReportFilterModel}
            fieldName={"userId"}
            loadDataFunction={loadData}
            className={"mr-2"}
            disabled={isLoading}
          />
        </div>
      );
    }
  };

  const getTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        isLoading={isLoading}
        data={activityReportWorkflows}
        columns={columns}
        loadData={loadData}
      />
    );
  };

  const getTableTitle = () => {
    const user = DataParsingHelper.parseObject(userData);

    if (user) {
      return `${userData?.firstName} ${userData?.lastName} (${userData?.email}) Free Trial User Workflows`;
    }

    return "Free Trial User Workflows";
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      inlineFilters={getInlineFilters()}
      filterDto={activityReportFilterModel}
      setFilterDto={setActivityReportFilterModel}
      body={getTable()}
      titleIcon={faClipboardUser}
      title={getTableTitle()}
      className={"px-2 pb-2"}
    />
  );
}

FreeTrialUserActivityReportWorkflowsTable.propTypes = {
  activityReportWorkflows: PropTypes.array,
  activityReportFilterModel: PropTypes.object,
  setActivityReportFilterModel: PropTypes.func,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  userData: PropTypes.object,
};
