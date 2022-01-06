import React, { useState, useEffect, useContext, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import config from "./ServiceNowMeanTimeToAcknowledgeConfigs.js";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColorByData, assignStandardColors, adjustBarWidth } from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import { neutralColor, goalSuccessColor, mainColor } from "../../../../charts/charts-views";
import {
  METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
  METRIC_THEME_CHART_PALETTE_COLORS,
} from "components/common/helpers/metrics/metricTheme.helpers";
// import MeanTimeToAcknowledgeSummaryPanelMetadata from "components/insights/charts/servicenow/bar_chart/mean_time_to_Acknowledge/serviceNowMeanTimeToAcknowledgeSummaryPanelMetadata";
// import Model from "../../../../../../core/data_model/model";
// import ChartDetailsOverlay from "../../../detail_overlay/ChartDetailsOverlay";
// import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowMeanTimeToAcknowledgeBarChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  // const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [overallMean, setOverallMean] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);

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
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value,
        goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type == "goals")]?.value,
        response = await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "serviceNowMTTA",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs
        ),
        dataObject = response?.data?.data[0]?.serviceNowMTTA?.data[0]?.docs,
        overallMeanValue = response?.data?.data[0]?.serviceNowMTTA?.data[0]?.overallMttaHours;

      setGoalsData(goals);
      assignStandardColors(dataObject, true);
      if (dataObject && dataObject.length) {
        dataObject.forEach((data) => (data.Count = data?.number_of_incidents));
      }

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setOverallMean(overallMeanValue);
      }

      if (!dataObject) {
        setMetrics([]);
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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    const getMaxValue = (data) => {
      let countsMax = Math.max.apply(
        Math,
        data.map(function (o) {
          return o.count;
        })
      );
      let mttaMax = Math.max.apply(
        Math,
        data.map(function (o) {
          return o["MTTA"];
        })
      );
      let max = Math.ceil(Math.max(countsMax, mttaMax));
      return max;
    };

    // const onRowSelect = (data) => {
    // const chartModel = new Model(
    //   { ...MeanTimeToAcknowledgeSummaryPanelMetadata.newObjectFields },
    //   MeanTimeToAcknowledgeSummaryPanelMetadata,
    //   false
    // );
    // toastContext.showOverlayPanel(
    //   <ChartDetailsOverlay
    //     dashboardData={dashboardData}
    //     kpiConfiguration={kpiConfiguration}
    //     chartModel={chartModel}
    //     kpiIdentifier={"mean-time-to-restore"}
    //     currentDate={data.data._id}
    //   />
    // );
    // };

    return (
      <div className="new-chart mb-3 pointer font-inter-light-400 dark-gray-text-primary" style={{ height: "300px" }}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          Average MTTA <b>({overallMean} Hours)</b> <FontAwesomeIcon icon={faMinus} color={neutralColor} size="lg" />
          <br></br>
          Goal<b> ({goalsData?.mttaAvgMeanTimeGoal} Hours)</b>{" "}
          <FontAwesomeIcon icon={faMinus} color={goalSuccessColor} size="lg" />
          <br></br>
          MTTA{" "}
          <FontAwesomeIcon icon={faSquare} color={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} size="lg" />
        </div>
        <ResponsiveBar
          data={metrics}
          {...defaultConfig("Mean Time to Acknowledge (in hours)", "Date", false, false, "wholeNumbers", "monthDate2")}
          {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY, getMaxValue(metrics))}
          {...adjustBarWidth(metrics)}
          // onClick={(data) => onRowSelect(data)}
          tooltip={({ indexValue, value, data, color }) => (
            <ChartTooltip
              titles={["Date", "Mean Time to Acknowledge", "Number of Incidents"]}
              values={[new Date(indexValue).toDateString(), `${value} hours`, data.Count]}
              style={false}
              // color={color}
            />
          )}
          markers={[
            {
              axis: "y",
              value: overallMean ? overallMean : 0,
              lineStyle: { stroke: neutralColor, strokeWidth: 2 },
              legend: "",
            },
            {
              axis: "y",
              value: goalsData?.mttaAvgMeanTimeGoal ? goalsData?.mttaAvgMeanTimeGoal : 0,
              lineStyle: { stroke: goalSuccessColor, strokeWidth: 2 },
              legend: "",
            },
          ]}
        />
      </div>
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
      />
      <ModalLogs
        header="Mean Time to Acknowledge"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

ServiceNowMeanTimeToAcknowledgeBarChart.propTypes = {
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

export default ServiceNowMeanTimeToAcknowledgeBarChart;
