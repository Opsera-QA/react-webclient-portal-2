import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";

import SalesforceOrgSyncDetailedRunSummaryTable from "./SalesforceOrgSyncDetailedRunSummaryTable";
import { metricHelpers } from "components/insights/metric.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import taskActions from "../../tasks-actions";
import {salesforceOrgSyncMetadata} from "../../salesforceOrgSync.metadata";

export default function SalesforceOrgSyncDetailedRunSummary(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    taskId,
    taskName,
    setCurrentScreen,
    setSelectedRunObject,
  }) {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...salesforceOrgSyncMetadata.newObjectFields },
      salesforceOrgSyncMetadata,
      false,
    ),
  );
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (filterDto = filterModel) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      const response = await taskActions.sfdcOrgSyncActionableOneTable(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        filterDto,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        taskId,
      );
      let dataObject = response?.data ? response?.data?.data[0]?.data : [];
      let dataCount = response?.data
        ? response?.data?.data[0]?.count[0]?.count
        : [];
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", dataCount);
      setFilterModel({ ...newFilterDto });
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Error pulling task metrics:");
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  return (
    <SalesforceOrgSyncDetailedRunSummaryTable
      data={metrics}
      isLoading={isLoading}
      loadData={loadData}
      filterModel={filterModel}
      setFilterModel={setFilterModel}
      taskName={taskName}
      dashboardFilters={dashboardFilters}
      setCurrentScreen={setCurrentScreen}
      setSelectedRunObject={setSelectedRunObject}
    />
  );
}

SalesforceOrgSyncDetailedRunSummary.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  taskId: PropTypes.string,
  taskName: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setSelectedRunObject: PropTypes.func,
};