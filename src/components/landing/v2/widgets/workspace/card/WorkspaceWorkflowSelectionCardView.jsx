import React from "react";
import PropTypes from "prop-types";
import VanitySetCardView from "components/common/card/VanitySetCardView";
import { workspaceConstants } from "components/workspace/workspace.constants";
import VerticalCardViewBase from "components/common/card_view/VerticalCardViewBase";
import WorkflowPipelineCard from "components/landing/v2/widgets/workspace/card/WorkflowPipelineCard";
import WorkflowTaskCard from "components/landing/v2/widgets/workspace/card/WorkflowTaskCard";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";
import { heightHelper } from "temp-library-components/helpers/height/height.helper";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoRegisteredWorkflowsCard from "components/wizard/free_trial/workflows/NoRegisteredWorkflowsCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function WorkspaceWorkflowSelectionCardView(
  {
    workflowFilterModel,
    workspaceItems,
    loadData,
    isLoading,
    selectedWorkflowItem,
    setSelectedWorkflowItem,
    heightSize,
    hasTitleBar,
    hasMoreItems,
    loadMoreWorkflows,
  }) {
  const getWorkspaceItemCard = (workspaceItem) => {
    switch (workspaceItem?.workspaceType) {
      case workspaceConstants.WORKSPACE_ITEM_TYPES.PIPELINE:
        return (
          <WorkflowPipelineCard
            pipeline={workspaceItem}
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={setSelectedWorkflowItem}
          />
        );
      case workspaceConstants.WORKSPACE_ITEM_TYPES.TASK:
        return (
          <WorkflowTaskCard
            selectedFlow={selectedWorkflowItem}
            setSelectedFlow={setSelectedWorkflowItem}
            task={workspaceItem}
          />
        );
    }
  };

  const getMinimumHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      const widgetPixelSize = widgetHelper.getWidgetPixelSize(heightSize);

      if (hasTitleBar !== false) {
        return heightHelper.subtractTitleBarHeightForCssHeight(widgetPixelSize);
      }

      return widgetPixelSize;
    }
  };

  const getBody = () => {
    const searchKeyword = DataParsingHelper.parseString(workflowFilterModel?.getData('search'));

    if (
      isLoading !== true
      // && searchKeyword
      && (!Array.isArray(workspaceItems) || workspaceItems.length === 0)
    ) {
      return (
        <NoRegisteredWorkflowsCard
          loadDataFunction={loadData}
          className={"m-3"}
        />
        // <Row className={"my-2"}>
        //   <Col xs={0} sm={0} md={0} lg={2} xl={3} />
        //   <Col xs={12} sm={12} md={12} lg={8} xl={6}>
        //     <NoRegisteredWorkflowsCard
        //       loadDataFunction={loadData}
        //     />
        //   </Col>
        //   <Col xs={0} sm={0} md={0} lg={2} xl={3} />
        // </Row>
      );
    }

    return (
      <VerticalCardViewBase
        getCardFunction={getWorkspaceItemCard}
        data={workspaceItems}
        isLoading={isLoading}
        hasMoreItems={hasMoreItems}
        loadMoreItems={loadMoreWorkflows}
        minHeight={"250px"}
      />
    );
  };


  return (
    <VanitySetCardView
      isLoading={isLoading}
      loadData={loadData}
      paginationModel={workflowFilterModel}
      minHeight={getMinimumHeight()}
      cards={getBody()}
    />
  );
}

WorkspaceWorkflowSelectionCardView.propTypes = {
  workspaceItems: PropTypes.array,
  workflowFilterModel: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  selectedWorkflowItem: PropTypes.object,
  setSelectedWorkflowItem: PropTypes.func,
  heightSize: PropTypes.number,
  hasTitleBar: PropTypes.bool,
  hasMoreItems: PropTypes.bool,
  loadMoreWorkflows: PropTypes.func,
};