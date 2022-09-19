import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import { Container, Col, Row } from "react-bootstrap";
import { ResponsiveLine } from '@nivo/line';
import { defaultConfig } from 'components/insights/charts/charts-views';
import _ from "lodash";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import config from "./JiraChageFailureRateChartConfig";
import MetricScoreText from "components/common/metrics/score/MetricScoreText";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import ThreeLineDataBlockBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import { goalSuccessColor } from "../../../charts-views";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import {getResultFromKpiConfiguration} from "../../../charts-helpers";

function JiraChangeFailureRateDataBlockContainer({ metricData, chartData, goalsData, kpiConfiguration, dataPoint, trend }) {
  
  const [maxGoalsValue, setMaxGoalsValue] = useState(goalsData);
  const [jiraChangeTypes, setJiraChangeTypes] = useState([]);

  useEffect(() => {
    let dataHigh = {x: "", y: 0};
    dataHigh = _.maxBy(chartData, 'y');
    const high = dataHigh?.y > goalsData ? dataHigh?.y : goalsData;
    setMaxGoalsValue(Math.ceil(high));
    setJiraChangeTypes(getResultFromKpiConfiguration(kpiConfiguration, 'jira-change-types'));
  }, [goalsData, chartData]);

  let cfrChartData = [
    {
      "id": "cfr",
      "data": chartData
    }  
  ];
  const getReverseIcon = (severity) => {
    switch (severity) {
      case "red":
        return faArrowCircleDown;
      case "green":
        return faArrowCircleUp;
      case "light-gray-text-secondary":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getLeftDataBlock = () => {
    return (
      <DataBlockBoxContainer showBorder={true}>
        <ThreeLineDataBlockBase
            className={`green p-2`}
            topText={"Change Failure Rate"}
            icon={getReverseIcon(trend)}
            bottomText={`Prev Failure Rate: ${metricData?.prevChangeFailureRate !== 'NaN'? metricData?.prevChangeFailureRate +` %` :'NA'}`}
            middleText={
              <MetricScoreText
                  score={`${metricData?.changeFailureRate} %`}
                  dataPoint={dataPoint}
                  className={"metric-block-content-text"}
              />}
            dataPoint={dataPoint}
        />
      </DataBlockBoxContainer>
    );
  };
  const getLegends = () => {
    if(!jiraChangeTypes || (Array.isArray(jiraChangeTypes) && jiraChangeTypes.length == 0)) {
      return (
        <>
          <div className="row"/>
          Total Selected Changes<b> ({jiraChangeTypes?.length || 0})</b>
          <div className="row"/>
          Please select a change type to get started
        </>
      );
    }

    return (
      <>
        Goal<b> ({goalsData})</b>
        <IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />
        <div className="row"/>
        Change Failures{" "}
        <IconBase icon={faSquare} iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1} iconSize={"lg"} />
        <div className="row"/>
        Total Changes<b> ({metricData.total})</b>
        <div className="row"/>
        Total Failures in Changes<b> ({metricData.totalFailure})</b>
      </>
    );
  };

  const getTrendChart = () => {
    return(
      <div className="new-chart p-0" style={{height: "150px"}}>
        <div style={{ float: "right", fontSize: "10px", marginRight: "5px" }}>
          {getLegends()}
          </div>
        <ResponsiveLine
          data={cfrChartData}
          {...defaultConfig("", "Date", 
                false, true, "numbers", "monthDate2")}
          {...config()}
          yScale={{ type: 'linear', min: '0', max: maxGoalsValue, stacked: false, reverse: false }}
          axisLeft={{            
            tickValues: [0, maxGoalsValue],
            legend: 'Failures',
            legendOffset: -38,
            legendPosition: 'middle'
          }}
          tooltip={(node) => (            
            <ChartTooltip
              titles={["Date Range", "Total Changes", "Failures"]}
              values={[node.point.data.range, node.point.data.total, node.point.data.y]}
            />
          )}
          markers={[
            {
                axis: 'y',
                value: goalsData,
                lineStyle: { stroke: goalSuccessColor, strokeWidth: 2 },
                legend: '',
            }            
          ]}
        />
      </div>
    );
  };

  return (
    <HorizontalDataBlocksContainer
      title={"Change Failure Rate"}
    >
      <Container>
        <Row className="align-items-center">
          <Col sm={3} className={"p-2"}>
            {getLeftDataBlock()}
          </Col>
          <Col sm={9} className={"p-2"}>
            {getTrendChart()}
          </Col>
        </Row>
      </Container>
    </HorizontalDataBlocksContainer>
  );
}

JiraChangeFailureRateDataBlockContainer.propTypes = {
  metricData: PropTypes.object,
  chartData: PropTypes.array,
  goalsData: PropTypes.number,
  kpiConfiguration: PropTypes.object,
  dataPoint: PropTypes.object,
  trend:PropTypes.string
};

export default JiraChangeFailureRateDataBlockContainer;
