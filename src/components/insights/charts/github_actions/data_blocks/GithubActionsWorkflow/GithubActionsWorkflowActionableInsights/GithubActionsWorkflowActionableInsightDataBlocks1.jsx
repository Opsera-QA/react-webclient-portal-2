import React, {useState, useEffect, useRef, useContext} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "../../../../../../common/status_notifications/loading";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "../../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import chartsActions from "../../../../charts-actions";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import {metricHelpers} from "../../../../../metric.helpers";

function GithubActionsWorkflowActionableInsightDataBlocks1({ kpiConfiguration, dashboardData, workflowName }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      const response = await chartsActions.githubActionsActionableOneDataBlocks(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs,
          workflowName
      );
      let dataObject = response?.data?.data[0];
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


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


  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    return (
      <>
        <div>
          <Row style={{justifyContent: "space-evenly"}}>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.runs}
                    subtitle={'Total Runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.applications}
                    subtitle={'Total Applications'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.repos}
                    subtitle={'Total Repositories'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.success}
                    subtitle={'Total Success Runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.failures}
                    subtitle={'Total Failed Runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.successPercentage}
                    subtitle={'% Success'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.failedPercentage}
                    subtitle={'% Failures'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgSuccessTime}
                    subtitle={'Average Time For Success Runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgFailedTime}
                    subtitle={'Average Time For Failed Runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return getBody();
}

GithubActionsWorkflowActionableInsightDataBlocks1.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName:PropTypes.string
};

export default GithubActionsWorkflowActionableInsightDataBlocks1;
