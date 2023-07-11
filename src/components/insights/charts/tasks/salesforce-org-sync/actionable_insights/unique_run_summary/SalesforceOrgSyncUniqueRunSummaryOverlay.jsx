import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import SalesforceOrgSyncUniqueRunSummaryDataBlocks from "./SalesforceOrgSyncUniqueRunSummaryDataBlocks";
import { SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS } from "../SalesforceOrgSyncActionableInsightOverlay";
import SalesforceOrgSyncUniqueRunSummary from "./SalesforceOrgSyncUniqueRunSummary";

function SalesforceOrgSyncUniqueRunSummaryOverlay(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    setCurrentScreen,
    setSelectedRunObject,
    breadcrumbBar,
    selectedRunObject,
  }) {
  const toastContext1 = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext1.removeInlineMessage();
    toastContext1.clearInfoOverlayPanel();
  };

  const handleBackButtonFunction = () => {
    setSelectedRunObject(undefined);
    setCurrentScreen(SALESFORCE_ORG_SYNC_ACTIONABLE_INSIGHT_SCREENS.SALESFORCE_ORG_SYNC_RUN_SUMMARY);
  };

  const getButtonContainer = () => {
    return (
      <div className={"mx-3 py-2"}>
        <ButtonContainerBase
          leftSideButtons={
            <BackButtonBase
              backButtonFunction={handleBackButtonFunction}
            />
          }
        >
          <CloseButton
            closeEditorCallback={closePanel}
          />
        </ButtonContainerBase>
      </div>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Task Components List`}
      showToasts={true}
      buttonContainer={getButtonContainer()}
    >
      {breadcrumbBar}
      <div>
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
              <b>Task Id:</b> {selectedRunObject?.taskId}
            </div>
            <div className={'mr-4'}>
              <b>Task Name:</b> {selectedRunObject?.taskName}
            </div>
            <div className={'mr-4'}>
              <b>Run Count:</b> {selectedRunObject?.runCount}
            </div>
          </div>
        </div>
        <div>
          <SalesforceOrgSyncUniqueRunSummaryDataBlocks
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            selectedRunObject={selectedRunObject}
          />
          <SalesforceOrgSyncUniqueRunSummary
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            dashboardFilters={dashboardFilters}
            selectedRunObject={selectedRunObject}
          />
        </div>
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

SalesforceOrgSyncUniqueRunSummaryOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  setCurrentScreen: PropTypes.func,
  setSelectedRunObject: PropTypes.func,
  breadcrumbBar: PropTypes.any,
  selectedRunObject: PropTypes.object,
};

export default SalesforceOrgSyncUniqueRunSummaryOverlay;
