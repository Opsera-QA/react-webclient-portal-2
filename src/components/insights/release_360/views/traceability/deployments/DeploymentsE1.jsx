import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { METRIC_QUALITY_LEVELS } from "../../../../../common/metrics/text/MetricTextBase";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import MetricScoreText from "../../../../../common/metrics/score/MetricScoreText";

function DeploymentsE1({ dashboardData, environment}) {
  const {getAccessToken} = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
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
      let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]?.value;
      let dateRange = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "date")]?.value;
      const response = await chartsActions.getEnvironmentMetrics(getAccessToken, cancelSource, "totalDeploymentCounts", environment, dashboardTags, dashboardOrgs, dateRange);
      let dataObject = response?.data ? response?.data?.data[0] : [];

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

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }

    let color;
    let successRate = metrics[0]?.TotalDeployments === 0 ? 0 : (100*metrics[0].successfulDeployments/metrics[0].TotalDeployments).toFixed(0);
    if(successRate > 89){
      color = METRIC_QUALITY_LEVELS.SUCCESS;
    }
    else { color = METRIC_QUALITY_LEVELS.DANGER; }

    return (
      <DataBlockBoxContainer className={"mr-2"} showBorder={true}>
        <ThreeLineDataBlockBase
          topText={"Deployments"}
          className={"p-4"}
          middleText={<MetricScoreText score={metrics[0].TotalDeployments} />}
          bottomText={<MetricScoreText score={successRate +"% Passed"} qualityLevel={color} />}
          showBorder={true}
        />
      </DataBlockBoxContainer>
    );
  };

  return (
    getChartBody()
  );
}

DeploymentsE1.propTypes = {
  // kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  environment: PropTypes.string
};

export default DeploymentsE1;
