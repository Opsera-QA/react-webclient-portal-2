import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn, getUppercaseTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineActivityLogTable(
  {
    pipelineLogData,
    pipelineActivityMetadata,
    pipeline,
    pipelineActivityFilterDto,
    currentRunNumber,
    currentStepId,
  }) {
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    isMounted.current = true;

    setColumns([]);
    loadColumnMetadata(pipelineActivityMetadata);

    return () => {
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineActivityMetadata)]);

  const onRowSelect = (treeGrid, row) => {
    toastContext.showOverlayPanel(
      <PipelineTaskDetailViewer
        pipelineName={pipeline?.name}
        pipelineActivityLogId={row._id}
      />
    );
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getUppercaseTableTextColumn(fields.find(field => { return field.id === "step_name";})),
          getUppercaseTableTextColumn(fields.find(field => { return field.id === "action";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
  };

  const getFilteredData = () => {
    if (currentRunNumber == null || currentRunNumber === "latest" || currentRunNumber === "secondary" || currentStepId == null) {
      return pipelineLogData;
    }

    return pipelineLogData.filter((item) => {
      return item.step_id === currentStepId;
    });
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  return (
    <TableBase
      columns={columns}
      data={getFilteredData()}
      noDataMessage={getNoDataMessage()}
      onRowSelect={onRowSelect}
    />
  );
}

PipelineActivityLogTable.propTypes = {
  pipelineLogData: PropTypes.array,
  pipelineActivityMetadata: PropTypes.object,
  pipeline: PropTypes.object,
  pipelineActivityFilterDto: PropTypes.object,
  currentRunNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  currentStepId: PropTypes.string,
};

export default PipelineActivityLogTable;