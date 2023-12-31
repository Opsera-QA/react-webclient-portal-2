import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import PipelineTaskSummaryPanelBase from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskSummaryPanelBase";
import Model from "core/data_model/model";
import pipelineTaskMetadata from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/pipeline-task-metadata";
import parallelProcessorPipelineTaskMetadata
  from "components/workflow/plan/step/parallel_processor/parallel-processor-pipeline-task-metadata";
import ParallelProcessorPipelineTaskSummaryPanel
  from "components/workflow/plan/step/parallel_processor/ParallelProcessorPipelineTaskSummaryPanel";
import pipelineActions from "components/workflow/pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ChildPipelineTaskSummaryPanel
  from "components/workflow/plan/step/child/ChildPipelineTaskSummaryPanel";
import childPipelineTaskMetadata
  from "components/workflow/plan/step/child/child-pipeline-task-metadata";
import PipelineSummaryReportPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineSummaryReportPanel";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import ExternalRestApiIntegrationTaskSummaryPanel
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/ExternalRestApiIntegrationTaskSummaryPanel";
import axios from "axios";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import PipelineUserActionSummaryPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/user_action/PipelineUserActionSummaryPanel";
import RuntimeSettingsTaskSummaryPanel
  from "components/workflow/plan/step/runtime_settings/RuntimeSettingsTaskSummaryPanel";

const PIPELINE_TASK_ACTIONS = {
  REPORT: "report",
  USER_ACTION: "user action",
};

// TODO: Rename PipelineActivityLogTaskSummaryPannel for clarity or something similar
function PipelineTaskSummaryPanel(
  {
    pipelineTaskData,
    setActiveTab,
  }) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getPipelineState(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipelineTaskData]);

  const getPipelineState = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const pipelineIds = [];
      pipelineIds.push(pipelineTaskData["pipeline_id"]);
      const pipelineStateResponse = await pipelineActions.getPipelineStatesV2(
        getAccessToken,
        cancelSource,
        pipelineIds,
      );

      if (pipelineStateResponse?.data) {
        pipelineTaskData["state"] = pipelineStateResponse.data[0].state;
      }
    }
    catch (error) {
      pipelineTaskData["state"] = "paused";
    }
    finally {
      setIsLoading(false);
    }
  };

  const wrapObject = (metaData) => {
    return new Model(pipelineTaskData, metaData, false);
  };

  const getSummaryPanel = () => {
    switch (pipelineTaskData?.action) {
      case PIPELINE_TASK_ACTIONS.REPORT:
        return (
          <PipelineSummaryReportPanel
            pipelineTaskData={pipelineTaskData}
            setActiveTab={setActiveTab}
          />
        );
      case PIPELINE_TASK_ACTIONS.USER_ACTION:
        return (
          <PipelineUserActionSummaryPanel
            pipelineTaskData={pipelineTaskData}
            setActiveTab={setActiveTab}
          />
        );
    }

    const apiResponseStepIdentifier = pipelineTaskData?.api_response?.stepIdentifier;

    if (apiResponseStepIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION) {
      return (
        <ExternalRestApiIntegrationTaskSummaryPanel
          externalRestApiIntegrationStepTaskModel={wrapObject(pipelineTaskMetadata)}
          endpoint={pipelineHelpers.parseSummaryLogApiResponseValue(pipelineTaskData, "endpoint")}
          endpoints={pipelineHelpers.parseSummaryLogApiResponseValue(pipelineTaskData, "endpoints")}
        />
      );
    }

    switch (pipelineTaskData.tool_identifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.PARALLEL_PROCESSOR:
        return (<ParallelProcessorPipelineTaskSummaryPanel pipelineTaskData={wrapObject(parallelProcessorPipelineTaskMetadata)}/>);
      case toolIdentifierConstants.TOOL_IDENTIFIERS.CHILD_PIPELINE:
        return (<ChildPipelineTaskSummaryPanel pipelineTaskData={wrapObject(childPipelineTaskMetadata)} />);
      case toolIdentifierConstants.TOOL_IDENTIFIERS.EXTERNAL_REST_API_INTEGRATION:
        return (
          <ExternalRestApiIntegrationTaskSummaryPanel
            externalRestApiIntegrationStepTaskModel={wrapObject(pipelineTaskMetadata)}
            endpoint={pipelineHelpers.parseSummaryLogApiResponseValue(pipelineTaskData, "endpoint")}
            endpoints={pipelineHelpers.parseSummaryLogApiResponseValue(pipelineTaskData, "endpoints")}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.RUNTIME_SETTINGS:
        return (
          <RuntimeSettingsTaskSummaryPanel
            pipelineTaskModel={wrapObject(pipelineTaskMetadata)}
          />
        );
      default:
        return (
          <PipelineTaskSummaryPanelBase
            pipelineTaskData={wrapObject(pipelineTaskMetadata)}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />;
  }

  return (getSummaryPanel());
}


PipelineTaskSummaryPanel.propTypes = {
  pipelineTaskData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default PipelineTaskSummaryPanel;