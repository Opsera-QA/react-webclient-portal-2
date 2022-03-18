import React, {useState, useEffect, useContext, useRef} from "react";
import MetricContentDataBlockBase from "../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import DataBlockBoxContainer from "../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ChartContainer from "../../../../common/panels/insights/charts/ChartContainer";
import chartsActions from "components/insights/charts/charts-actions";
import PropTypes from "prop-types";
import ModalLogs from "../../../../common/modal/modalLogs";
import {dataPointHelpers} from "../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import ThreeLineNumberDataBlock from "../../../../common/metrics/number/ThreeLineNumberDataBlock";
import H4MetricSubHeader from "components/common/fields/subheader/metric/H4MetricSubHeader";
import LeadTimeAndReleaseDurationActionableInsightOverlay from "../actionable_insights/LeadTimeAndReleaseDurationActionableInsightOverlay";

function LeadTimeAndReleaseTraceabilityDataBlock({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
  showViewDetailsToggle}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      // await loadDataPoints(cancelSource);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "githubActionsTraceability",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const metrics = response?.data?.data[0]?.traceability?.data;

      if (isMounted?.current === true && Array.isArray(metrics)) {
        setMetrics(metrics[0]);
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

  const viewDetailsComponent = () => {
    return (
      <LeadTimeAndReleaseDurationActionableInsightOverlay
        title={"Lead time and Release Duration"}
        actionableInsightsQueryData={null}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };

  const getChartBody = () => {
    const durationDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-duration-data-point");
    const frequencyDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-frequency-data-point");
    const timeToFirstCommitDataPoint = dataPointHelpers.getDataPoint(kpiConfiguration?.dataPoints,
        "lead-time-and-release-traceability-time-to-first-commit-data-point");
    return (
      <>
        <div className="new-chart m-3 p-0 all-github-actions-data-block" style={{ minHeight: "300px"}}>
          <Row>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={durationDataPoint}
                      numberData={5}
                      supportingText={"days"}
                      middleText={"Lead Time"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={frequencyDataPoint}
                      numberData={2}
                      supportingText={"deployments/day"}
                      middleText={"Frequency"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <DataBlockBoxContainer showBorder={true}>
                  <div className={"p-3"}>
                    <ThreeLineNumberDataBlock
                      dataPoint={timeToFirstCommitDataPoint}
                      numberData={10}
                      supportingText={"days"}
                      middleText={"Average Time to First Commit"}
                    />
                  </div>
                </DataBlockBoxContainer>
              </div>
            </Col>
          </Row>
          <Row className={"mt-5"}>
            <Col xs={12}>
              <H4MetricSubHeader subheaderText={'Top Applications'} />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"High Lead Time"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"High Deployment Frequency"}
                  content={"grosmont"}
                />
              </DataBlockBoxContainer>
            </Col>
          </Row>
          <Row style={{marginTop:'1rem'}}>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Minimal/No activity in last few weeks"}
                  content={"oswestry"}
                />
              </DataBlockBoxContainer>
            </Col>
            <Col md={6}>
              <DataBlockBoxContainer showBorder={true}>
                <MetricContentDataBlockBase
                  title={"Highest Commits"}
                  content={""}
                />
              </DataBlockBoxContainer>
            </Col>
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
        dashboardData={dashboardData}
        index={index}
        setKpis={setKpis}
        isLoading={isLoading}
        showSettingsToggle={showSettingsToggle}
        showViewDetailsToggle={showViewDetailsToggle}
        viewDetailsComponent={viewDetailsComponent()}
      />
      <ModalLogs
        header="Github Actions Statistics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </>
  );
}

LeadTimeAndReleaseTraceabilityDataBlock.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
  showViewDetailsToggle: PropTypes.bool
};

export default LeadTimeAndReleaseTraceabilityDataBlock;