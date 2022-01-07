import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./salesforceDurationByStageBarChartConfigs";
import { defaultConfig } from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import { DialogToastContext } from "contexts/DialogToastContext";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import SalesforceDurationByStageActionableInsightsOverlay from "./actionable_insights/SalesforceDurationByStageActionableInsightOverlay";

function SalesforceDurationByStageBarChartBase({ metric, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const onNodeSelect = (node) => {
    let title = node.serieId;
    toastContext.showOverlayPanel(
      <SalesforceDurationByStageActionableInsightsOverlay
        title={title}
        actionableInsightsQueryData={node}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  return (
    <div style={{ height: "150px" }}>
      <ResponsiveLine
        data={metric}
        {...defaultConfig("Duration (min)", "Date", false, true, "wholeNumbers", "monthDate")}
        {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
        enableGridX={false}
        enableGridY={false}
        tooltip={(node) => (
          <ChartTooltip
            titles={["Date Range", "Average Duration", "Number of Executions"]}
            values={[
              node.point.data.range,
              String(node.point.data.yFormatted) + " minutes",
              node.point.data.count + " runs",
            ]}
          />
        )}
        onClick={(node) => onNodeSelect(node)}
      />
    </div>
  );
}

SalesforceDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SalesforceDurationByStageBarChartBase;
