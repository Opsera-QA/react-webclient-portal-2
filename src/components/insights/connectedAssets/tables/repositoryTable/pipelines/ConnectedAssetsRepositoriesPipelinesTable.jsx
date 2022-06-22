import React, {useState, useEffect, useContext, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import { faDiagramSuccessor } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import connectedAssetsActions from "../../../connectedAssets.actions";
import connectedAssetsMetadata from "../../../connectedAssets-metadata";
import FilterContainer from "../../../../../common/table/FilterContainer";
import CustomTable from "../../../../../common/table/CustomTable";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { CONNECTED_ASSETS_CONSTANTS as constants } from "../../../connecetdAssets.constants";

function ConnectedAssetsRepositoriesPipelinesTable({ repository, dashboardData, icon }) {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  const [filterModel, setFilterModel] = useState(
    new Model(
      { ...connectedAssetsMetadata.newObjectFields },
      connectedAssetsMetadata,
      false
    )
  );

  const noDataMessage = 'No pipelines found.';
  const fields = connectedAssetsMetadata.fields;
  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "pipeline_name"), "pipeline_name"),
      getTableDateTimeColumn(getField(fields, "pipeline_created_at"), "pipeline_created_at"),
      getTableTextColumn(getField(fields, "pipeline_last_run"), "pipeline_last_run"),
      getTableTextColumn(getField(fields, "pipeline_owner_name"), "pipeline_owner_name")
    ],
    []
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadOpenData();
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

  const loadOpenData = async (cancelSource = cancelTokenSource, filterDto = filterModel) => {
    setIsLoading(true);
    let dateRange = dashboardData?.getData("date");
    const response = await connectedAssetsActions.getSelectedRepoDetailedInfo(
      getAccessToken,
      cancelSource,
      constants.REPOSITORIES_LIST.SELECTED_REPO_PIPELINE_INFO,
      dateRange?.startDate,
      dateRange?.endDate,
      filterDto,
      repository
    );
    let dataObject = response?.data?.data?.pipelineInfo?.data?.[0];
    let dataCount = dataObject?.count?.[0]?.count ? dataObject?.count?.[0]?.count : 0;
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", dataCount);
    setFilterModel({ ...newFilterDto });
    if (isMounted?.current === true && dataObject && Array.isArray(dataObject?.data)) {
      setMetrics(dataObject?.data);
    }
  };

  const getTable = () => {
    return (
      <CustomTable
        isLoading={isLoading}
        loadData={loadData}
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
        paginationDto={filterModel}
        setPaginationDto={setFilterModel}
      />
    );
  };

  return (
    <div className={"p-2"}>
      <FilterContainer
        isLoading={isLoading}
        title={'List Of Pipelines'}
        titleIcon={faDiagramSuccessor}
        body={getTable()}
        className={"px-2 pb-2"}
        loadData={loadData}
        setFilterDto={setFilterModel}
        filterDto={filterModel}
        showRefreshButton={false}
        supportSearch={true}
      />
    </div>
  );
}
ConnectedAssetsRepositoriesPipelinesTable.propTypes = {
  repository: PropTypes.object,
  dashboardData: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  icon: PropTypes.object
};
export default ConnectedAssetsRepositoriesPipelinesTable;
