import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import JFrogToolRepositoriesPanel from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogToolRepositoriesPanel";
import MessageFieldBase from "components/common/fields/text/MessageFieldBase";
import ArgoToolRepositoriesPanel from "components/inventory/tools/tool_details/tool_jobs/argo/repositories/ArgoToolRepositoriesPanel";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import argoRepositoryMetadata from "./tool_jobs/argo/argo-repository-metadata";


function ToolRepositoriesPanel({ toolData, loadData, isLoading }) {
  const getToolRepositoriesPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
      case "jfrog_artifactory_maven":
        return (
          <JFrogToolRepositoriesPanel
            toolId={toolData?.getData("_id")}
          />
        );
      case toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO:
        return (
          <ArgoToolRepositoriesPanel
            toolActions={toolData?.getData("repositories")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return <LoadingDialog message={"Loading Tool Projects"} size={"sm"} />;
    }
  };

  return (
    <DetailPanelContainer>
      <div className="h6">Managed Repositories Creation</div>
      <MessageFieldBase message={`Add, Modify or Delete Repositories. These repositories can be entered once and reused across the Opsera platform.`}/>
      {getToolRepositoriesPanel()}
    </DetailPanelContainer>

  );
}

ToolRepositoriesPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};


export default ToolRepositoriesPanel;
