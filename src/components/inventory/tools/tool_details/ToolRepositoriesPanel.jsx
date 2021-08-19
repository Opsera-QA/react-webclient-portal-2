import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import MessageField from "components/common/form_fields/MessageField";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import JFrogMavenRepositoriesPanel from "components/inventory/tools/tool_details/tool_jobs/jfrog_artifactory/repositories/JFrogMavenRepositoriesPanel";

function ToolRepositoriesPanel({ toolData, loadData, isLoading }) {
  const getToolRepositoriesPanel = () => {
    switch (toolData?.getData("tool_identifier")) {
    case "jfrog_artifactory_maven":
      return <JFrogMavenRepositoriesPanel isLoading={isLoading} toolData={toolData} />;
    default:
      return <LoadingDialog message={"Loading Tool Projects"} size={"sm"} />;
    }
  };

  return (
    <DetailPanelContainer>
      <div className="h6">Managed Repositories Creation</div>
      <MessageField message={`Add, Modify or Delete JFrog Maven Repositories. These repositories can be entered once and reused across the Opsera platform.`}/>
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
