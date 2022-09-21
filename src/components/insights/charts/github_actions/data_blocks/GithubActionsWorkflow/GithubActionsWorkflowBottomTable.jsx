import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import {
  faDraftingCompass,
  faExternalLink,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import { useHistory } from "react-router-dom";
import { githubActionsWorkflowMetadata } from "./githubActionsWorkflow.metadata";
import GithubActionsWorkflowActionableInsight1 from "./GithubActionsWorkflowActionableInsights/GithubActionsWorkflowActionableInsight1";
import { getStaticIconColumn } from "../../../../../common/table/table-column-helpers";
import ExportGithubActionsWorkflowReportPanel from "./export/ExportGithubActionsWorkflowReportPanel";
import ExportGithubActionsWorkflowReportButton from "./export/ExportGithubActionWorkflowReportButton";

// TODO: Convert to cards
function GithubActionsBottomTable({
  data,
  isLoading,
  loadData,
  filterModel,
  setFilterModel,
  kpiConfiguration,
  dashboardData,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const fields = githubActionsWorkflowMetadata.fields;
  const tableTitle = "Github Actions Workflow Summary";
  const noDataMessage = "No data available";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "runs")),
      getTableTextColumn(getField(fields, "repos")),
      getTableTextColumn(getField(fields, "success")),
      getTableTextColumn(getField(fields, "failures")),
      getTableTextColumn(getField(fields, "successPercentage")),
      getTableTextColumn(getField(fields, "failedPercentage")),
      getTableTextColumn(getField(fields, "successTime")),
      getTableTextColumn(getField(fields, "failedTime")),
      getStaticIconColumn(faExternalLink),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    toastContext.showInfoOverlayPanel(
      <GithubActionsWorkflowActionableInsight1
        workflowName={rowData.original._id}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />,
    );
  };

  const getTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportGithubActionsWorkflowReportPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          githubActionData={data}
        />
      );
    }

    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={data}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      title={tableTitle}
      titleIcon={faDraftingCompass}
      body={getTable()}
      className={"px-2 pb-2"}
      loadData={loadData}
      setFilterDto={setFilterModel}
      filterDto={filterModel}
      exportButton={
        <ExportGithubActionsWorkflowReportButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

GithubActionsBottomTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GithubActionsBottomTable;
