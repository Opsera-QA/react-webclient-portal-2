import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolTypeEditorPanel from "./ToolTypeEditorPanel";
import CustomTabContainer from "../../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

function ToolTypeDetailPanel({ toolTypeData, setToolTypeData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
    console.log(activeTab);
    e.preventDefault();
    setTabSelection(activeTab);
  };

  return (
    <>
      <div className="pb-3 px-3">
        <Row>
          <Col>
            <CustomTabContainer>
              <CustomTab icon={faCogs} tabName={"settings"} handleTabClick={handleTabClick} activeTab={activeTab} tabText={"Settings"} />
            </CustomTabContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="tabbed-content-block detail-view-detail-panel">
              {toolTypeData && <ToolTypeDetailsView activeTab={activeTab} setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function ToolTypeDetailsView({ activeTab, setToolTypeData, toolTypeData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab]);
  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <ToolTypeEditorPanel setToolTypeData={setToolTypeData} toolTypeData={toolTypeData} />;
    default:
      return null;
    }
  }
}

ToolTypeDetailPanel.propTypes = {
  toolTypeData: PropTypes.object,
  setToolTypeData: PropTypes.func,
};

export default ToolTypeDetailPanel;


