import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { faClipboardList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import ExportPipelineActivityLogButton from "components/common/buttons/export/pipelines/ExportPipelineActivityLogButton";
import TreeAndTableBase from "components/common/table/TreeAndTableBase";
import PipelineActivityLogTree
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTree";
import PipelineStatusFilter from "components/common/filters/pipelines/status/PipelineStatusFilter";
import InlinePipelineStatusFilter from "components/common/filters/pipelines/status/InlinePipelineStatusFilter";
import PipelineActivityLogTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTable";
import PipelineFilterModel from "components/workflow/pipelines/pipeline.filter.model";
import axios from "axios";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";
import pipelineActivityHelpers
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

const refreshInterval = 15000;

// TODO: This is an attempt to move the logic into the table. Not going to finish it now, will finish it as separate enhancement
function PipelineActivityLogTreeTable(
  {
    pipeline,
    pipelineStatus,
    getPipeline,
    pipelineId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [pipelineActivityFilterModel, setPipelineActivityFilterModel] = useState(new PipelineFilterModel());
  const [pipelineActivityMetadata, setPipelineActivityMetadata] = useState(undefined);
  const [pipelineActivityTreeData, setPipelineActivityTreeData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [latestActivityLogs, setLatestActivityLogs] = useState([]);
  const [secondaryActivityLogs, setSecondaryActivityLogs] = useState([]);
  const [logsIsLoading, setLogsIsLoading] = useState(false);
  const [currentLogTreePage, setCurrentLogTreePage] = useState(0);

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const [refreshTimer, setRefreshTimer] = useState(null);
  let internalRefreshCount = 1;


  useEffect(() => {
    //console.log("Effect  1");
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(pipelineActivityFilterModel, false, cancelTokenSource).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;

      if (refreshTimer) {
        console.log("clearing refresh timer");
        clearTimeout(refreshTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (pipeline) {
      evaluatePipelineStatus(pipeline);
    }
  }, [pipeline]);

  useEffect(() => {
    if (Array.isArray(pipelineActivityTreeData) && pipelineActivityTreeData.length > 0) {
      pullLogData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [currentLogTreePage]);

  const evaluatePipelineStatus = (pipeline) => {
    console.log("evaluating pipeline status function");
    if (!pipeline || Object.entries(pipeline).length === 0) {
      return;
    }

    const pipelineStatus = pipeline?.workflow?.last_step?.status;

    if (!pipelineStatus || pipelineStatus === "stopped") {
      console.log("Pipeline stopped, no need to schedule refresh. Status: ", pipelineStatus);
      return;
    }

    console.log(`Scheduling status check followup for Pipeline: ${pipeline._id}, counter: ${internalRefreshCount}, interval: ${refreshInterval} `);
    const refreshTimer = setTimeout(async function() {
      internalRefreshCount++;
      console.log("running pipeline refresh interval");
      await getPipeline();
      await loadData(pipelineActivityFilterModel, true);
    }, refreshInterval);
    setRefreshTimer(refreshTimer);
  };

  // TODO: Find way to put refresh inside table itself
  const loadData = async (newFilterModel = pipelineActivityFilterModel, silentLoading = false, cancelSource = cancelTokenSource) => {
    console.log("in load data in pipeline activityLogTreeTable");
    if (logsIsLoading) {
      return;
    }

    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }

      // TODO: if search term applies ignore run count and reconstruct tree?
      const treeResponse = await pipelineActivityActions.getPipelineActivityLogTree(getAccessToken, cancelSource, pipelineId, newFilterModel);
      const pipelineTree = pipelineActivityHelpers.constructTree(treeResponse?.data?.data);
      setPipelineActivityTreeData([...pipelineTree]);

      if (!silentLoading) {
        setActivityData([]);
        setSecondaryActivityLogs([]);
        setLatestActivityLogs([]);
      }

      if (Array.isArray(pipelineTree) && pipelineTree.length > 0) {
        await pullLogData(pipelineTree, newFilterModel, cancelSource, silentLoading);
      }
      else {
        newFilterModel?.setData("totalCount", 0);
        newFilterModel?.setData("activeFilters", newFilterModel?.getActiveFilters());
        setPipelineActivityFilterModel({...newFilterModel});
      }

      await getLatestActivityLogs(newFilterModel, cancelSource);
      await getSecondaryActivityLogs(newFilterModel, cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    } finally {
      setLogsIsLoading(false);
    }
  };

  const pullLogData = async (pipelineTree = pipelineActivityTreeData, filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource, silentLoading = false) => {
    try {
      if (!silentLoading) {
        setLogsIsLoading(true);
      }
      await getActivityLogsBasedOnTree(pipelineTree, filterDto, cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      console.log(error.message);
    }
    finally {
      setLogsIsLoading(false);
    }
  };

  const getActivityLogsBasedOnTree = async (pipelineTree = pipelineActivityTreeData, filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    // create run count query based on tree -- tree is 0 index based
    const startIndex = 20 * currentLogTreePage;
    let runCountArray = [];

    for (let i = startIndex; i < startIndex + 20 && i < pipelineTree.length; i++) {
      let runCount = pipelineTree[i].runNumber;

      if (runCount) {
        runCountArray.push(runCount);
      }
    }

    const response = await pipelineActivityActions.getPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, runCountArray, filterDto);
    const pipelineActivityData = response?.data?.data;
    const activityLogCount = response?.data?.count;

    if (Array.isArray(pipelineActivityData)) {
      setActivityData([...pipelineActivityData]);
      setPipelineActivityMetadata(response?.data?.metadata);

      // TODO: Remove pagination.
      const newFilterDto = filterDto;
      newFilterDto.setData("totalCount", activityLogCount);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineActivityFilterModel({...newFilterDto});
    }
  };

  const getLatestActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityActions.getLatestPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setLatestActivityLogs([...pipelineActivityData]);
    }
  };

  const getSecondaryActivityLogs = async (filterDto = pipelineActivityFilterModel, cancelSource = cancelTokenSource,) => {
    const response = await pipelineActivityActions.getSecondaryPipelineActivityLogsV3(getAccessToken, cancelSource, pipelineId, filterDto);
    const pipelineActivityData = response?.data?.data;

    if (Array.isArray(pipelineActivityData)) {
      setSecondaryActivityLogs([...pipelineActivityData]);
    }
  };

  const getNoDataMessage = () => {
    if (pipelineActivityFilterModel?.getActiveFilters()?.length > 0) {
      return ("Could not find any results with the given filters.");
    }

    return ("Pipeline activity data has not been generated yet. Once this pipeline begins running, it will publish details here.");
  };

  const getTable = () => {
    return (
      <PipelineActivityLogTable
        isLoading={logsIsLoading}
        pipeline={pipeline}
        pipelineActivityMetadata={pipelineActivityMetadata}
        pipelineLogData={activityData}
        pipelineActivityFilterDto={pipelineActivityFilterModel}
        latestActivityLogs={latestActivityLogs}
        secondaryActivityLogs={secondaryActivityLogs}
      />
    );
  };

  const getTree = () => {
    return (
      <PipelineActivityLogTree
        pipelineLogTree={pipelineActivityTreeData}
        currentLogTreePage={currentLogTreePage}
        setCurrentLogTreePage={setCurrentLogTreePage}
        pipelineActivityFilterDto={pipelineActivityFilterModel}
        setPipelineActivityFilterDto={setPipelineActivityFilterModel}
      />
    );
  };

  const getPipelineActivityTable = () => {
    return (
      <TreeAndTableBase
        data={activityData}
        isLoading={logsIsLoading}
        noDataMessage={getNoDataMessage()}
        tableComponent={getTable()}
        loadData={loadData}
        treeComponent={getTree()}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineStatusFilter
        loadData={loadData}
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
        className={"mr-2"}
      />
    );
  };

  const getDropdownFilters = () => {
    return (
      <PipelineStatusFilter
        filterModel={pipelineActivityFilterModel}
        setFilterModel={setPipelineActivityFilterModel}
      />
    );
  };

  return (
    <div className={"mr-2"}>
      <FilterContainer
        showBorder={false}
        loadData={loadData}
        filterDto={pipelineActivityFilterModel}
        setFilterDto={setPipelineActivityFilterModel}
        isLoading={logsIsLoading}
        title={"Pipeline Logs"}
        inlineFilters={getInlineFilters()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faClipboardList}
        body={getPipelineActivityTable()}
        supportSearch={true}
        exportButton={
          <ExportPipelineActivityLogButton
            className={"ml-2"}
            isLoading={logsIsLoading}
            activityLogData={activityData}
          />
        }
      />
    </div>
  );
}

PipelineActivityLogTreeTable.propTypes = {
  pipeline: PropTypes.object,
  getPipeline: PropTypes.func,
  pipelineId: PropTypes.string,
  pipelineStatus: PropTypes.string,
};

export default PipelineActivityLogTreeTable;