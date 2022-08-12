import React from "react";
import PropTypes from "prop-types";
import ExportDataModalBase from "components/common/modal/export_data/ExportDataModalBase";
import jsPDF from "jspdf";

// TODO: Should we be just sending in data and formatting in here?
function ExportPipelineActivityLogDataModal({showModal, closeModal, formattedData, rawData, isLoading}) {
  const getRawData = () => {
    return new Blob([rawData], {type: 'text/plain'});
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({orientation: "landscape"});
    pdfExporter.autoTable({
      startY: 2,
      styles: {fontSize: 9, minCellWidth: 19, minCellHeight: 12, valign: 'middle'},
      showHead: "firstPage",
      headStyles: {fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84]},
      columnStyles: {0: {halign: 'center'}},
      margin: {left: 2, right: 2},
      head: [["Run", "Task", "Action", "Message", "Status", "Date"]],
      body: formattedData.map(item => [item.run_count, item.step_name, item.action, item.message, item.status, item.createdAt])
    });

    return pdfExporter;
  };

  return (
    <ExportDataModalBase
      showModal={showModal}
      handleCancelModal={closeModal}
      isLoading={isLoading}
      getRawData={getRawData}
      getPdfExporter={getPdfExporter}
    />
  );
}

ExportPipelineActivityLogDataModal.propTypes = {
  showModal: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  rawData: PropTypes.any,
  formattedData: PropTypes.any,
  isLoading: PropTypes.bool,
};

export default ExportPipelineActivityLogDataModal;