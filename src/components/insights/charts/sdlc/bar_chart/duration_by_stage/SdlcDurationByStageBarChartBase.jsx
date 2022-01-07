import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./sdlcDurationByStageBarChartConfigs";
import { defaultConfig } from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import { DialogToastContext } from "contexts/DialogToastContext";
import SdlcDurationByStageActionableInsightOverlay from "./actionable_insights/SdlcDurationByStageActionableInsightOverlay";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
function SdlcDurationByStageBarChartBase({ metric, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const onNodeSelect = (node) => {
    let title = node.serieId;
    toastContext.showOverlayPanel(
      <SdlcDurationByStageActionableInsightOverlay
        title={title}
        actionableInsightsQueryData={node}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };
  return (
    <ResponsiveLine
      data={metric}
      {...defaultConfig("Duration (min)", "Date", false, true, "wholeNumbers", "monthDate")}
      {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
      enableGridX={false}
      enableGridY={false}
      tooltip={(node) => (
        <ChartTooltip
          titles={["Date Range", "Average Duration", "Number of Executions"]}
          values={[node.point.data.range, String(node.point.data.yFormatted) + " minutes", node.point.data.count]}
        />
      )}
      onClick={(node) => onNodeSelect(node)}
    />
  );
}

SdlcDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SdlcDurationByStageBarChartBase;
