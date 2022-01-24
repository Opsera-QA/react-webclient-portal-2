import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TreeBase from "components/common/tree/TreeBase";
import VanityBottomPaginatorBase from "components/common/pagination/VanityBottomPaginatorBase";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";

function PipelineActivityLogTree(
  {
    pipelineLogTree,
    currentLogTreePage,
    setCurrentLogTreePage,
    pipelineActivityFilterDto,
    setPipelineActivityFilterDto,
    getSingleRunLogs,
  }) {
  const [treeWidget, setTreeWidget] = useState(undefined);
  const [secondaryTreeWidget, setSecondaryTreeWidget] = useState(undefined);
  const [secondaryLogTree] = useState(pipelineActivityHelpers.getSecondaryTree());
  const isMounted = useRef(false);
  const [selectedId, setSelectedId] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    if (Array.isArray(pipelineLogTree) && pipelineLogTree.length > 0) {
      const treeItem = pipelineLogTree[0];

      const currentRunNumber = pipelineActivityFilterDto?.getData("currentRunNumber");

      if (currentRunNumber !== "latest" && currentRunNumber !== "secondary" && typeof currentRunNumber !== "number") {
        setSelectedId(treeItem.id);
      }
    }

    return () => {
      isMounted.current = false;
    };
  }, [pipelineLogTree]);

  const onMainTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (secondaryTreeWidget) {
      secondaryTreeWidget?.selection?.remove();
    }

    if (treeItem) {
      const currentRunNumber = pipelineActivityFilterDto?.getData("currentRunNumber");
      pipelineActivityFilterDto?.setData("currentRunNumber", treeItem?.runNumber);
      pipelineActivityFilterDto?.setData("currentStepName", treeItem?.stepName);

      if (currentRunNumber !== treeItem?.runNumber) {
        getSingleRunLogs(pipelineActivityFilterDto);
      }
      else {
        setPipelineActivityFilterDto({...pipelineActivityFilterDto});
      }
    }
  };

  const onSecondaryTreeItemClick = (treeItem) => {
    setSelectedId(treeItem?.id);
    if (treeWidget) {
      treeWidget?.selection?.remove();
    }

    if (treeItem) {
      const currentRunNumber = pipelineActivityFilterDto?.getData("currentRunNumber");
      pipelineActivityFilterDto?.setData("currentRunNumber", treeItem?.runNumber);
      pipelineActivityFilterDto?.setData("currentStepName", treeItem?.stepName);
      setPipelineActivityFilterDto({...pipelineActivityFilterDto});

      if (currentRunNumber !== treeItem?.runNumber) {
        getSingleRunLogs(pipelineActivityFilterDto);
      }
      else {
        setPipelineActivityFilterDto({...pipelineActivityFilterDto});
      }
    }
  };

  const onPageChange = (newPage) => {
    if (currentLogTreePage !== newPage) {
      const currentRunNumber = pipelineActivityFilterDto?.getData("currentRunNumber");

      if (currentRunNumber !== "latest" && currentRunNumber !== "secondary") {
        pipelineActivityFilterDto?.setData("currentRunNumber", undefined);
        pipelineActivityFilterDto?.setData("currentStepName", undefined);
        setPipelineActivityFilterDto({...pipelineActivityFilterDto});

        if (treeWidget) {
          treeWidget.selection.remove();
        }
      }

      setCurrentLogTreePage(newPage);
    }
  };


  if (pipelineLogTree == null) {
    return null;
  }

  return (
    <div className={"table-tree mb-3"}>
      <div className={"scroll-y hide-x-overflow table-tree-with-paginator-and-secondary-tree p-2"}>
        <TreeBase
          data={pipelineLogTree}
          onItemClick={onMainTreeItemClick}
          setParentWidget={setTreeWidget}
          selectedId={selectedId}
        />
      </div>
      <div className={"secondary-table-tree p-2"}>
        <TreeBase
          data={secondaryLogTree}
          onItemClick={onSecondaryTreeItemClick}
          setParentWidget={setSecondaryTreeWidget}
          treeId={"secondary-table-tree"}
          selectedId={selectedId}
        />
      </div>
      <div>
        <VanityBottomPaginatorBase widgetData={treeWidget?.data} pageSize={20} onPageChange={onPageChange}/>
      </div>
    </div>
  );
}

PipelineActivityLogTree.propTypes = {
  pipelineLogTree: PropTypes.array,
  currentLogTreePage: PropTypes.number,
  setCurrentLogTreePage: PropTypes.func,
  pipelineActivityFilterDto: PropTypes.object,
  setPipelineActivityFilterDto: PropTypes.func,
  getSingleRunLogs: PropTypes.func,
};

export default PipelineActivityLogTree;