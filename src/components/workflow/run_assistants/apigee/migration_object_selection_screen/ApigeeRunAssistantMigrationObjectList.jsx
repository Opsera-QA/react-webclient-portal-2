import React, {useState} from 'react';
import PropTypes from "prop-types";
import {apigeeMigrationObjectMetadata} from "./apigeeMigrationObject.metadata";
import Model from 'core/data_model/model';
import ApigeeRunAssistantListObjectInput from "./inputs/ApigeeRunAssistantListObjectInput";
import ApigeeMigrationObjectVersionSelectionPanel from "./ApigeeMigrationObjectVersionSelectionPanel";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {UPDATE_MODE_VALUES} from "./apigeeMigrationObject.constants";

const ApigeeRunAssistantMigrationObjectList = (
  { 
    apigeeRunParametersModel, 
    setApigeeRunParametersModel, 
    loadDataFunction,
    migrationObjects, 
    isLoading, 
    migrationObjectPullCompleted,
    updateVersionMode,
    setUpdateModeValue,
    migrationObject,
    setMigrationObject
  }) => {
  const noDataFilesPulledMessage = "The Migration Objects pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Migration Objects list has not been received from Apigee yet. Please click the refresh button to resume polling for the files.";


  const customTemplate = (item) => {
    const type = item["type"] !== "" ? item["type"] : "";
    const name = item["name"] !== "" ? item["name"] : "";

    return (`
      <div>
        <div class="d-flex justify-content-between mb-2">
            <div>Name: ${name}</div>
            <div>Type: ${type}</div>
        </div>        
      </div>
    `);
  };

  const searchFunction = (item, searchTerm) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  };
  
  const setDataFunction = (fieldName, selectedOption) => {
    const dataObj = {...apigeeRunParametersModel};
    dataObj.setData("selectedMigrationObjects", selectedOption);
    setApigeeRunParametersModel({...dataObj});
  };

  const processSelectedData = (fieldName, selectedOption) => {
    setUpdateModeValue("");
    const newRunParametersModel = new Model({ ...apigeeMigrationObjectMetadata.newObjectFields, ...selectedOption }, apigeeMigrationObjectMetadata, false);
    setMigrationObject({...newRunParametersModel});
    if (selectedOption.type === "keyValueMaps") {
      setUpdateModeValue(UPDATE_MODE_VALUES.KVM);
      return;
    }
    setUpdateModeValue(UPDATE_MODE_VALUES.VERSION);
  };

  return (
    <ApigeeRunAssistantListObjectInput
        setDataFunction={setDataFunction}
        processDataFunction={processSelectedData}
        fieldName={"selectedMigrationObjects"}
        model={apigeeRunParametersModel}
        setModel={setApigeeRunParametersModel}
        selectOptions={migrationObjects}
        searchFunction={searchFunction}
        // clearDataFunction={clearDataFunction}
        customTemplate={customTemplate}
        isLoading={isLoading}
        valueField={"id"}
        noDataMessage={migrationObjectPullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}        
        disabled={hasStringValue(updateVersionMode)}
      />
  );

};

ApigeeRunAssistantMigrationObjectList.propTypes = {
  isLoading: PropTypes.bool,
  migrationObjects: PropTypes.arrayOf(PropTypes.object),
  loadDataFunction: PropTypes.func,
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  migrationObjectPullCompleted: PropTypes.bool,
  updateVersionMode: PropTypes.bool,
  setUpdateModeValue: PropTypes.func,
  migrationObject: PropTypes.object,
  setMigrationObject: PropTypes.func,
};

export default ApigeeRunAssistantMigrationObjectList;
