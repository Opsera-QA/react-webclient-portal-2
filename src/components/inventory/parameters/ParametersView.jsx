import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ParameterTable from "components/inventory/parameters/ParameterTable";
import ParametersEditorPanel from "components/inventory/parameters/details/ParametersEditorPanel";
import TableAndDetailPanelContainer from "components/common/table/TableAndDetailPanelContainer";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import ParameterModel from "components/inventory/parameters/parameter.model";

function ParametersView({isLoading, loadData, parameterList, setParameterList, parameterMetadata, parameterRoleDefinitions}) {
  const { getAccessToken } = useContext(AuthContext);
  const [parameterData, setParameterData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [parameterList]);

  const getTableView = () => {
    return (
      <ParameterTable
        isLoading={isLoading}
        loadData={loadData}
        data={parameterList}
        parameterMetadata={parameterMetadata}
        parameterRoleDefinitions={parameterRoleDefinitions}
        cancelTokenSource={cancelTokenSource}
        isMounted={isMounted}
        getAccessToken={getAccessToken}
        getNewModel={getNewModel}
        setParameterData={setModel}
        parameterData={parameterData}
      />
    );
  };

  const setModel = (newModel) => {
    const selectedRecordIndex = parameterList.findIndex((parameter) => { return parameter._id === newModel.getData("_id"); });

    if (selectedRecordIndex !== -1) {
      if (newModel?.isDeleted() === true) {
        parameterList.splice(selectedRecordIndex, 1);
        setParameterList([...parameterList]);
      }
      else {
        parameterList[selectedRecordIndex] = newModel.getPersistData();
        setParameterList([...parameterList]);
      }
    }

    if (parameterData?.getData("_id") === newModel?.getData("_id")) {
      if (newModel.isDeleted()) {
        setParameterData(undefined);
      }
      else {
        setParameterData({...newModel});
      }
    }
  };

  const getNewModel = (newRowData) => {
    let newModel = {...new ParameterModel({...newRowData}, parameterMetadata, false, setModel, getAccessToken, cancelTokenSource, loadData)};
    setParameterData({...newModel});
    return newModel;
  };

  const getEditorPanel = () => {
    return (
      <ParametersEditorPanel
        isLoading={isLoading}
        loadData={loadData}
        parameterModel={parameterData}
        parameterMetadata={parameterMetadata}
        parameterRoleDefinitions={parameterRoleDefinitions}
      />
    );
  };

  return (
    <TableAndDetailPanelContainer detailPanel={getEditorPanel()} table={getTableView()} />
  );
}

ParametersView.propTypes = {
  parameterList: PropTypes.array,
  isLoading: PropTypes.bool,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  parameterMetadata: PropTypes.object,
  setParameterList: PropTypes.func,
  parameterRoleDefinitions: PropTypes.object
};

export default ParametersView;