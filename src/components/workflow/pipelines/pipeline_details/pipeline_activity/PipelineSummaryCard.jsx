import React from "react";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import PipelineSummaryCardContainer from "./PipelineSummaryCardContainer";
import PipelineLinkButton from "components/common/buttons/pipeline/PipelineLinkButton";
import TagField from "components/common/fields/multiple_items/TagField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";

function PipelineSummaryCard({ pipelineData, isLoading, loadPipelineInNewWindow }) {
  if (isLoading) {
    return <PipelineSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <PipelineSummaryCardContainer pipelineData={pipelineData} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={pipelineData} fieldName={"description"}/>
      </div>
      <div className="mb-2">
        <TagField dataObject={pipelineData} fieldName={"tags"}/>
      </div>
      <div className="d-flex justify-content-between">
        <DateFieldBase dataObject={pipelineData} fieldName={"createdAt"}/>
        <DateFieldBase dataObject={pipelineData} fieldName={"updatedAt"}/>
        <PipelineLinkButton pipelineId={pipelineData.getData("_id")} loadPipelineInNewWindow={loadPipelineInNewWindow}/>
      </div>
    </PipelineSummaryCardContainer>
  );
}

PipelineSummaryCard.propTypes = {
  pipelineData: PropTypes.object,
  isLoading: PropTypes.bool,
  loadPipelineInNewWindow: PropTypes.bool
};

PipelineSummaryCard.defaultProps = {
  loadPipelineInNewWindow: true
}

export default PipelineSummaryCard;
