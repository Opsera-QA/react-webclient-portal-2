import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";

function TotalFunctionalTestsDataBlock({ defects, dataPoint }) {
  return (
    <DataBlockBoxContainer showBorder={true}>
        <TwoLineScoreDataBlock
          className="m-3"
          score={defects}
          dataPoint={dataPoint}
          subtitle={"Total Number of Functional Test Cases"}
        />
    </DataBlockBoxContainer>
  );
}

TotalFunctionalTestsDataBlock.propTypes = {
  defects: PropTypes.number,
  dataPoint: PropTypes.object
};

export default TotalFunctionalTestsDataBlock;