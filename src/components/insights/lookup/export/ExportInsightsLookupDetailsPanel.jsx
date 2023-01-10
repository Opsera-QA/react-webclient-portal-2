import React from "react";
import PropTypes from "prop-types";
import jsPDF from "jspdf";
import ExportDataPanel from "components/common/modal/export_data/ExportDataPanel";
import {DATE_FORMATS, getFormattedDate} from "components/common/fields/date/DateFieldBase";

export default function ExportInsightsLookupDetailsPanel({
  showExportPanel,
  setShowExportPanel,
  LookupDetailsData,
  isLoading,
}) {
  const getRawData = () => {
    const rawData = Array.isArray(LookupDetailsData)
      ? LookupDetailsData?.map((item) => JSON.stringify(item))
      : "export failure";
    return new Blob([rawData], { type: "text/plain" });
  };

  const getPdfExporter = () => {
    const pdfExporter = new jsPDF({ orientation: "landscape" });
    pdfExporter.autoTable({
      startY: 2,
      styles: {
        fontSize: 9,
        minCellWidth: 19,
        minCellHeight: 12,
        valign: "middle",
      },
      showHead: "firstPage",
      headStyles: { fontSize: 8, minCellWidth: 19, fillColor: [54, 46, 84] },
      margin: { left: 2, right: 2 },
      head: [
        [
          "Pipeline ID",
          "Pipeline Name",
          "Job Type",
          "Created By",
          "Deployment Start",
          "Deployment End",
        ],
      ],
      body: LookupDetailsData.map((item) => [
        item.pipelineId,
        item.pipelineName,
        item.jobType,
        item.createdByName,
        getFormattedDate(item.startTimestamp, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
        getFormattedDate(item.endTimestamp, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
      ]),
    });

    return pdfExporter;
  };

  const getCsvData = () => {
    return [
      [
        "Pipeline ID",
        "Pipeline Name",
        "Job Type",
        "Created By",
        "Deployment Start",
        "Deployment End",
      ],
      ...LookupDetailsData.map((item) => [
        item.pipelineId,
        item.pipelineName,
        item.jobType,
        item.createdByName,
        getFormattedDate(item.startTimestamp, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
        getFormattedDate(item.endTimestamp, DATE_FORMATS.TIMESTAMP_WITHOUT_SECONDS),
      ]),
    ];
  };

  if (LookupDetailsData == null || !Array.isArray(LookupDetailsData)) {
    return null;
  }

  return (
    <ExportDataPanel
      isLoading={isLoading}
      getRawData={getRawData}
      getCsvData={getCsvData}
      getPdfExporter={getPdfExporter}
      closePanelFunction={() => setShowExportPanel(!showExportPanel)}
    />
  );
}

ExportInsightsLookupDetailsPanel.propTypes = {
  showExportPanel: PropTypes.bool,
  setShowExportPanel: PropTypes.func,
  LookupDetailsData: PropTypes.any,
  isLoading: PropTypes.bool,
};
