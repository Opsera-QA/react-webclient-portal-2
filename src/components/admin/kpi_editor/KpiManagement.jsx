import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import KpiTable from "./KpiTable";
import KpiActions from "./kpi-editor-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "../../common/navigation/breadcrumbTrail";
import {DialogToastContext} from "../../../contexts/DialogToastContext";
import Model from "../../../core/data_model/model";
import kpiFilterMetadata from "./kpi-filter-metadata";

function KpiManagement() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiList, setKpiList] = useState([]);
  const [kpiFilterDto, setKpiFilterDto] = useState(new Model({...kpiFilterMetadata.newObjectFields}, kpiFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles(kpiFilterDto);
    }
    catch (error) {
      console.log(error);
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getKpis = async (filterDto) => {
    const response = await KpiActions.getKpis(kpiFilterDto, getAccessToken);
    setKpiList(response.data.data);
    let newFilterDto = filterDto;
    newFilterDto.setData("totalCount", response.data.count);
    newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
    setKpiFilterDto({...newFilterDto});
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await getKpis(kpiFilterDto);
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.OpseraAdministrator || !accessRoleData.Administrator) {
    return (<AccessDeniedDialog roleData={accessRoleData}/>);
  }

  return (
    <div className="max-content-width">
      <BreadcrumbTrail destination={"kpiManagement"}/>
      <h5>KPI Management</h5>
      <div className="text-muted">Listed below are registered charts for the Analytics platform. Each chart or KPI
        corresponds to a data point in the analytics platform.
      </div>
      <div className="full-height">
        {<KpiTable loadData={loadData} data={kpiList} isLoading={isLoading} kpiFilterDto={kpiFilterDto} setKpiFilterDto={setKpiFilterDto}/>}
      </div>
    </div>
  );
}


export default KpiManagement;