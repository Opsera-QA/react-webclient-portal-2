import React from "react";
import PropTypes from "prop-types";
import DataBlockAndChartContainer from "components/common/metrics/container/DataBlockAndChartContainer";
import SdlcDurationByStageBarChartBase from "../../SdlcDurationByStageBarChartBase";
import SdlcDurationByStageDataBlockBase from "../../SdlcDurationByStageDataBlockBase";

function SdlcQualityScanDurationMetric({ kpiConfiguration, dashboardData, meanData, countData, goalsData, metric }) {
  const getDataBlock = () => {
    return (
      <SdlcDurationByStageDataBlockBase
        topText={metric[0]?.id}
        meanData={meanData}
        countData={countData}
        goalsData={goalsData}
      />
    );
  };

  const getChart = () => {
    return (
      <SdlcDurationByStageBarChartBase
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
        metric={metric}
      />
    );
  };

  return <DataBlockAndChartContainer dataBlock={getDataBlock()} chart={getChart()} />;
}

SdlcQualityScanDurationMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
  metric: PropTypes.array,
};

export default SdlcQualityScanDurationMetric;
