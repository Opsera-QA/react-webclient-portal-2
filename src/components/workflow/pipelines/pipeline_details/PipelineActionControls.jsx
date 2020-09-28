import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "../../../common/modal/modal";
import ApprovalModal from "../../approvalModal";
import PipelineStartWizard from "./PipelineStartWizard";
import PipelineHelpers from "../../pipelineHelpers";
import PipelineActions from "../../pipeline-actions";
/*import socketIOClient from "socket.io-client";
import isEqual from "lodash.isequal";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faSync,
  faSpinner,
  faStopCircle,
  faHistory,
  faPause,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

import "../../workflows.css";
import ErrorDialog from "../../../common/status_notifications/error";

function PipelineActionControls({
  pipeline,
  customerAccessRules,
  disabledActionState,
  fetchData,
  fetchActivityLogs,
  setParentWorkflowStatus,
  setPipeline,
  refreshCount,
  setRefreshCount,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [workflowStatus, setWorkflowStatus] = useState(false);
  //const [socketRunning, setSocketRunning] = useState(false);
  const [resetPipeline, setResetPipeline] = useState(false);
  const [startPipeline, setStartPipeline] = useState(false);
  const [stopPipeline, setStopPipeline] = useState(false);
  const [approval, setApproval] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [wizardModal, setWizardModal] = useState({
    show: false,
    pipelineType: "",
    pipelineId: "",
    pipelineOrientation: "",
  });
  const [infoModal, setInfoModal] = useState({ show: false, header: "", message: "", button: "OK" });
  const [error, setErrors] = useState();
  /*const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  let tmpDataObject = {};
  let staleRefreshCount = 0;*/
  let socket;

  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrrator

    } else if (owner && customerAccessRules.UserId === owner) {
      return true; //owner can do all actions

    } else if (customerAccessRules.PowerUser) {
      switch (action) {
      case "stop_pipeline_btn":
        return true;
      case "approve_step_btn":
        return true;
      case "start_pipeline_btn":
        return true;
      case "reset_pipeline_btn":
        return true;
      default:
        return false; //all other options are disabled
      }

    } else if (customerAccessRules.User) {
      switch (action) {
      case "stop_pipeline_btn":
        return true;
      case "start_pipeline_btn":
        return true;
      case "reset_pipeline_btn":
        return true;
      default:
        return false; //all other options are disabled
      }

    } else {
      return false;
    }
  };


  useEffect(() => {
    loadData(pipeline);
    setParentWorkflowStatus(workflowStatus);
    //analyzeWorkflowStatus(workflowStatus);
  }, [workflowStatus]);

  useEffect(() => {
    if (startPipeline) {
      console.log("Effect: Setting Start Pipeline True");
      setWorkflowStatus("running");
    } else {
      setWorkflowStatus("stopped");
    }

  }, [startPipeline]);

  useEffect(() => {
    console.log("Pipeline workflow update detected, determining status!!!");
    loadData(pipeline);
  }, [JSON.stringify(pipeline.workflow)]);

/*
  const analyzeWorkflowStatus = (workflowStatus) => {
    if (workflowStatus === "paused" || workflowStatus === "stopped") {
      fetchActivityLogs();
    }
  };*/

  const loadData = (pipeline) => {
    if (pipeline.workflow !== undefined) {
      if (pipeline.workflow.last_step !== undefined) {
        let status = pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;
        if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
          setWorkflowStatus("paused");
        } else {
          setWorkflowStatus(status);
        }

      } else {
        setWorkflowStatus("stopped");
      }
    }
  };

  // button handlers
  const handleStopWorkflowClick = async (pipelineId) => {
    setResetPipeline(true);
    setWorkflowStatus("stopped");
    await cancelPipelineRun(pipelineId);
    await fetchData();
    await fetchActivityLogs();
    setResetPipeline(false);
    setStartPipeline(false);
  };

  const handleApprovalClick = () => {
    setApproval(true);
    setShowApprovalModal(true);
  };

  const handleApprovalActivity = async () => {
    setInfoModal({
      show: true,
      header: "Approval Status",
      message: "Your approval action has been recorded in this pipeline's Activity Logs.  The pipeline will resume operations shortly.",
      button: "OK",
    });
    setWorkflowStatus("running");
    await fetchData();
    delayRefresh();
    setApproval(false);
  };

  const launchPipelineStartWizard = (pipelineOrientation, pipelineType, pipelineId) => {
    console.log("launching wizard");
    console.log("pipelineOrientation ", pipelineOrientation);
    console.log("pipelineType ", pipelineType);
    console.log("pipelineId ", pipelineId);
    setWizardModal({
      show: true,
      pipelineType: pipelineType,
      pipelineId: pipelineId,
      pipelineOrientation: pipelineOrientation,
    });
  };

  const handlePipelineStartWizardClose = () => {
    console.log("closing wizard");
    setWizardModal({ show: false, pipelineType: "", pipelineId: "", pipelineOrientation: "" });
  };

  const handlePipelineWizardRequest = async (pipelineId, restartBln) => {
    console.log("handling pipeline run");
    setWizardModal({ ...wizardModal, show: false });
    if (restartBln) {
      console.log("clearing pipeline activity and then starting over");
      await cancelPipelineRun(pipelineId);
    }
    await runPipeline(pipelineId);
  };

  const handleRunPipelineClick = async (pipelineId) => {
    //check type of pipeline to determine if pre-flight wizard is required
    // is pipeline at the beginning or stopped midway or end of prior?
    const pipelineType = typeof pipeline.type !== "undefined" && pipeline.type[0] !== undefined ? pipeline.type[0] : ""; //for now type is just the first entry

    let pipelineOrientation = "start";
    //what step are we currently on in the pipeline: first, last or middle?
    if (pipeline.workflow.last_step && pipeline.workflow.last_step.step_id) {
      const stepIndex = PipelineHelpers.getStepIndex(pipeline, pipeline.workflow.last_step.step_id);
      console.log("current resting step index: ", stepIndex);
      if (stepIndex + 1 === Object.keys(pipeline.workflow.plan).length) {
        pipelineOrientation = "end";
      } else {
        pipelineOrientation = "middle";
      }
    }

    if (pipelineType === "sfdc") {
      launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
    } else {
      if (pipelineOrientation === "middle") {
        //this is the middle, so pop the new modal to confirm user wants to resume or offer reset/restart
        launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
      } else { //this is starting from beginning:
        if (pipelineOrientation === "start") {
          console.log("starting pipeline from scratch");
          await runPipeline(pipelineId);
        } else {
          console.log("clearing pipeline activity and then starting over");
          await cancelPipelineRun(pipelineId);
          await runPipeline(pipelineId);
        }
      }
    }
  };

  const handleRefreshClick = async () => {
    await fetchData();
    await fetchActivityLogs();
    //subscribeToTimer(socket);
  };

  //action functions
  async function cancelPipelineRun(pipelineId) {
    setStopPipeline(true);
    const response = await PipelineActions.cancel(pipelineId, getAccessToken)
      .catch(err => {
        setStartPipeline(false);
        console.log(err);
        setErrors(err.error);
      });
    setStopPipeline(false);
    setStartPipeline(false);
  }

  async function runPipeline(pipelineId) {
    setStartPipeline(true);

    await PipelineActions.run(pipelineId, {}, getAccessToken)
      .catch(err => {
        setStartPipeline(false);
        console.log(err);
        setErrors(err.error);
      });

    setTimeout(async function() {
      await fetchData();
      setStartPipeline(false);
    }, 45000);
  }

  /*const stopSocket = () => {
    if (socket) {
      socket.close();
      console.log("closing connection manually");
      setSocketRunning(false);
    }
  };
*/

  const delayRefresh = () => {
    setTimeout(async function() {
      await fetchData();
    }, 30000);
  }


  /*const subscribeToTimer = (socket) => {
    console.log("initializingSocket");
    socket = socketIOClient(endPointUrl, { query: "pipelineId=" + pipeline._id + "&user=" + pipeline.owner });
    console.log("Connected status before onConnect", socket.socket ? socket.socket.connected : socket.socket === undefined);

    if (socket.socket === undefined) {
      socket.emit("subscribeToPipelineActivity", 1000);
      socket.on("subscribeToPipelineActivity", dataObj => {
        console.log("Update from Websocket (staleRefreshCount: " + staleRefreshCount + "): ", dataObj);
        if (isEqual(dataObj, tmpDataObject)) {
          staleRefreshCount++;
        } else {
          staleRefreshCount = 0;
        }
        tmpDataObject = dataObj;
        let status = pipeline.workflow.last_step !== undefined && pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;
        if (staleRefreshCount % 2 === 0) {
          //console.log("divisible by 2 refresh");
          fetchActivityLogs();
        }

        if (staleRefreshCount >= 10) {
          console.log("closing connection due to stale data");
          setWorkflowStatus("stopped");
          setSocketRunning(false);
          socket.close();
          fetchActivityLogs();
        } else {
          if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
            setWorkflowStatus("paused");
          } else {
            setWorkflowStatus(status);
          }
        }

        if (typeof (dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
          pipeline.workflow.last_step = dataObj;
          let updatedPipeline = pipeline;
          updatedPipeline.workflow = { ...pipeline.workflow, last_step: dataObj };
          setPipeline(updatedPipeline);
          setRefreshCount(refreshCount => refreshCount + 1);
        }

        if (staleRefreshCount > 1 && status === "stopped") {
          console.log("closing connection due to stopped status");
          setWorkflowStatus("stopped");
          setSocketRunning(false);
          socket.close();
          fetchActivityLogs();
        }
      });
    }

    socket.on("disconnect", () => {
      setWorkflowStatus("stopped");
      setSocketRunning(false);
    });

    socket.on("connect_error", function(err) {
      console.log("Connection Error on Socket:", err);
      setWorkflowStatus("stopped");
      setSocketRunning(false);
      socket.close();
    });


  };*/


  return (
    <>
      {wizardModal.show &&
      <PipelineStartWizard pipelineType={wizardModal.pipelineType} pipelineOrientation={wizardModal.pipelineOrientation}
                           pipelineId={wizardModal.pipelineId} pipeline={pipeline}
                           handleClose={handlePipelineStartWizardClose}
                           handlePipelineWizardRequest={handlePipelineWizardRequest}
                           refreshPipelineActivityData={fetchActivityLogs}/>}

      {error && <ErrorDialog error={error} setError={setErrors} align="top"/>}

      <div className="text-right">
        {workflowStatus === "running" &&
        <>
          <Button variant="dark"
                  className="mr-1"
                  size="sm"
                  disabled>
            <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
          <Button variant="danger"
                  className="mr-1"
                  size="sm"
                  onClick={() => {
                    handleStopWorkflowClick(pipeline._id);
                  }}
                  disabled={!authorizedAction("stop_pipeline_btn", pipeline.owner)}>
            {stopPipeline ?
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> :
              <FontAwesomeIcon icon={faStopCircle} className="mr-1"/>}Stop</Button>
        </>}

        {workflowStatus === "paused" &&
        <>
          <Button variant="warning" className="mr-1" size="sm" disabled>
            <FontAwesomeIcon icon={faPause} className="mr-1"/> Paused</Button>
          <Button variant="warning"
                  className="mr-1"
                  size="sm"
                  onClick={() => {
                    handleApprovalClick();
                  }}
                  disabled={!authorizedAction("approve_step_btn", pipeline.owner)}>
            {approval ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> :
              <FontAwesomeIcon icon={faFlag} className="mr-1" fixedWidth/>}Approve Step</Button>
        </>}

        {(workflowStatus === "stopped" || !workflowStatus) &&
        <>
          {startPipeline ?
            <Button variant="outline-danger"
                    className="mr-1"
                    size="sm"
                    onClick={() => {
                      handleRunPipelineClick(pipeline._id);
                    }}
                    disabled={true}>
              <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1"/> Running</Button>
            :
            <Button variant="success"
                    className="mr-1"
                    size="sm"
                    onClick={() => {
                      handleRunPipelineClick(pipeline._id);
                    }}
                    disabled={!authorizedAction("start_pipeline_btn", pipeline.owner) || disabledActionState}>
              <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/> Start <span
              className="d-none d-md-inline">Pipeline</span></Button>
          }
        </>}

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "Restart pipeline from beginning as new run" })}>
          <Button variant="danger"
                  className="mr-1"
                  size="sm"
                  onClick={() => {
                    handleStopWorkflowClick(pipeline._id);
                  }}
                  disabled={!authorizedAction("reset_pipeline_btn", pipeline.owner) || disabledActionState}>
            {resetPipeline ? <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1"/> :
              <FontAwesomeIcon icon={faHistory} fixedWidth className="mr-1"/>}
            <span className="d-none d-md-inline">Reset Pipeline</span></Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "Refresh pipeline status" })}>
          <Button variant="secondary"
                  className="mr-1"
                  size="sm"
                  onClick={() => {
                    handleRefreshClick();
                  }}>
            <FontAwesomeIcon icon={faSync} fixedWidth/></Button>
        </OverlayTrigger>

      </div>
      {showApprovalModal &&
      <ApprovalModal pipelineId={pipeline._id} visible={showApprovalModal} setVisible={setShowApprovalModal}
                     refreshActivity={handleApprovalActivity}/>}
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button}
                                handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}/>}
    </>);
}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineActionControls.propTypes = {
  pipeline: PropTypes.object,
  customerAccessRules: PropTypes.object,
  disabledActionState: PropTypes.bool,
  fetchData: PropTypes.func,
  fetchActivityLogs: PropTypes.func,
  setParentWorkflowStatus: PropTypes.func,
  setPipeline: PropTypes.func,
  refreshCount: PropTypes.number,
  setRefreshCount: PropTypes.func,
};
export default PipelineActionControls;