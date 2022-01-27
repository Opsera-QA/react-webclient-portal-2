import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import SuccessMetricIcon from "components/common/icons/metric/success/SuccessMetricIcon";
import DangerMetricIcon from "components/common/icons/metric/danger/DangerMetricIcon";
import NoTrendMetricIcon from "components/common/icons/metric/trend/NoTrendMetricIcon";

function InsightHighlightFieldWithTrendIcon({ dataObject, fieldName, className, trendFieldName }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  const getIcon = (status) => {
    switch (status) {
        case "red":
          return (<DangerMetricIcon />);
        case "neutral":
          return null;
        case "green":
        return (<SuccessMetricIcon />);
        case "-":
          return (<NoTrendMetricIcon />);
        default:
          return status;
      }
  };

  return (
    <FieldContainer className={className}>
      <div className="d-flex flex-column justify-content-center align-items-center my-2">
        <span className="insight-hll">{dataObject.getData(fieldName)}</span>
        <span className="d-flex">
          {field.label}
          <span className="pl-1">{getIcon(dataObject.getData(trendFieldName).toLowerCase())}</span>
        </span>
      </div>
    </FieldContainer>
  );
}

InsightHighlightFieldWithTrendIcon.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  trendFieldName: PropTypes.string,
};

export default InsightHighlightFieldWithTrendIcon;
