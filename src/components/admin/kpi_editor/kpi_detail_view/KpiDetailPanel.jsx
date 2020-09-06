import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import KpiEditorPanel from "./KpiEditorPanel";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import CustomTab from "../../../common/tabs/CustomTab";
import {faCogs} from "@fortawesome/pro-solid-svg-icons/faCogs";

function KpiDetailPanel({ kpiData, setKpiData }) {
  const [activeTab, setTabSelection] = useState("settings");

  const handleTabClick = (activeTab) => e => {
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
            <div className="tabbed-content-block">
              {kpiData && <TagDetailsView activeTab={activeTab} setKpiData={setKpiData} kpiData={kpiData} /> }
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

function TagDetailsView({ activeTab, setKpiData, kpiData }) {
  useEffect(() => {
    // console.log("CHANGE HAPPENED");
  }, [activeTab, kpiData]);

  if (activeTab) {
    switch (activeTab) {
    case "settings":
      return <KpiEditorPanel setKpiData={setKpiData} kpiData={kpiData} />;
    default:
      return null;
    }
  }
}

KpiDetailPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  canDelete: PropTypes.bool
};

export default KpiDetailPanel;


