import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import InsightsSynopsisDataBlock from "components/common/data_boxes/InsightsSynopsisDataBlock";
import ServiceNowMeanTimeToResolutionBarChart
  from "components/insights/charts/servicenow/bar_chart/mean_time_to_resolution/ServiceNowMeanTimeToResolutionBarChart";
import ServiceNowMeanTimeToAcknowledgeBarChart
  from "components/insights/charts/servicenow/bar_chart/mean_time_to_acknowledge/ServiceNowMeanTimeToAcknowledgeBarChart";
import LoadingIcon from "components/common/icons/LoadingIcon";

function ServiceNowMeanTimeToAcknowledgeDataBlock({ dashboardData, toggleDynamicPanel, selectedDataBlock, style }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dateRange = dashboardData?.data?.filters[
        dashboardData?.data?.filters.findIndex(
          (obj) => obj.type === "date"
        )
      ]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "serviceNowMTTA",
        null,
        dashboardTags,
        null,
        null,
        dashboardOrgs,
        null,
        null,
        dateRange
      );
      let dataObject = response?.data?.data[0]?.serviceNowMTTA?.data[0];

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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

  const onDataBlockSelect = () => {
    toggleDynamicPanel("mean_time_to_acknowledge", getDynamicPanel());
  };

  const getDynamicPanel = () => {
    return (
      <ServiceNowMeanTimeToAcknowledgeBarChart
        dashboardData={dashboardData}
        kpiConfiguration={{ kpi_name: "Service Now Mean Time to Acknowledgement", filters: [] }}
        showSettingsToggle={false}
      />
    );
  };

  const getChartBody = () => {
    return (
      <div className={selectedDataBlock === "mean_time_to_acknowledge" ? "selected-data-block" : undefined} style={style}>
        <InsightsSynopsisDataBlock
          title={
            !isLoading && metrics?.overallMtta ? (
              metrics?.overallMtta
            ) : !isLoading ? (
              0
            ) : (
              <LoadingIcon className={"mr-1"} />
            )
          }
          subTitle="Mean Time to Acknowledge (Hours)"
          toolTipText="Mean Time to Acknowledge (Hours)"
          clickAction={() => onDataBlockSelect()}
        />
      </div>
    );
  };

  return getChartBody();
}

ServiceNowMeanTimeToAcknowledgeDataBlock.propTypes = {
  dashboardData: PropTypes.object,
  toggleDynamicPanel: PropTypes.func,
  selectedDataBlock: PropTypes.string,
  style: PropTypes.object,
};

export default ServiceNowMeanTimeToAcknowledgeDataBlock;
