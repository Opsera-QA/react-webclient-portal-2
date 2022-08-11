import React, { useState } from "react";
import PropTypes from "prop-types";
import PipelineLandingDataBlockWidgets
  from "components/trial/pipelines/data_blocks/PipelineLandingDataBlockWidgets";
import PipelineWidgetsHeader from "components/trial/pipelines/widgets/PipelineWidgetsHeader";
import PipelineWidgetsBody from "components/trial/pipelines/widgets/PipelineWidgetsBody";

export default function PipelinesLanding() {
  const [selectedPipelineId, setSelectedPipelineId] = useState(undefined);

  return (
    <div className={"max-content-width"}>
      <div className={"mt-3"}>
        <PipelineLandingDataBlockWidgets />
      </div>
      <div className={"mt-3"}>
        <PipelineWidgetsHeader
          selectedPipelineId={selectedPipelineId}
          setSelectedPipelineId={setSelectedPipelineId}
        />
      </div>
      <div>
        <PipelineWidgetsBody />
      </div>
    </div>
  );
}

PipelinesLanding.propTypes = {
  activeTab: PropTypes.string,
  handleTabClick: PropTypes.func,
};