import React, {useContext, useMemo } from "react";
import PropTypes from "prop-types";
import azureStorageMetadata from "./azure-storage-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateAzureStorageOverlay from "./CreateAzureToolStorageAccountOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import VanityTable from "components/common/table/VanityTable";
import modelHelpers from "components/common/model/modelHelpers";
import CustomTable from "components/common/table/CustomTable";

function AzureStorageTable(
  { 
    azureStorageAccountsList,
    toolId,  
    loadData, 
    isLoading, 
    isMounted, 
    setAzureStorageAccountsModel,
    // azureStorageAccountsModel
  }) { 
  const fields = azureStorageMetadata.fields;
  const toastContext = useContext(DialogToastContext);

  const createAzureStorage = () => {
    toastContext.showOverlayPanel(
      <CreateAzureStorageOverlay 
        toolId={toolId} 
        loadData={loadData} 
        isMounted={isMounted} 
      />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "storageAccountName")),
      getTableTextColumn(getField(fields, "azureStorageAccountToken"))      
    ],
    []
  );

  const onRowSelect = async (rowData) => {    
    const parsedModel = modelHelpers.parseObjectIntoModel(rowData?.original, azureStorageMetadata);
    setAzureStorageAccountsModel({...parsedModel});
  };

  const getTable = () => {
    console.log(azureStorageAccountsList);
    return (
      <CustomTable
        columns={columns}
        data={azureStorageAccountsList}
        loadData={loadData}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createAzureStorage}
      body={getTable()}
      isLoading={isLoading}
      metaData={azureStorageMetadata}
      titleIcon={faBrowser}
      title={"Azure Storage Accounts"}
      // type={"Azure Storage Accounts"}
    />
  );
}

AzureStorageTable.propTypes = {
  toolId: PropTypes.string,
  azureStorageAccountsList: PropTypes.array,
  setAzureStorageAccountsList: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  toolData: PropTypes.object,
  setAzureStorageAccountsModel: PropTypes.func
};

export default AzureStorageTable;
