import { statusColors } from "components/insights/charts/charts-views";

export const isEmptyCustom = (val) => {
  if (val == undefined) return true;
  if (val == null) return true;
  if (typeof val !== "number") return true;
  return false;
};

export const getMiddleText = (meanData, countData) => {
  if (!isEmptyCustom(meanData) && !isEmptyCustom(countData)) {
    return meanData + " min | " + countData + " runs";
  }
  if (!isEmptyCustom(meanData)) {
    return meanData + " min | 0";
  }
  return "No runs";
};

export const getMiddleStyle = (meanData, goalsData) => {
  if (isEmptyCustom(meanData) || isEmptyCustom(goalsData)) {
    return;
  }
  if (goalsData < meanData) {
    return { color: statusColors.success };
  }
  if (goalsData > meanData) {
    return { color: statusColors.danger };
  }
  if (goalsData == meanData) {
    return { color: statusColors.warning };
  }
};
