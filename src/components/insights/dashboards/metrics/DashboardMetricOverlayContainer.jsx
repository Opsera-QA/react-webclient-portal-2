import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import KpiSettingsForm from "components/insights/marketplace/charts/KpiSettingsForm";
import Model from "core/data_model/model";
import kpiConfigurationMetadata from "components/insights/marketplace/charts/kpi-configuration-metadata";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import {metricHelpers} from "components/insights/metric.helpers";
import GenericChartSettingsHelpDocumentation
  from "components/common/help/documentation/insights/charts/GenericChartSettingsHelpDocumentation";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";
import DashboardMetricEditorPanelContainer
  from "components/common/panels/detail_panel_container/dashboard_metrics/DashboardMetricEditorPanelContainer";
import DashboardMetricTabPanel from "components/insights/dashboards/metrics/DashboardMetricTabPanel";
import SdlcDurationByStageMetricsEditorPanel
  from "components/insights/charts/sdlc/bar_chart/duration_by_stage/SdlcDurationByStageMetricsEditorPanel";
import SalesforceDurationByStageMetricsEditorPanel
  from "../../charts/sfdc/bar_chart/duration_by_stage/SalesforceDurationByStageMetricsEditorPanel";
import OpseraBuildAndDeploymentStatisticsEditorPanel
  from "../../charts/opsera/build_and_deploy_statistics/OpseraBuildAndDeploymentStatisticsEditorPanel";
import FirstPassYieldMetricsEditorPanel from "../../charts/first_pass/FirstPassYieldMetricsEditorPanel";
import AutomationPercentageMetricEditorPanel
  from "../../charts/automation_percentage/AutomationPercentageMetricEditorPanel";
import SonarRatingMetricsEditorPanel from "../../charts/sonar/sonar_ratings/SonarRatingMetricsEditorPanel";
import AllGithubActionsDataBlockEditorPanel from "../../charts/github_actions/data_blocks/AllGithubActions/AllGithubActionsDataBlockEditorPanel";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";
import LeadTimeAndReleaseTracebilityEditorPanel
  from "../../charts/github_actions/data_blocks/LeadTimeAndReleaseTracebilityEditorPanel";
import ServiceNowMeanTimeToResolutionEditorPanel
  from "../../charts/servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionEditorPanel";
import GitlabDeploymentFrequencyEditorPanel from "components/insights/charts/gitlab/deployment_frequency/GitlabDeploymentFrequencyEditorPanel";
import QuickDeployStatisticsEditorPanel
  from "../../charts/opsera/quick_deploy_statistics/QuickDeployStatisticsEditorPanel";
import SalesforceComponentsEditorPanel
  from "../../charts/sfdc/data_block_chart/Salesforce_components/SalesforceComponentsEditorPanel";
import ApigeeReportsEditorPanel from "../../charts/apigee/reports/ApigeeReportsEditorPanel";
import ApigeeSummaryEditorPanel from "../../charts/apigee/summary/ApigeeSummaryEditorPanel";
import BoomiBarChartEditorPanel from "components/insights/charts/boomi/bar_chart/BoomiBarChartEditorPanel";
import GitlabLeadTimeEditorPanel from "../../charts/gitlab/line_chart/lead_time/GitlabLeadTimeEditorPanel";
import GithubActionsWorkflowEditorPanel
  from "../../charts/github_actions/data_blocks/GithubActionsWorkflow/GithubActionsWorkflowEditorPanel";
import JiraMeanTimeToResolutionEditorPanel
  from "../../charts/jira/bar_chart/mean_time_to_resolution/JiraMeanTimeToResolutionEditorPanel";
import JiraChangeFailureRateEditorPanel from "components/insights/charts/jira/line_chart/change_failure_rate/JiraChangeFailureRateEditorPanel";
  // from "../../charts/jira/line_chart/change_failure_rate/JiraChangeFailureRateEditorPanel";

// TODO: combine with chart settings overlay?
function DashboardMetricOverlayContainer(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    closePanel,
    loadData,
    setKpis,
    settingsHelpComponent,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [metricModel, setMetricModel] = useState(undefined);
  const [metricFilterModel, setMetricFilterModel] = useState(undefined);
  const [unpackedFilterData, setUnpackedFilterData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setUnpackedFilterData(undefined);
    setMetricModel(undefined);

    if (kpiConfiguration) {
      initializeData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [kpiConfiguration]);

  const initializeData = async () => {
    setMetricModel({...new Model(kpiConfiguration, kpiConfigurationMetadata, false)});
    setUnpackedFilterData(metricHelpers.unpackMetricFilterData(kpiConfiguration?.filters));
  };

  const closeSettingsPanel = () => {
    if (closePanel) {
      closePanel();
    }
  };

  // TODO: Once legacy KPI Settings panel is removed, this can be moved into the Dashboard Metric Button Container
  const saveKpiSettings = async () => {
    const packedFilters = metricHelpers.packFilterData(metricFilterModel?.getPersistData());
    metricModel?.setData("filters", packedFilters);
    await dashboardMetricActions.updateDashboardKpiV2(
      getAccessToken,
      cancelTokenSource,
      dashboardData?.getData("_id"),
      metricModel,
    );

    // TODO: This is not very ideal, we need to resolve the refresh issues
    setKpiConfiguration({ ...metricModel?.getPersistData() });
    dashboardData.getData("configuration")[index] = metricModel?.getPersistData();
  };

  // TODO: Move this into a separate component after we can remove KpiSettingsForm
  const getMetricEditorPanel = () => {
    switch (kpiConfiguration?.kpi_identifier) {
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS:
        return (
          <SdlcDurationByStageMetricsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SALESFORCE_DURATION_BY_STAGE:
        return (
          <SalesforceDurationByStageMetricsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.BUILD_DEPLOYMENT_STATISTICS:
        return (
          <OpseraBuildAndDeploymentStatisticsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.AUTOMATION_PERCENTAGE:
        return (
          <AutomationPercentageMetricEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.FIRST_PASS_YIELD:
        return (
          <FirstPassYieldMetricsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SONAR_RATINGS:
        return (
          <SonarRatingMetricsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.ALL_GITHUB_ACTIONS_DATA_BLOCK:
        return (
          <AllGithubActionsDataBlockEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.LEAD_TIME_AND_RELEASE_TRACEABILITY:
        return (
          <LeadTimeAndReleaseTracebilityEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SERVICE_NOW_MEAN_TIME_TO_RESOLUTION:
        return (
          <ServiceNowMeanTimeToResolutionEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.GITLAB_DEPLOYMENT_FREQUENCY:
        return (
          <GitlabDeploymentFrequencyEditorPanel
          metricModel={metricModel}
          metricFilterModel={metricFilterModel}
          setMetricFilterModel={setMetricFilterModel}
          unpackedFilterData={unpackedFilterData}
          kpiConfiguration={kpiConfiguration}
        />);
      case kpiIdentifierConstants.KPI_IDENTIFIERS.GITLAB_LEAD_TIME:
        return (
            <GitlabLeadTimeEditorPanel
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
                unpackedFilterData={unpackedFilterData}
                kpiConfiguration={kpiConfiguration}
            />);
      case kpiIdentifierConstants.KPI_IDENTIFIERS.QUICK_DEPLOY_STATISTICS:
        return (
            <QuickDeployStatisticsEditorPanel
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
                unpackedFilterData={unpackedFilterData}
                kpiConfiguration={kpiConfiguration}
            />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SALESFORCE_COMPONENTS_CHART:
        return (
            <SalesforceComponentsEditorPanel
                metricModel={metricModel}
                metricFilterModel={metricFilterModel}
                setMetricFilterModel={setMetricFilterModel}
                unpackedFilterData={unpackedFilterData}
                kpiConfiguration={kpiConfiguration}
            />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.APIGEE_REPORT:
        return (
          <ApigeeReportsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.APIGEE_SUMMARY:
        return (
          <ApigeeSummaryEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.BOOMI_PIPELINE_EXECUTIONS:
        return(
          <BoomiBarChartEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.JIRA_MEAN_TIME_TO_RESOLUTION:
        return(
          <JiraMeanTimeToResolutionEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.JIRA_CHANGE_FAILURE_RATE:
        return(
          <JiraChangeFailureRateEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
      case kpiIdentifierConstants.KPI_IDENTIFIERS.GITHUB_ACTIONS_WORKFLOW:
        return(
          <GithubActionsWorkflowEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
            kpiConfiguration={kpiConfiguration}
          />
        );
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    if (settingsHelpComponent) {
      settingsHelpComponent(() => setHelpIsShown(false));
    }

    return (
      <GenericChartSettingsHelpDocumentation
        closeHelpPanel={() => setHelpIsShown(false)}
      />
    );
  };

  // TODO: This is temporary for compatibility reasons.
  if (getMetricEditorPanel() == null) {
    return (
      <KpiSettingsForm
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        settingsHelpComponent={settingsHelpComponent}
        dashboardData={dashboardData}
        index={index}
        loadChart={loadData}
        setKpis={setKpis}
        closePanel={closePanel}
      />
    );
  }

  if (metricModel == null) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Settings Panel"}
      />
    );
  }
  
  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      <DashboardMetricEditorPanelContainer
        saveDataFunction={saveKpiSettings}
        closePanelFunction={closeSettingsPanel}
        metricModel={metricModel}
        setKpis={setKpis}
        metricIndex={index}
        dashboardModel={dashboardData}
        setKpiConfiguration={setKpiConfiguration}
        className={"px-3 pb-3"}
      >
        <DashboardMetricTabPanel
          metricModel={metricModel}
          setMetricModel={setMetricModel}
          setKpiConfiguration={setKpiConfiguration}
          metricEditorPanel={getMetricEditorPanel()}
        />
      </DashboardMetricEditorPanelContainer>
    </OverlayPanelBodyContainer>
  );
}

DashboardMetricOverlayContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  closePanel: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadData: PropTypes.func,
  settingsHelpComponent: PropTypes.object,
};

export default DashboardMetricOverlayContainer;
