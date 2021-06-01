import React, {useContext, useRef} from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import VanitySelectionTableBase from "components/common/table/VanitySelectionTableBase";
import {persistUpdatedRecord} from "components/common/buttons/saving/saving-helpers-v2";
import {DialogToastContext} from "contexts/DialogToastContext";

function VanitySelectionTable({ columns, getNewModel, setParentModel, loadData, data, noDataMessage, rowStyling, isLoading, sort, paginationModel, setPaginationModel, tableHeight }) {
  const toastContext = useContext(DialogToastContext);
  const selectedItemRef = useRef({});

  // TODO: Should we put this into the table itself and pass down the state object?
  const onRowSelect = async (grid, row, column, e) => {
    const selectedModel = getModel();
    // // Don't change rows if invalid, save before changing rows if valid
    if (selectedModel != null) {
      // We are still on same row
      if (selectedModel.getData("_id") === row?._id) {
        return true;
      }

      // Show would you like to save. If true, run save and on success change rows. On failure return false;
      if (selectedModel?.isChanged()) {
        const response = await persistUpdatedRecord(selectedModel, toastContext);

        if (response === false) {
          return false;
        }
      }
    }

    let newRow = {...row};
    delete newRow["id"];
    delete newRow["$height"];
    const newModel = getNewModel(newRow);

    selectedItemRef.current = {...newModel};
    return true;
  };

  const onCellEdit = (value, row, column) => {
    const selectedModel = {...getModel()};

    // Value should only be undefined if canceled out
    if (value !== undefined) {
      const fieldName = column?.id;
      selectedModel.setData(fieldName, value);

      const fieldErrors = selectedModel.isFieldValid(fieldName);

      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        toastContext.showFormErrorToast(fieldErrors[0]);
        return false;
      }

      selectedItemRef.current = {...selectedModel};
      setParentModel({...selectedModel});
      return true;
    }

    return true;
  };

  const getModel = () => {
    const selectedItem = selectedItemRef?.current;
    if (selectedItem && Object.keys(selectedItem).length !== 0) {
      return selectedItem;
    }
  };

  const getTableBody = () => {
    return (
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={paginationModel}
        setFilterDto={setPaginationModel}
      >
        <VanitySelectionTableBase
          noDataMessage={noDataMessage}
          data={data}
          isLoading={isLoading}
          columns={columns}
          onRowSelect={onRowSelect}
          rowStyling={rowStyling}
          height={tableHeight}
          onCellEdit={onCellEdit}
          sort={sort}
        />
      </PaginationContainer>
    );
  };

  return (
    <TableBodyLoadingWrapper
      isLoading={isLoading}
      data={data}
      noDataMessage={noDataMessage}
      tableComponent={getTableBody()}
      tableHeight={tableHeight}
    />
  );
}

VanitySelectionTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  noDataMessage: PropTypes.string,
  rowStyling: PropTypes.func,
  isLoading: PropTypes.bool,
  sort: PropTypes.string,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  loadData: PropTypes.func,
  tableHeight: PropTypes.string,
  getNewModel: PropTypes.func,
  setParentModel: PropTypes.func
};

export default VanitySelectionTable;