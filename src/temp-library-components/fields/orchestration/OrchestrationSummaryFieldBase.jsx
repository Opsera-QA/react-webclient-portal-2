import PropTypes from "prop-types";
import React from "react";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import FieldContainer from "components/common/fields/FieldContainer";
import {orchestrationHelper} from "temp-library-components/helpers/orchestration/orchestration.helper";

export default function OrchestrationSummaryFieldBase(
  {
    completionTime,
    status,
    className,
    labelText,
    type,
  }) {
  return (
    <FieldContainer className={className}>
      <FieldLabelBase label={labelText} />
      <span>
        {orchestrationHelper.getLastRunSummary(type, completionTime, status)}
      </span>
    </FieldContainer>
  );
}

OrchestrationSummaryFieldBase.propTypes = {
  completionTime: PropTypes.any,
  status: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string,
  type: PropTypes.string,
};

OrchestrationSummaryFieldBase.defaultProps = {
  labelText: "Summary",
};
