import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import PipelineSelectionList from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionList";
import SelectedPipelineList from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineSelectionPanel(
  {
    model,
    setModel,
    fieldName,
    selectionListTitle,
    selectedListTitle,
  }) {
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  return (
    <DetailPanelContainer>
      <Row>
        <Col lg={12} xl={6} className={"my-2"}>
          <PipelineSelectionList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
            customTitle={selectionListTitle}
          />
        </Col>
        <Col lg={12} xl={6} className={"my-2"}>
          <SelectedPipelineList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
            customTitle={selectedListTitle}
          />
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

PipelineSelectionPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  selectionListTitle: PropTypes.string,
  selectedListTitle: PropTypes.string,
};
