import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import JiraToolProjectsPanel from "components/inventory/tools/tool_details/tool_jobs/jira/projects/JiraToolProjectsPanel";
import ArgoToolProjectsPanel from "../tool_jobs/argo/projects/ArgoToolProjectsPanel";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import SnaplogicProjectsPanel from "../tool_jobs/snaplogic/projects/SnaplogicProjectsPanel";

function ToolProjectsPanel({ toolData, loadData, isLoading }) {
  const getToolProjectsPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
    case "jira":
      return (
        <JiraToolProjectsPanel
          isLoading={isLoading}
          toolData={toolData}
          loadData={loadData}
        />
      );
    case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
      return <ArgoToolProjectsPanel toolId={toolData?.getData("_id")} />;
    case toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC:
      return <SnaplogicProjectsPanel isLoading={isLoading} toolData={toolData} toolActions={toolData?.getData("projects")} loadData={loadData}/>;
    default:
      return <LoadingDialog message={"Loading Tool Projects"} size={"sm"} />;
    }
  };

  return (
    <DetailPanelContainer>
      <div className="h6">Managed Projects Creation</div>
      <MessageFieldBase message={`Create settings for custom project configuration to be used.
          These settings can be entered once and reused across the Opsera platform.`}/>
      {getToolProjectsPanel()}
    </DetailPanelContainer>
  );
}

ToolProjectsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolProjectsPanel;
