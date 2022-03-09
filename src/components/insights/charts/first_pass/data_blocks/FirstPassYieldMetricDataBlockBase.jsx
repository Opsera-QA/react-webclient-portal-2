import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";

function FirstPassYieldMetricDataBlockBase({ score, subtitle, onClickFunction, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onClickFunction}>
      <TwoLineScoreDataBlock
        className="m-3"
        score={score} 
        subtitle={subtitle}
        dataPoint={dataPoint}
      />
    </DataBlockBoxContainer>
  );
}
FirstPassYieldMetricDataBlockBase.propTypes = {
  score: PropTypes.string,
  subtitle: PropTypes.string,
  onClickFunction: PropTypes.func,
  dataPoint: PropTypes.object
};

export default FirstPassYieldMetricDataBlockBase;
