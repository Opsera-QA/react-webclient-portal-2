import React, { useContext } from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import DashboardMetricOverlayContainer from "components/insights/dashboards/metrics/DashboardMetricOverlayContainer";

function ChartSettingsOverlay(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    loadData,
    setKpis,
    isMounted,
    settingsHelpComponent,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleIcon={faCogs}
      titleText={`Editing ${kpiConfiguration?.kpi_name} Settings`}
      showCloseButton={false}
    >
      <DashboardMetricOverlayContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        settingsHelpComponent={settingsHelpComponent}
        dashboardData={dashboardData}
        index={index}
        loadChart={loadData}
        setKpis={setKpis}
        closePanel={closePanel}
      />
    </CenterOverlayContainer>
  );
}

ChartSettingsOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpis: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  settingsHelpComponent: PropTypes.object,
};

export default ChartSettingsOverlay;
