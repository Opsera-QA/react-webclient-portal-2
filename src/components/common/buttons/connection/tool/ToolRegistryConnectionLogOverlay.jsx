import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ConsoleLogOverlay from "components/common/overlays/log/ConsoleLogOverlay";
import toolsActions from "components/inventory/tools/tools-actions";
import { parseError } from "components/common/helpers/error-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import { TEST_TOOL_CONNECTION_STATES } from "components/common/buttons/connection/tool/TestToolConnectionButton";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

function ToolRegistryConnectionLogOverlay(
  {
    currentStateRef,
    toolModel,
    toolName,
  }) {
  const [logs, setLogs]  = useState([]);
  const {
    cancelTokenSource,
    toastContext,
    getAccessToken,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    setLogs([]);
    testConnection().catch((error) => {
      if (isMounted?.current === true) {
        console.error(error);
      }
    });
  }, []);

  const testConnection = async () => {
    const newLogs = ["Starting connection test of tool...\n"];

    try {
      setLogs([...newLogs]);
      const response = await toolsActions.checkToolConnectivityV2(getAccessToken, cancelTokenSource, toolModel?.getData("_id"), toolName);

      if (isMounted.current === true) {
        if (response?.status === 200) {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;

          newLogs.push(
            "Connection Succeeded!\n",
            `Status: ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete.\nPlease close this window to proceed.\n`,
          );

          setLogs(newLogs);
          currentStateRef.current =
            currentStateRef.current = TEST_TOOL_CONNECTION_STATES.SUCCESSFUL_CONNECTION;
        } else {
          const message = JSON.stringify(response?.data?.message);
          const status = response?.status;
          newLogs.push(
            `Connection Failed!\n`,
            `Status : ${status}\n`,
            `Message: ${message}\n`,
            `Test Complete. \nPlease close this panel, address the issue and try again.\n`,
          );

          setLogs(newLogs);
          currentStateRef.current = TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION;
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        newLogs.push(
          `Connection Failed!\n`,
          `Error: ${parsedError}\n`,
          `Test Complete.  Please close this panel, address the issue and try again.\n`,
        );

        setLogs(newLogs);
        currentStateRef.current = TEST_TOOL_CONNECTION_STATES.FAILED_CONNECTION;
      }
    }
  };

  const handleCloseFunction = () => {
    if (currentStateRef?.current === TEST_TOOL_CONNECTION_STATES.TESTING) {
      currentStateRef.current = TEST_TOOL_CONNECTION_STATES.READY;
    }

    setLogs([]);
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <ConsoleLogOverlay
      handleCloseFunction={handleCloseFunction}
      body={dataParsingHelper.parseArray(logs, [])}
    />
  );
}
ToolRegistryConnectionLogOverlay.propTypes = {
  currentStateRef: PropTypes.object,
  toolModel: PropTypes.object.isRequired,
  toolName: PropTypes.string.isRequired,
};

export default ToolRegistryConnectionLogOverlay;