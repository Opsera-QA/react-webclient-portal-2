import React from "react";
import ArgoApplications from "./tool_jobs/argo/applications/ArgoApplications";
import OctopusToolApplicationsPanel from "components/inventory/tools/tool_details/tool_jobs/octopus/applications/OctopusToolApplicationsPanel";
import PropTypes from "prop-types";

function ToolApplicationsPanel({ toolData, setToolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "argo":
        return (
          <ArgoApplications
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      case "octopus":
        return (
          <OctopusToolApplicationsPanel
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            Application management is not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }

    return getPanel(toolData["tool_identifier"].toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted">
        <div className={"ml-1 mt-3"}>
          <div className="h6">
            Managed Application Creation
          </div>
          <div className="mb-3">
            Use this feature to create applications in the managed tool.
          </div>
        </div>
        {getBody()}
      </div>
    </>
  );
}

ToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  setToolData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolApplicationsPanel;
