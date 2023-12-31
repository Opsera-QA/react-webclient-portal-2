import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import config from "./BoomiBarChartConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import { BOOMI_CONSTANTS as dataPointConstants } from "./Boomi_datapoint_identifiers";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers.js";
import DataPointVisibilityWrapper from "components/common/metrics/data_points/DataPointVisibilityWrapper.jsx";
import ChartTooltip from "../../ChartTooltip.jsx";
import {
  adjustBarWidth,
  assignStandardColors, assignStandardLineColors,
  defaultConfig,
  spaceOutServiceNowCountBySeverityLegend,
} from "../../charts-views.js";
import BoomiSuccessPercentageDataBlock from "../data_blocks/BoomiSuccessPercentageDataBlock.jsx";
import BoomiFrequencyDataBlock from "../data_blocks/BoomiFrequencyDataBlock.jsx";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { ResponsiveLine } from "@nivo/line";
import chartsActions from "../../charts-actions";
import BoomiActionableTabOverlay from "../actionable_insights/BoomiActionableTabOverlay";
import AutomationPercentageChartHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/AutomationPercentageChartHelpDocumentation";
import BoomiChartHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/BoomiChartHelpDocumentation";
import BoomiAverageDurationDataBlock from "../data_blocks/BoomiAverageDurationDataBlock";

function BoomiBarChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const [goalsData, setGoalsData] = useState(undefined);
  const toastContext = useContext(DialogToastContext);
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;
      const dashboardTags =
          dashboardData?.data?.filters[
            dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
          ]?.value,
        goals =
          kpiConfiguration?.filters[
            kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")
          ]?.value;
      setGoalsData(goals);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "boomiChartandBlocksData", kpiConfiguration, dashboardTags, null, null, dashboardOrgs);
        let dataObject = response?.data?.data[0]?.ChartData?.boomiDeploymentLineChartFrequency?.data,
        datablock = response?.data?.data[0]?.DataBlockStats?.boomiTrendBlockStatistics?.data[0]?.statisticsData;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      spaceOutServiceNowCountBySeverityLegend(dataObject);
      assignStandardLineColors(dataObject, true);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(datablock);
        setGoalsData(goals);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


  const onRowSelect = () => {
    toastContext.showOverlayPanel(
        <BoomiActionableTabOverlay
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
        />
    );
  };
 

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    const dataPoints = kpiConfiguration?.dataPoints;
    const boomiFrequencyPercentageDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
    );
    
    const boomiSuccessPercentageDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .BOOMI_SUCCESS_PERCENTAGE_DATA_POINT,
    );

    const getIcon = (severity) => {
      switch (severity) {
        case "green":
          return faArrowCircleUp;
        case "red":
          return faArrowCircleDown;
        case "neutral":
          return faMinusCircle;
        default:
          break;
      }
    };
  
    const getIconColor = (severity) => {
      switch (severity) {
        case "red":
          return "red";
        case "green":
          return "green";
        case "neutral":
          return "light-gray-text-secondary";
        case "-":
          return "black";
        default:
          break;
      }
    };

    const getDataBlocks = () =>{
      return (<><Row className={'pb-1'}>
        <Col>
          <DataPointVisibilityWrapper dataPoint={boomiSuccessPercentageDataPoint} >
            <BoomiSuccessPercentageDataBlock
              data={dataBlockValues?.SuccessPercentage}
              dataPoint={boomiSuccessPercentageDataPoint}
              lastScore={ dataBlockValues?.prevSuccessPercentage}
              icon={getIcon(dataBlockValues?.successPercentageTrend?.trend)}
              className={getIconColor(dataBlockValues?.successPercentageTrend?.trend)}
            />
          </DataPointVisibilityWrapper>
        </Col>
      </Row><Row className={'pb-1 pt-1'}>
        <Col>
          <DataPointVisibilityWrapper dataPoint={boomiFrequencyPercentageDataPoint} >
            <BoomiFrequencyDataBlock
              data={dataBlockValues?.freq}
              dataPoint={boomiFrequencyPercentageDataPoint}
              lastScore={ dataBlockValues?.prevFreq}
              icon={getIcon(dataBlockValues?.frequencyTrend?.trend)}
              className={getIconColor(dataBlockValues?.frequencyTrend?.trend)}
            />
          </DataPointVisibilityWrapper>
        </Col>
      </Row><Row className={'pb-1 pt-1'}>
        <Col>
          <DataPointVisibilityWrapper dataPoint={boomiFrequencyPercentageDataPoint} >
            <BoomiAverageDurationDataBlock
                data={dataBlockValues?.totalDeployments}
                dataPoint={boomiFrequencyPercentageDataPoint}
                lastScore={ dataBlockValues?.prevDeployments}
                icon={getIcon(dataBlockValues?.deploymentsTrend?.trend)}
                className={getIconColor(dataBlockValues?.deploymentsTrend?.trend)}
            />
          </DataPointVisibilityWrapper>
        </Col>
      </Row></>);
    };
    const getChart = () =>{
      return(<Row>
        <Col md={12} sm={12} lg={12} >
          <div className="chart" style={{ height: "354px" }} >
            <ResponsiveLine
              data={metrics}
              {...defaultConfig(
                "Count",
                "Date",
                false,
                false,
                "wholeNumbers",
                "monthDate2",
              )}
              {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
              {...adjustBarWidth(metrics)}
              tooltip={({point, color}) => <ChartTooltip
                  titles = {["Date", "Deployments"]}
                  values = {[String(point.data.xFormatted), point.data.y]}
                  color = {color} />}
            />
          </div>
        </Col>
      </Row>);
    };

    
    return (
      <>
        <div className="new-chart m-3">
          <Row>
            <Col md={3} sm={6} lg={3}>{getDataBlocks()}</Col>
            <Col md={9} sm={6} lg={9}>{getChart()}</Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <>
      <ChartContainer
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
        launchActionableInsightsFunction={onRowSelect}
        chartHelpComponent={(closeHelpPanel) => (
            <BoomiChartHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Mean Time to Resolution"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

BoomiBarChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  bars: PropTypes.any,
  xScale: PropTypes.any,
  yScale: PropTypes.any,
  showSettingsToggle: PropTypes.bool,
};

export default BoomiBarChart;