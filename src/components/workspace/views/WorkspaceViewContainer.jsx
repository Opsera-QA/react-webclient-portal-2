import React, { useState } from "react";
import WorkspaceVerticalTabContainer from "components/workspace/views/WorkspaceVerticalTabContainer";
import TabAndViewContainer from "components/common/tabs/tree/TabTreeAndViewContainer";
import { faRectangleList } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import WorkspaceFilterModel from "components/workspace/views/workspace.filter.model";
import WorkspaceRegistry from "components/workspace/views/tool/WorkspaceRegistry";
import WorkspaceTasks from "components/workspace/views/task/WorkspaceTasks";
import WorkspacePipelines from "components/workspace/views/pipeline/WorkspacePipelines";
import WorkspaceItems from "components/workspace/views/all/WorkspaceItems";

export default function WorkspaceViewContainer() {
  const [workspaceFilterModel, setWorkspaceFilterModel] = useState(new WorkspaceFilterModel());

  const getCurrentView = () => {
    switch (workspaceFilterModel?.getData("type")) {
      case "pipelines":
        return (
          <WorkspacePipelines
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "registry":
        return (
          <WorkspaceRegistry
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "tasks":
        return (
          <WorkspaceTasks
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
      case "all":
      default:
        return (
          <WorkspaceItems
            workspaceFilterModel={workspaceFilterModel}
            setWorkspaceFilterModel={setWorkspaceFilterModel}
          />
        );
    }
  };

  const getVerticalTabContainer = () => {
    return (
      <WorkspaceVerticalTabContainer
        workspaceFilterModel={workspaceFilterModel}
        setWorkspaceFilterModel={setWorkspaceFilterModel}
      />
    );
  };

  const getTabAndViewContainer = () => {
    return (
      <TabAndViewContainer
        verticalTabContainer={getVerticalTabContainer()}
        currentView={getCurrentView()}
        tabColumnSize={2}
        // bodyClassName={bodyClassName}
        // minimumHeight={minimumHeight}
        // maximumHeight={maximumHeight}
        // overflowXBodyStyle={overflowXBodyStyle}
        // overflowYContainerStyle={overflowYContainerStyle}
        // overflowYBodyStyle={overflowYBodyStyle}
      />
    );
  };

  return (
    <FilterContainer
      // addRecordFunction={createNewTask}
      body={getTabAndViewContainer()}
      titleIcon={faRectangleList}
      filterDto={workspaceFilterModel}
      setFilterDto={setWorkspaceFilterModel}
      supportViewToggle={true}
      title={"Workspace"}
      className={"px-2 pb-2"}
    />
  );
}

WorkspaceViewContainer.propTypes = {};