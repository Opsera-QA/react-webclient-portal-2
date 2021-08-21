import React, {useContext, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faTag, faExclamationCircle, faSpinner} from "@fortawesome/pro-light-svg-icons";
import "components/analytics/charts/charts.css";
import KpiSettingsForm from "components/insights/marketplace/charts/KpiSettingsForm";
import {getChartIconFromKpiConfiguration} from "components/insights/charts/charts-helpers";
import InfoDialog from "components/common/status_notifications/info";
import ToggleSettingsIcon from "components/common/icons/details/ToggleSettingsIcon.jsx";
import CustomBadge from "components/common/badges/CustomBadge";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import GenericChartSettingsHelpDocumentation
  from "components/common/help/documentation/insights/charts/GenericChartSettingsHelpDocumentation";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Refactor
function VanityMetricContainer(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    chart,
    isLoading,
    error,
    loadChart,
    setKpis,
    chartHelpComponent,
    settingsHelpComponent,
    showSettingsToggle,
    className,
  }) {
  const [view, setView] = useState("chart");
  const [helpIsShown, setHelpIsShown] = useState(false);
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  const closeHelpPanel = () => {
    setHelpIsShown(false);
  };

  const getHelpToggle = () => {
    // TODO: Remove feature flag after verification
    if (featureFlagHideItemInProd()) {
      return null;
    }

    if ((view !== "chart" || chartHelpComponent) && !helpIsShown) {
      return (
        <ActionBarToggleHelpButton
          helpIsShown={helpIsShown}
          toggleHelp={() => setHelpIsShown(!helpIsShown)}
          visible={!helpIsShown}
          size={"1x"}
        />
      );
    }
  };

  const getSettingsHelpComponent = () => {
    if (settingsHelpComponent) {
      settingsHelpComponent(closeHelpPanel);
    }

    return (
      <GenericChartSettingsHelpDocumentation closeHelpPanel={closeHelpPanel} />
    );
  };

  // TODO: This is a workaround, but I want to come up with a better solution
  const getSettingsToggle = () => {
    if (showSettingsToggle !== false) {
      return (
        <ToggleSettingsIcon
          className={"ml-2"}
          visible={!helpIsShown}
          activeTab={view}
          setActiveTab={setView}
        />
      );
    }
  };

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Chart</span>);
    }

    if (error) {
      return (
        <div className="d-flex justify-content-between">
          <span>
            <FontAwesomeIcon icon={faExclamationCircle} spin fixedWidth className="mr-1"/>
            Error Loading Chart!
          </span>
          <div>
            {getSettingsToggle()}
          </div>
        </div>
      );
    }

    return (
      <div className="d-flex justify-content-between">
        <div>
          <FontAwesomeIcon icon={getChartIconFromKpiConfiguration(kpiConfiguration)} fixedWidth className="mr-1"/>
          {kpiConfiguration?.kpi_name}
        </div>
        <div className={"d-flex"}>
          {getHelpToggle()}
          {getSettingsToggle()}
        </div>
      </div>
    );
  };

  // TODO: Make ErrorChartContainer
  const getChartBody = () => {
    if (view === "settings") {
      if (helpIsShown) {
        return (
          <div className={"m-2"}>
            {getSettingsHelpComponent()}
          </div>
        );
      }

      return (
        <KpiSettingsForm
          kpiConfiguration={kpiConfiguration}
          setKpiConfiguration={setKpiConfiguration}
          dashboardData={dashboardData}
          index={index}
          loadChart={loadChart}
          setKpis={setKpis}
          setView={setView}
        />
      );
    }

    if (error) {
      return (
        <span>There was an error loading this chart: {error.message}. Please check logs for more details.</span>
      );
    }

    if (helpIsShown) {
      return (
        <div className={"m-2"}>
          {chartHelpComponent(closeHelpPanel)}
        </div>
      );
    }

    // TODO: Rework when all are updated
    if (chart === null && !isLoading) {
      return (
        <div className="new-chart mb-3" style={{ height: "300px" }}>
          <div className="max-content-width p-5 mt-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        </div>
      );
    }

    if (chart === null && isLoading) {
      return (
        <div className="m-3">
          <LoadingDialog size={"sm"} message={"Loading Metric"} />
        </div>
      );
    }

    return (
      <div className={className}>
        {chart}
      </div>
    );
  };

  const getTagBadges = () => {
    const tags = kpiConfiguration?.filters[kpiConfiguration?.filters?.findIndex((obj) => obj.type === "tags")]?.value;
    const useKpiTags = kpiConfiguration?.settings?.useKpiTags !== false;
    const useDashboardTags = kpiConfiguration?.settings?.useDashboardTags !== false;

    if (Array.isArray(tags) && tags.length > 0 && useKpiTags) {
      return (
        <CustomBadgeContainer>
          {tags.map((item, index) => {
            if (typeof item !== "string")
              return (
                <CustomBadge key={index} className={"mx-1 mb-1"} icon={faTag} badgeText={`${item.type}: ${item.value}`}/>
              );
          })}
        </CustomBadgeContainer>
      );
    }

    // TODO: Should we show this when there are dashboard tags applied only?
    if (useDashboardTags) {
      return (
        <div className={"m-1 p-2"}>
          Dashboard Tags Applied
        </div>
      );
    }
  };

  return (
    <div className="content-container content-card-1">
      <div className="px-2 content-block-header-inverse title-text-header-2">
        {getTitleBar()}
      </div>
      <div>
        {getChartBody()}
      </div>
      {getTagBadges()}
    </div>
  );
}

VanityMetricContainer.propTypes = {
  chart: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func,
  chartHelpComponent: PropTypes.func,
  settingsHelpComponent: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
  className: PropTypes.string,
};

export default VanityMetricContainer;