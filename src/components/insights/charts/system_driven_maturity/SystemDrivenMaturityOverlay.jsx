import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import { DialogToastContext } from "contexts/DialogToastContext";
import SystemDrivenMaturityGroupsTab from './SystemDrivenMaturityGroupsTab';
import SystemDrivenMaturityProjectsTab from './SystemDrivenMaturityProjectsTab';
import { MaturityScoreItemType } from './maturityScoreItemType';

const OVERLAY_TABS = {
  GROUPS: 'groups',
  PROJECTS: 'projects'
};

function SystemDrivenMaturityOverlay ({ kpiConfiguration, dashboardData, orgTag }) {
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState(OVERLAY_TABS.GROUPS);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const onSelectGroup = (group) => {
    setActiveTab(OVERLAY_TABS.PROJECTS);
    setSelectedGroup(group);
  };

  const onGoToGroupsTab = () => {
    setActiveTab(OVERLAY_TABS.GROUPS);
    setSelectedGroup(null);
  };

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const breadcrumbBar = (
    <>
      <button type="button" onClick={onGoToGroupsTab}>GROUPS</button>
      {selectedGroup && <h5>{selectedGroup.name}</h5>}
    </>
  );

  const getBody = () => {
    if (!orgTag) {
      return 'No organization tag';
    }

    if (activeTab === OVERLAY_TABS.GROUPS) {
      return (
        <SystemDrivenMaturityGroupsTab
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            orgTag={orgTag}
            onSelectGroup={onSelectGroup}
        />
      );
    }

    if (activeTab === OVERLAY_TABS.PROJECTS) {
      return (
        <SystemDrivenMaturityProjectsTab
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          group={selectedGroup}
        />
      );
    }
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Dora Organization Tags Actionable Insights"}
      showToasts={true}
    >
      {breadcrumbBar}
      <div className={"p-3"}>
        <TabPanelContainer currentView={getBody()} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SystemDrivenMaturityOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  orgTag: MaturityScoreItemType
};

export default SystemDrivenMaturityOverlay;