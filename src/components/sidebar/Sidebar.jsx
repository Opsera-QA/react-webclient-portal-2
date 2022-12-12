import React, { useState } from "react";
import PropTypes from "prop-types";
import "css/general/sidebar.css";
import ToolchainSidebarNavigationLink from "components/sidebar/links/ToolchainSidebarNavigationLink";
import PipelinesSidebarNavigationLink from "components/sidebar/links/PipelinesSidebarNavigationLink";
import InsightsSidebarNavigationLink from "components/sidebar/links/InsightsSidebarNavigationLink";
import HomeSidebarNavigationLink from "components/sidebar/links/HomeSidebarNavigationLink";
import AdminToolsSidebarNavigationLink from "components/sidebar/links/AdminToolsSidebarNavigationLink";
import useComponentStateReference from "hooks/useComponentStateReference";
import ToolRegistrySidebarNavigationLink from "components/sidebar/links/ToolRegistrySidebarNavigationLink";
import SettingsSidebarNavigationLink from "components/sidebar/links/SettingsSidebarNavigationLink";
import ReportsSidebarNavigationLink from "components/sidebar/links/ReportsSidebarNavigationLink";
import NotificationsSidebarNavigationLink from "components/sidebar/links/NotificationsSidebarNavigationLink";
import BlueprintsSidebarNavigationLink from "components/sidebar/links/BlueprintsSidebarNavigationLink";
import LogsSidebarNavigationLink from "components/sidebar/links/LogsSidebarNavigationLink";
import TasksSidebarNavigationLink from "components/sidebar/links/TasksSidebarNavigationLink";
import ToggleSidebarSizeIcon from "components/sidebar/ToggleSidebarSizeIcon";
import SidebarSubheaderText from "components/sidebar/SidebarSubheaderText";
import sessionHelper from "utils/session.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function Sidebar({ hideSideBar }) {
  const { userData } = useComponentStateReference();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(DataParsingHelper.parseBooleanV2(sessionHelper.getStoredSessionValueByKey("SIDEBAR_COLLAPSED"), false));

  if (userData == null || hideSideBar === true) {
    return null;
  }

  return (
    <div
      className={isSidebarCollapsed === true ? "d-block sidebar-container" : "w-20 d-block sidebar-container"}
    >
      <div className={"sticky-top py-5 sidebar-menu"}>
        <HomeSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <SidebarSubheaderText
          isSidebarCollapsed={isSidebarCollapsed}
          subheaderText={"Products"}
        />
        <ToolchainSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <PipelinesSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <InsightsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <SidebarSubheaderText
          isSidebarCollapsed={isSidebarCollapsed}
          subheaderText={"Operations"}
        />
        <ToolRegistrySidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <TasksSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <LogsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <BlueprintsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <ReportsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <NotificationsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <SettingsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <AdminToolsSidebarNavigationLink
          isSidebarCollapsed={isSidebarCollapsed}
        />
        <ToggleSidebarSizeIcon
          isSidebarCollapsed={isSidebarCollapsed === true}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          className={"mt-3"}
        />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};
