import React, { useState, useEffect, useRef, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import { AuthContext } from "contexts/AuthContext";
import { metricHelpers } from "components/insights/metric.helpers";
import githubActionsWorkflowActions
  from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";

function GithubActionsUniqueRunSummaryDataBlocks(
  {
    kpiConfiguration,
    dashboardData,
    branchName,
    repoName,
    appName,
    workflow,
    jobName,
  }) {
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsActionableTwoDataBlocks(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflow,
        repoName,
        appName,
        branchName,
      );

      const metrics = response?.data?.data[0];

      if (isMounted?.current === true && metrics) {
        setMetrics(metrics);
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


  if (isLoading) {
    return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
  }

  return (
    <div className={"mx-3"}>
      <Row>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.uniqueJobNames}
                subtitle={"Total Unique Job Names"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of unique job names"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.runs}
                subtitle={"Total Jobs"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of jobs"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.runsExecuted}
                subtitle={"Jobs Executed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The jobs that were executed"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageExecuted}
                subtitle={"% Jobs Executed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of jobs that were executed"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsSuccess}
                subtitle={"Total Success"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of successful jobs"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.SuccessPercentage}
                subtitle={"% Success"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percent of successful jobs"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsFailed}
                subtitle={"Total Failed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of failed jobs"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.FailedPercentage}
                subtitle={"% Failed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percent of failed jobs"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsSkipped}
                subtitle={"Total Skipped"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of jobs that were skipped"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageSkipped}
                subtitle={"% Skipped"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of jobs that were skipped"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsCanceled}
                subtitle={"Total Canceled"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of jobs that were cancelled"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageCanceled}
                subtitle={"% Canceled"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of jobs cancelled."}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
      </Row>
    </div>
  );
}

GithubActionsUniqueRunSummaryDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
};

export default GithubActionsUniqueRunSummaryDataBlocks;
