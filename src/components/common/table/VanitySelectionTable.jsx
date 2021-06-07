import React, {useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import PaginationContainer from "components/common/pagination/PaginationContainer";
import TableBodyLoadingWrapper from "components/common/table/TableBodyLoadingWrapper";
import VanitySelectionTableBase from "components/common/table/VanitySelectionTableBase";
import {persistUpdatedRecord} from "components/common/buttons/saving/saving-helpers-v2";
import {DialogToastContext} from "contexts/DialogToastContext";
import UnsavedChangesModal from "components/common/modal/UnsavedChangesModal";

function VanitySelectionTable({ columns, getNewModel, parentModel, setParentModel, loadData, data, noDataMessage, rowStyling, isLoading, sort, paginationModel, setPaginationModel, tableHeight }) {
  const toastContext = useContext(DialogToastContext);
  const selectedItemRef = useRef({});

  const onRowSelect = async (grid, row, column, e) => {
    const selectedModel = getModel();
    // Don't change rows if invalid, save before changing rows if valid
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
    const selectedModel = getModel();

    // Value should only be undefined if canceled out
    if (value !== undefined) {
      const fieldName = column?.id;

      if (selectedModel?.getData(fieldName) === value) {
        return true;
      }

      selectedModel.setData(fieldName, value);
      const fieldErrors = selectedModel.isFieldValid(fieldName);

      if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
        toastContext.showModal(
          <UnsavedChangesModal
            model={selectedModel}
            errors={fieldErrors}
            handleContinueEditing={handleContinueEditing}
            handleRevert={handleRevert}
          />
        );
        return false;
      }

      selectedItemRef.current = {...selectedModel};
      setParentModel({...selectedModel});
      return true;
    }
  };

  const handleContinueEditing = () => {
    toastContext.clearOverlayPanel();
  };

  const handleRevert = (selectedModel) => {
    toastContext.clearOverlayPanel();
    selectedModel?.resetData();
    setParentModel({...selectedModel});
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
          selectedItemId={parentModel?.getData("_id")}
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
      isLoading={isLoading || columns == null}
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
  setParentModel: PropTypes.func,
  parentModel: PropTypes.object
};

export default VanitySelectionTable;