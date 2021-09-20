import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {
  getPipelineActivityStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import PipelineTaskDetailViewer from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineTaskDetailViewer";
import TableBase from "components/common/table/TableBase";
import {DialogToastContext} from "contexts/DialogToastContext";

function PipelineActivityLogTable({ pipelineLogData, pipelineActivityMetadata, isLoading, pipeline, pipelineActivityFilterDto, currentRunNumber, currentStepName }) {
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
    toastContext.showOverlayPanel(<PipelineTaskDetailViewer pipelineName={pipeline?.name} pipelineActivityLogId={row._id} />);
  };

  const loadColumnMetadata = (newActivityMetadata) => {
    if (newActivityMetadata?.fields) {
      const fields = newActivityMetadata.fields;

      setColumns(
        [
          {...getTableTextColumn(fields.find(field => { return field.id === "run_count";}), "cell-center no-wrap-inline", 100,)},
          getTableTextColumn(fields.find(field => { return field.id === "step_name";})),
          getTableTextColumn(fields.find(field => { return field.id === "action";})),
          getTableTextColumn(fields.find(field => { return field.id === "message";})),
          getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
          getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";}))
        ]
      );
    }
  };

  const getFilteredData = () => {
    if (currentRunNumber == null) {
      return pipelineLogData;
    }

    if (currentRunNumber === "other_logs_query") {
      return pipelineLogData.filter((item) => {
        return item.run_count == null;
      });
    }

    return pipelineLogData.filter((item) => {
      return item.run_count === currentRunNumber && (currentStepName == null || item.step_name === currentStepName);
    });
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterDto?.getData("search") !== "") {
      return ("Could not find any results with the given keywords.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  return (
    <div className={"tree-table"}>
      <TableBase
        columns={columns}
        data={getFilteredData()}
        isLoading={isLoading}
        noDataMessage={getNoDataMessage()}
        onRowSelect={onRowSelect}
      />
    </div>
  );
}

PipelineActivityLogTable.propTypes = {
  pipelineLogData: PropTypes.array,
  pipelineActivityMetadata: PropTypes.object,
  isLoading: PropTypes.bool,
  pipeline: PropTypes.object,
  pipelineActivityFilterDto: PropTypes.object,
  currentRunNumber: PropTypes.number,
  currentStepName: PropTypes.number
};

export default PipelineActivityLogTable;