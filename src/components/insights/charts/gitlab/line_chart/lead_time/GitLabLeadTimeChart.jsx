import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import { GITLAB_LEADTIME_CONSTANTS as constants } from "./GitlabLeadTime_kpi_datapoint_identifier";
import axios from "axios";
import GitlabLeadTimeHelpDocumentation from "../../../../../common/help/documentation/insights/charts/GitlabLeadTimeHelpDocumentation";
import GitlabLeadTimeScatterPlotContainer from "./GitlabLeadTimeScatterPlotContainer";
import GitlabLeadTimeDataBlock from "./GitlabLeadTimeDataBlock";
import {
  getDeploymentStageFromKpiConfiguration, getReverseTrend, getReverseTrendIcon, getTimeDisplay,
} from "../../../charts-helpers";
import GitlabLeadTimeTrendDataBlock from "./GitlabLeadTimeTrendDataBlock";
import gitlabAction from "../../gitlab.action";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function GitLabLeadTimeChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [meanCommitData, setMeanCommitData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [leadtimeDataPoint, setLeadTimeDataPoint] =
      useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await loadDataPoints(cancelSource);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;

      const response = await gitlabAction.gitlabLeadTimeForChange(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
      );
      // TODO This will be enabled after fixing the formula
      // const response2 = await gitlabAction.gitlabAverageCommitTimeToMerge(
      //   getAccessToken,
      //   cancelSource,
      //   kpiConfiguration,
      //   dashboardTags,
      //   dashboardOrgs,
      // );

      const metrics = response?.data?.data?.gitlabLeadTimeForChange?.data;
      // const meanCommitTimeDataObject =
      //   response2?.data?.data[0]?.gitlabAverageCommitTimeToMerge?.data || {};

      if (
        isMounted?.current === true &&
        metrics?.statisticsData?.totalDeployments
      ) {
        setMetricData(metrics?.statisticsData);
        setChartData(metrics?.chartData);
        // setMeanCommitData(meanCommitTimeDataObject);
      } else {
        setMetricData({});
        setChartData([]);
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

  // const loadDataPoints = async () => {
  //   const dataPoints = kpiConfiguration?.dataPoints;
  //   const dataPoint = dataPointHelpers.getDataPoint(
  //     dataPoints,
  //     constants.SUPPORTED_DATA_POINT_IDENTIFIERS
  //       .LEADTIME_DATA_POINT,
  //   );
  //   setLeadTimeDataPoint(dataPoint);
  // };

  const getChartBody = () => {
    if (!metricData?.totalDeployments || !chartData?.commits?.length) {
      return null;
    }

    const recentStageDate = new Date(
      metricData?.lastDeploymentTime,
    ).toLocaleDateString();
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
    const dataBlockTextForDeployment = {
      current: selectedDeploymentStages
        ? "Total Deployments"
        : "Total Stages Run",
      previous: selectedDeploymentStages ? "Prev Deployments: " : "Prev Runs: ",
    };
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "450px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <Row
            xl={4}
            lg={4}
            md={4}
            className={"mb-2 ml-2 d-flex justify-content-center"}
          >
            <Col md={12}>
              <GitlabLeadTimeTrendDataBlock
                value={getTimeDisplay(metricData?.totalAverageLeadTime)[0]}
                prevValue={`${getTimeDisplay(metricData?.previousTotalAverageLeadTime)[0]}`}
                trend={getReverseTrend(
                  metricData?.totalAverageLeadTime,
                  metricData?.previousTotalAverageLeadTime,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Average LTFC"}
                bottomText={"Prev LTFC: "}
                toolTipText={getTimeDisplay(metricData?.totalAverageLeadTime)[1]}
              />
            </Col>
            <Col md={12}>
              <GitlabLeadTimeTrendDataBlock
                  value={getTimeDisplay(metricData?.totalMedianTime)[0]}
                  prevValue={`${getTimeDisplay(metricData?.previousTotalMedianTime)[0]}`}
                  trend={getReverseTrend(
                      metricData?.totalMedianTime,
                      metricData?.previousTotalMedianTime,
                  )}
                  getTrendIcon={getReverseTrendIcon}
                  topText={"Median LTFC"}
                  bottomText={"Prev Median: "}
                  toolTipText={getTimeDisplay(metricData?.totalMedianTime)[1]}
              />
            </Col>
            {/*TODO This will be enabled after fixing the formula*/}
            {/*<Col md={12}>*/}
            {/*  <GitlabLeadTimeTrendDataBlock*/}
            {/*    value={getTimeDisplay(meanCommitData?.currentAvgCommitToMergeTime || 0)[0]}*/}
            {/*    prevValue={`${getTimeDisplay(meanCommitData?.previousAvgCommitToMergeTime || 0)[0]}`}*/}
            {/*    trend={getReverseTrend(*/}
            {/*      meanCommitData?.currentAvgCommitToMergeTime,*/}
            {/*      meanCommitData?.previousAvgCommitToMergeTime,*/}
            {/*    )}*/}
            {/*    getTrendIcon={getReverseTrendIcon}*/}
            {/*    topText={`Average Merge Time`}*/}
            {/*    bottomText={`Prev Merge Time: `}*/}
            {/*    toolTipText={getTimeDisplay(meanCommitData?.currentAvgCommitToMergeTime || 0)[1]}*/}
            {/*  />*/}
            {/*</Col>*/}
            <Col md={12}>
              <GitlabLeadTimeDataBlock
                value={metricData?.totalDeployments}
                prevValue={metricData?.previousTotalDeployments}
                topText={`${dataBlockTextForDeployment.current}`}
                bottomText={`${dataBlockTextForDeployment.previous}`}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={"mr-4"}>
                <b>Selected Stages:</b> {selectedDeploymentStages}
                <div className="row" />
                <b>Recent Stage:</b> {metricData?.lastDeploymentStage || "NA"}
                <div className="row" />
                <b>Date: </b>
                {recentStageDate}
              </div>
            </div>
          </Col>
          <Col className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabLeadTimeScatterPlotContainer chartData={chartData} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Gitlab Lead Time"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <GitlabLeadTimeHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
    </div>
  );
}

GitLabLeadTimeChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitLabLeadTimeChart;
