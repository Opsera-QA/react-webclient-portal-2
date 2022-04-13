import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineScoreDataBlock from "components/common/metrics/score/ThreeLineScoreDataBlock";

function GitScrapperOverallScannedRepositoriesTrendDataBlock({ score, icon, className, onSelect, lastScore, iconOverlayBody }) {
  return (
    <DataBlockBoxContainer showBorder={true} onClickFunction={onSelect}>
      <ThreeLineScoreDataBlock
        className={`${className} p-2`}
        score={score}
        topText={"Scanned Repositories"}
        bottomText={"Last Scan: " + lastScore}
        icon={icon}
        iconOverlayBody={iconOverlayBody}
      />
    </DataBlockBoxContainer>
  );
}

GitScrapperOverallScannedRepositoriesTrendDataBlock.propTypes = {
  score: PropTypes.number,
  icon: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,
  lastScore: PropTypes.number,
  iconOverlayBody: PropTypes.any,
};

export default GitScrapperOverallScannedRepositoriesTrendDataBlock;
