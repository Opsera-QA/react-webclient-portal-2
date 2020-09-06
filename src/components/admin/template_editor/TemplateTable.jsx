import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomTable from "components/common/table/CustomTable";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import NewTemplateModal from "./NewTemplateModal";
import templateEditorMetadata from "./template-form-fields";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "../../common/table/table-column-helpers";

function TemplateTable({ data, loadData, isLoading }) {
  const fields = templateEditorMetadata.fields;
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const history = useHistory();

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name"})),
      getTableTextColumn(fields.find(field => { return field.id === "description"})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt"})),
      getTableTextColumn(fields.find(field => { return field.id === "account"})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active"})),
    ],
    []
  );

  const noDataMessage = "No templates are currently available";

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData, type) => {
    history.push(`/admin/templates/details/${rowData.original._id}`);
  };

  const createTemplate = () => {
    setShowCreateTemplateModal(true);
  };

  return (
    <>
      <div className="justify-content-between mb-1 d-flex">
        <h5>Template Management</h5>
        <div className="text-right">
          <Button variant="primary" size="sm"
                  onClick={() => {
                    createTemplate();
                  }}>
            <FontAwesomeIcon icon={faPlus} className="mr-1"/> New Template
          </Button>
          <br/>
        </div>
      </div>
      <div className="table-content-block">
        <CustomTable
          columns={columns}
          data={data}
          onRowSelect={selectedRow}
          noDataMessage={noDataMessage}
          isLoading={isLoading}
          rowStyling={rowStyling}
          tableStyleName="custom-table-2"
        >
        </CustomTable>
      </div>
      <NewTemplateModal setShowModal={setShowCreateTemplateModal} loadData={loadData} showModal={showCreateTemplateModal}/>
    </>
  );
}

TemplateTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool
};

export default TemplateTable;