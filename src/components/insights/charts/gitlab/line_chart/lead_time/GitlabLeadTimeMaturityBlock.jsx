import React from "react";
import PropTypes from "prop-types";
import {faInfoCircle} from "@fortawesome/pro-solid-svg-icons";
import MaturityScoreCardDataBlock from "../../../../../common/metrics/data_blocks/base/MaturityScoreCardDataBlock";

function GitlabLeadTimeMaturityBlock({
  maturityScore,
  iconOverlayBody,
  maturityColor,
}) {
  return (
    <MaturityScoreCardDataBlock
      className={`p-1`}
      icon={faInfoCircle}
      text={"Maturity Score: "}
      maturityScore={maturityScore}
      iconOverlayBody={iconOverlayBody}
      maturityColor={maturityColor}
    />
  );
}

GitlabLeadTimeMaturityBlock.propTypes = {
  maturityScore: PropTypes.string,
  iconOverlayBody: PropTypes.string,
  maturityColor: PropTypes.string
};

export default GitlabLeadTimeMaturityBlock;
