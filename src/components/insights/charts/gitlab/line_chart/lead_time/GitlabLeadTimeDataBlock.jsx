import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";

function GitlabLeadTimeDataBlock({
  value,
  prevValue,
  topText,
  bottomText,
}) {
  return (
    <DataBlockBoxContainer
      showBorder={true}
      className="h-100"
    >
      <ThreeLineDataBlockBase
        className={`p-2 h-100`}
        topText={topText}
        icon={null}
        bottomText={`${bottomText}${prevValue}`}
        middleText={
          <span className={"metric-block-header-text"}>{value}</span>
        }
        dataPoint={null}
      />
    </DataBlockBoxContainer>
  );
}

GitlabLeadTimeDataBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topText: PropTypes.string,
  bottomText: PropTypes.string,
};

export default GitlabLeadTimeDataBlock;
