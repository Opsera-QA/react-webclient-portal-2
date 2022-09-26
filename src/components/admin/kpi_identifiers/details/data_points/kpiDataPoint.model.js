import ModelBase from "core/data_model/model.base";
import kpiDataPointActions from "components/admin/kpi_identifiers/details/data_points/kpiDataPoint.actions";
import KpiDataPointRoleHelper from "@opsera/know-your-role/roles/analytics/data_points/kpiDataPointRole.helper";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";

export default class KpiDataPointModel extends ModelBase {
  constructor(
    userData,
    data,
    metadata,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    setStateFunction,
    parentId,
  ) {
    super(data, metadata, newModel);
    this.userData = userData;
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.kpiId = parentId;
  }

  createModel = async () => {
    return await kpiDataPointActions.createKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  saveModel = async () => {
    return await kpiDataPointActions.updateKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  deleteModel = async () => {
   return await kpiDataPointActions.deleteKpiDataPointV2(this.getAccessToken, this.cancelTokenSource, this, this.kpiId);
  };

  canCreate = () => {
    return KpiDataPointRoleHelper.canCreateKpiDataPoint(this.userData);
  };

  canUpdate = () => {
    return KpiDataPointRoleHelper.canUpdateKpiDataPoint(
      this.userData,
      this.data,
    );
  };

  canDelete = () => {
    return KpiDataPointRoleHelper.canDeleteKpiDataPoint(
      this.userData,
      this.data,
    );
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")}`;
  };

  getType = () => {
    return `KPI Data Point`;
  };
}


