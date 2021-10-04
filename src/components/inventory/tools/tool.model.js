import ModelBase from "core/data_model/model.base";
import toolsActions from "components/inventory/tools/tools-actions";

export class ToolModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    canUpdate = false,
    canDelete = false,
    canEditAccessRoles = false,
    setStateFunction
  ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.editAccssRolesAllowed = canEditAccessRoles;
    this.setStateFunction = setStateFunction;
  }

  createModel = async () => {
    return await toolsActions.createToolV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await toolsActions.updateToolV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  // TODO: Not used yet
  deleteModel = async () => {
    const vaultDeleteResponse = await toolsActions.deleteOwnerVaultRecordsForToolIdV2(this.getAccessToken, this.cancelTokenSource, this);
    if (vaultDeleteResponse?.status !== 200) {
      const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
      // toastContext.showErrorDialog(errorMsg);
      return;
    }
    await toolsActions.deleteToolV2(this.getAccessToken, this.cancelTokenSource, this);
    // toastContext.showDeleteSuccessResultDialog("Tool");
    // setShowDeleteModal(false);
    history.push("/inventory/tools");
  };

  getDetailViewLink = () => {
    return `/inventory/tools/details/${this.getData("_id")}`;
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")} Tool Details`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ToolModel(
      {...newData},
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.updateAllowed,
      this.deleteAllowed,
      this.setStateFunction
    );
  };
}

export default ToolModel;


