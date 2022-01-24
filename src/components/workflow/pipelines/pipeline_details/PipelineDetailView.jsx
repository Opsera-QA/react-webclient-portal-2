import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "contexts/AuthContext";
import PipelineActivityLogTreeTable
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/PipelineActivityLogTreeTable";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import {useParams} from "react-router-dom";
import PipelineWorkflowView from "./workflow/PipelineWorkflowView";
import PipelineSummaryPanel from "./PipelineSummaryPanel";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import pipelineActions from "components/workflow/pipeline-actions";
import PipelineWorkflowTabBar from "components/workflow/pipelines/pipeline_details/PipelineWorkflowTabBar";

// TODO: This is a work in progress to move the logic for pulling activity logs into the table component
function PipelineDetailView() {
  const { tab, id } = useParams();
  const toastContext = useContext(DialogToastContext);
  const [pipeline, setPipeline] = useState({});
  const [loading, setLoading] = useState(false);
  const [softLoading, setSoftLoading] = useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    //console.log("Effect  1");
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setLoading(true);

      const userRecord = await getUserRecord(); //RBAC Logic
      const rules = await setAccessRoles(userRecord);
      setCustomerAccessRules(rules);

      await getPipeline(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error.message);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

  const getPipeline = async (cancelSource = cancelTokenSource) => {
    console.log("in refresh pipeline");
    const newRefreshCount = refreshCount + 1;
    setRefreshCount(newRefreshCount);

    setSoftLoading(true);
    const response = await pipelineActions.getPipelineByIdV2(getAccessToken, cancelSource, id);
    const newPipeline = response?.data?.data;

    if (newPipeline) {
      setPipeline(newPipeline);
    } else {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog("Pipeline not found");
      }
    }

    if (isMounted?.current === true) {
      setSoftLoading(false);
    }
  };

  const fetchPlan = async (param) => {
    console.log("in fetch plan");
    await getPipeline();
    if (param) {
      setEditItem(param);
    }
  };

  const getCurrentView = () => {
    if (loading) {
      return (
        <LoadingDialog
          size="md"
          message={"Loading pipeline..."}
        />
      );
    }

    if (tab === "model") {
      return (
        <PipelineWorkflowView
          customerAccessRules={customerAccessRules}
          parentWorkflowStatus={workflowStatus}
          pipeline={pipeline}
          setPipeline={setPipeline}
          refreshCount={refreshCount}
          editItem={editItem}
          setEditItem={setEditItem}
          fetchPlan={fetchPlan}
          setWorkflowStatus={setWorkflowStatus}
          // getActivityLogs={getActivityLogs}
          softLoading={softLoading}
        />
      );
    }

    return (
      <div>
        <div
          className="max-content-width-1080 content-block-no-height p-2 mb-2"
          style={{ width: "80vw", border: "1px solid #d2d2d2", borderRadius: "0" }}
        >
          <PipelineSummaryPanel
            pipeline={pipeline}
            setPipeline={setPipeline}
            refreshCount={refreshCount}
            customerAccessRules={customerAccessRules}
            parentWorkflowStatus={workflowStatus}
            ownerName={pipeline?.owner_name}
            setWorkflowStatus={setWorkflowStatus}
            // getActivityLogs={getActivityLogs}
            fetchPlan={fetchPlan}
          />
        </div>
        <div className="max-content-width-1875">
          <PipelineActivityLogTreeTable
            pipeline={pipeline}
            pipelineStatus={pipeline?.workflow?.last_step?.status}
            pipelineId={id}
            getPipeline={getPipeline}
            pipelineRunCount={pipeline?.workflow?.run_count}
          />
        </div>
      </div>
    );
  };

  if (!loading && !pipeline) {
    return (
      <InfoDialog
        message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
      />
    );
  }

  return (
    <div>
      <WorkflowSubNavigationBar currentTab={"pipelineViewer"} />
      <div className="h4 mt-3 mb-2">
        {pipeline?.name}
      </div>
      <PipelineWorkflowTabBar
        currentTab={tab}
        pipelineId={id}
        getPipeline={getPipeline}
        // refreshTimer={refreshTimer}
      />
      {getCurrentView()}
    </div>
  );
}


export default PipelineDetailView;