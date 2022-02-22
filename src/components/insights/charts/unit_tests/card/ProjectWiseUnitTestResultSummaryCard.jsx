import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import InsightsCardContainerBase from "components/common/card_containers/InsightsCardContainerBase";
import InsightHighlightFieldWithTrendIcon from "components/common/fields/text/InsightHighlightFieldWithTrendIcon";
import projectWiseUnitTestResultsMetadata from "../project_wise_results/project-wise-unit-test-results-metadata.js";
import { ResponsivePie } from "@nivo/pie";
import {
  defaultConfig,
  getColorByData,
} from "components/insights/charts/charts-views";
import config from "./projectWiseUnitTestConfig";
import {
  METRIC_THEME_CHART_PALETTE_COLORS
} from "components/common/helpers/metrics/metricTheme.helpers";
import MetricPipelineInfoSubheader from "components/common/metrics/subheaders/MetricPipelineInfoSubheader";
import { dateHelpers } from 'components/common/helpers/date/date.helpers';

function ProjectWiseUnitTestResultSummaryCard({ mergeRequestData, loadData }) {

  const [unitTestMetricScorecardDto, setUnitTestMetricScorecardDto] = useState(undefined);
  useEffect(() => {
    initializeDto();
  }, [mergeRequestData]);

  const initializeDto = async () => 
  setUnitTestMetricScorecardDto(new Model({...mergeRequestData}, projectWiseUnitTestResultsMetadata, false));

  const getTitleBar = () => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div><FontAwesomeIcon icon={faFileCode} fixedWidth className="mr-1"/>{unitTestMetricScorecardDto.getData("projectName")}</div>
      </div>
    );
  };

  if (unitTestMetricScorecardDto == null) {
    return <></>;
  }

  const chartData = [{
        "id": "Success",
        "label": "Success",
        "value": unitTestMetricScorecardDto.getData("test_success_density"),
        "color": "#5B5851"
      },
      {
        "id": "Failure",
        "label": "Failure",
        "value": unitTestMetricScorecardDto.getData("test_failures"),
        "color": "#7A756C"
      },
      {
        "id": "Errors",
        "label": "Errors",
        "value": unitTestMetricScorecardDto.getData("test_errors"),
        "color": "#7A756C"
      },
      {
        "id": "Skipped",
        "label": "Skipped",
        "value": unitTestMetricScorecardDto.getData("skipped_tests"),
        "color": "#7A756C"
      }
    ];

  return (
    <InsightsCardContainerBase titleBar={getTitleBar()}>
      <div className="m-2">
        <MetricPipelineInfoSubheader
          pipelineName={unitTestMetricScorecardDto.getData('pipelineName')}
          pipelineRunCount={unitTestMetricScorecardDto.getData('runCount')}
          pipelineDuration={dateHelpers.humanizeDurationForMilliseconds(unitTestMetricScorecardDto.getData('test_execution_time'))}
        />
        <Row className="d-flex align-items-center">
          <Col sm={12} md={6} lg={6}> 
            <div className="data-block-box ml-5 mr-5">
              <InsightHighlightFieldWithTrendIcon
                  dataObject={unitTestMetricScorecardDto}
                  fieldName="tests"
                  trendFieldName="status"
              />
            </div>
          </Col>
          <Col sm={12} md={6} lg={6} >
            <div style={{ height: '180px' }}>      
              <ResponsivePie
                data={chartData}
                {...defaultConfig()}
                {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
              />
            </div>
          </Col>
          </Row>         
        </div>
    </InsightsCardContainerBase>
  );
}

ProjectWiseUnitTestResultSummaryCard.propTypes = {
  mergeRequestData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ProjectWiseUnitTestResultSummaryCard;
