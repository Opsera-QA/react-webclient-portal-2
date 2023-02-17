import React, {useState} from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {truncateString} from "components/common/helpers/string-helpers";

export function PipelineSelectionCard(
  {
    pipeline, 
    selectedPipelines, 
    setSelectedPipelines,
  }) {
  const [pipelineSelected, setPipelineSelected] = useState(false);

  const selectPipeline = () => {
    const selectPipeline = !pipelineSelected;
    setPipelineSelected(selectPipeline);

    if (selectPipeline) {
      if (!selectedPipelines.includes(pipeline)) {
        selectedPipelines.push(pipeline);
        setSelectedPipelines([...selectedPipelines]);
      }
    } else {
      if (selectedPipelines.includes(pipeline)) {
        setSelectedPipelines([...selectedPipelines.filter(selectedPipeline => selectedPipeline._id !== pipeline?._id)]);
      }
    }
  };

  return (
    <li key={pipeline._id} className={selectedPipelines.includes(pipeline) ? "p-1 member-list selected" : "p-1 member-list"} onClick={selectPipeline}>
      <Row className={"mx-0"}>
        <Col lg={12} xl={6} className={"no-wrap-inline"}>{truncateString(pipeline.name, 50)}</Col>
        <Col lg={12} xl={6} className={selectedPipelines.includes(pipeline) ? "d-flex w-100" : "d-flex w-100 text-muted"}>
          <div>{pipeline.owner_name}</div>
        </Col>
      </Row>
    </li>
  );
}

PipelineSelectionCard.propTypes = {
  pipeline: PropTypes.object,
  selectedPipelines: PropTypes.array,
  setSelectedPipelines: PropTypes.func,
};
