import React, {useEffect} from 'react';
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TasksSubNavigationBar from "components/tasks/TasksSubNavigationBar";
import TaskViews from "components/tasks/TaskViews";
import TasksHelpDocumentation from "../common/help/documentation/tasks/TasksHelpDocumentation";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";
import NewTaskOverlay from "components/tasks/NewTaskOverlay";
import InlineTaskTypeFilter from "components/common/filters/tasks/type/InlineTaskTypeFilter";
import TaskCardView from "components/tasks/TaskCardView";
import TaskTable from "components/tasks/TaskTable";
import TaskVerticalTabContainer from "components/tasks/TaskVerticalTabContainer";
import TableCardView from "components/common/table/TableCardView";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import SideBySideViewBase from "components/common/tabs/SideBySideViewBase";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskFilterOverlay from "components/tasks/TaskFilterOverlay";

const tableFields = ["name", "description", "type", "tags", "createdAt", "updatedAt", "active", "status", "run_count", "completion"];

function TaskManagement() {
  const {
    tasks,
    isLoading,
    taskFilterModel,
    setTaskFilterModel,
    loadData,
  } = useGetTasks(
    tableFields,
    true,
  );
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {}, []);

  const createNewTask = () => {
    toastContext.showOverlayPanel(
      <NewTaskOverlay
        loadData={loadData}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineTaskTypeFilter
        filterModel={taskFilterModel}
        setFilterModel={setTaskFilterModel}
        className={"mr-2"}
        loadData={loadData}
      />
    );
  };

  const getCardView = () => {
    return (
      <TaskCardView
        isLoading={isLoading}
        loadData={loadData}
        taskData={tasks}
      />
    );
  };

  const getTableView = () => {
    return (
      <TaskTable
        isLoading={isLoading}
        loadData={loadData}
        taskData={tasks}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <TaskVerticalTabContainer
        isLoading={isLoading}
        loadData={loadData}
        taskFilterModel={taskFilterModel}
      />
    );
  };

  const getCurrentView = () => {
    return (
      <TableCardView
        data={tasks}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };


  return (
    <ScreenContainer
      breadcrumbDestination={"taskManagement"}
      helpComponent={<TasksHelpDocumentation />}
      navigationTabContainer={<TasksSubNavigationBar currentTab={"tasks"}/>}
      addRecordFunction={TaskRoleHelper.canCreateTask(userData) === true ? createNewTask : undefined}
      filterOverlay={<TaskFilterOverlay taskFilterModel={taskFilterModel} loadDataFunction={loadData} />}
      loadDataFunction={loadData}
      filterModel={taskFilterModel}
      setFilterModel={setTaskFilterModel}
    >
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={taskFilterModel}
        setFilterDto={setTaskFilterModel}
        data={tasks}
        nextGeneration={true}
        containerHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
      >
        <SideBySideViewBase
          leftSideView={getVerticalTabContainer()}
          rightSideView={getCurrentView()}
          leftSideMinimumWidth={"175px"}
          leftSideMaximumWidth={"175px"}
        />
      </PaginationContainer>
    </ScreenContainer>
  );
}

export default TaskManagement;

