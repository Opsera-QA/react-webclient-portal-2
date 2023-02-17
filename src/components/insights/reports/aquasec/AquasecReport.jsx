import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import AquasecScanReportTable from "./AquasecScanReportTable";
import { AuthContext } from "contexts/AuthContext";
import actionableInsightsGenericChartFilterMetadata
  from "components/insights/charts/generic_filters/actionableInsightsGenericChartFilterMetadata";
import Model from "core/data_model/model";
import chartsActions from "components/insights/charts/charts-actions";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InsightsSubNavigationBar from "components/insights/InsightsSubNavigationBar";
import PropTypes from "prop-types";

function AquasecReport({ kpiConfiguration, dashboardData }) {
  const { pipelineId, imageName, runCount, severity } = useParams();
  console.log("imageNm", runCount);
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [allIssues, setAllIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...actionableInsightsGenericChartFilterMetadata.newObjectFields },
      actionableInsightsGenericChartFilterMetadata,
      false
    )
  );

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

  const loadData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
              ?.value;

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "aquasecSecurityInsightsActionableTwo",
          kpiConfiguration,
          dashboardTags,
          filterDto,
          undefined,
          dashboardOrgs,
          undefined,
          undefined,
          undefined,
          undefined,
          severity,
          null,
          null,
          imageName,
          null,
          pipelineId
      );
      console.log("response", response);

      const dataBlocks = response?.data && response?.status === 200 ?
          response?.data?.data?.data : [];

      if (isMounted?.current === true && dataBlocks) {
        setMetrics(dataBlocks[0].data);
        let newFilterDto = filterDto;
        newFilterDto.setData(
            "totalCount",
            dataBlocks[0].count[0].count
        );
        setFilterModel({ ...newFilterDto });
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

  return (
    <ScreenContainer
      navigationTabContainer={<InsightsSubNavigationBar currentTab={"reportsViewer"} />}
      pageDescription={`Downloadable Report for Aquasec`}
      breadcrumbDestination={"aquasecReports"}
    >
      <AquasecScanReportTable
        data={metrics}
        allIssues={allIssues}
        isLoading={isLoading}
        loadData={loadData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    </ScreenContainer>
  );
}

AquasecReport.propTypes = {
  title: PropTypes.string,
  severity: PropTypes.string,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default AquasecReport;