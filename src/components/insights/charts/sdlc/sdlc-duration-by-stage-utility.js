import React from "react";
import { statusColors } from "components/insights/charts/charts-views";
import {dataPointHelpers} from "../../../common/helpers/metrics/data_point/dataPoint.helpers";

export const getTimeDisplay = (mins) => {
  const seconds = Number(mins * 60);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const arrayToDisplay = [];
  if (days > 0) {
    arrayToDisplay.push(days + (days === 1 ? " day" : " days"));
  }
  if (hours > 0) {
    arrayToDisplay.push(hours + (hours === 1 ? " hr" : " hrs"));
  }
  if (minutes > 0) {
    arrayToDisplay.push(minutes + (minutes === 1 ? " min" : " min"));
  }
  if (remainingSeconds > 0) {
    arrayToDisplay.push(remainingSeconds + (remainingSeconds === 1 ? " sec" : " sec"));
  }
  if (arrayToDisplay.length === 0) {
    return "0 sec";
  }
  const display = arrayToDisplay.slice(0, 2).join(", ");
  return display;
};

export const isEmptyCustom = (val) => {
  if (val == undefined) return true;
  if (val == null) return true;
  if (typeof val !== "number") return true;
  return false;
};

export const getMiddleText = (meanData, countData, goalsData, dataPoint) => {
  let style = getMiddleStyle(meanData, goalsData, dataPoint);
  if (!isEmptyCustom(meanData) && !isEmptyCustom(countData)) {
    return (
      <div style={style}>
        {meanData} min <br></br> {countData} runs
      </div>
    );
  }
  if (!isEmptyCustom(meanData)) {
    return `${meanData} min | 0`;
  }
  return "No runs";
};

export const getMiddleStyle = (meanData, goalsData, dataPoint) => {
  if (dataPoint) {
    const evaluatedDataPoint = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, meanData);
    if (typeof evaluatedDataPoint === "string") {
      return { color: statusColors[evaluatedDataPoint]};
    }
  }

  if (isEmptyCustom(meanData) || isEmptyCustom(goalsData) || goalsData === 0) {
    return;
  }

  const goalsDataValue = !isEmptyCustom(goalsData) ? goalsData : 0;
  if (goalsDataValue > meanData) {
    return { color: statusColors.success };
  }
  if (goalsDataValue < meanData) {
    return { color: statusColors.danger };
  }
  if (goalsDataValue == meanData) {
    return { color: statusColors.warning };
  }
};
