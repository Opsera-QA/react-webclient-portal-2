import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function JiraMeanTimeToResolutionInsightsDataBlock({
  displayValue,
  displayText,
  icon,
}) {
  return (
    <DataBlockBoxContainer showBorder={true}>
      <TwoLineScoreDataBlock
        icon={icon}
        score={displayValue}
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );
}

JiraMeanTimeToResolutionInsightsDataBlock.propTypes = {
  displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayText: PropTypes.string,
  icon: PropTypes.object,
};

export default JiraMeanTimeToResolutionInsightsDataBlock;
