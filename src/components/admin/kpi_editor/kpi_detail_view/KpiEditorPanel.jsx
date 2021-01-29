import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "components/common/status_notifications/loading";
import WebsitePathInput from "components/common/inputs/text/WebsitePathInput";
import JsonInput from "components/common/inputs/object/JsonInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import KpiActions from "components/admin/kpi_editor/kpi-editor-actions";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import KpiChartTypeInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiChartTypeInput";
import KpiToolsInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiToolsInput";
import KpiFiltersInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiFiltersInput";
import KpiCategoriesInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiCategoriesInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import  NotificationConditionTriggerSelectInput
  from "components/common/list_of_values_input/notifications/NotificationConditionTriggerSelectInput";

function KpiEditorPanel({ kpiData, setKpiData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [kpiDataDto, setKpiDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setKpiDataDto(kpiData);
    setIsLoading(false);
  };

  const createKpi = async () => {
    return await KpiActions.createKpi(kpiDataDto, getAccessToken);
  }

  const updateKpi = async () => {
   return await KpiActions.updateKpi(kpiDataDto, getAccessToken);
  };

  if (kpiDataDto == null) {
    return <Loading size="sm" />;
  }

  return (
    <EditorPanelContainer
      updateRecord={updateKpi}
      recordDto={kpiDataDto}
      createRecord={createKpi}
      setRecordDto={setKpiDataDto}
      handleClose={handleClose}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase dataObject={kpiDataDto} fieldName={"name"} setDataObject={setKpiDataDto}/>
          <TextInputBase dataObject={kpiDataDto} fieldName={"identifier"} setDataObject={setKpiDataDto}/>
          <KpiChartTypeInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <KpiToolsInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <KpiFiltersInput dataObject={kpiDataDto} fieldName={"supported_filters"} setDataObject={setKpiDataDto} />
          <JsonInput dataObject={kpiDataDto} fieldName={"dataPoints"} setDataObject={setKpiDataDto}/>
          <KpiCategoriesInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} />
          <NotificationConditionTriggerSelectInput dataObject={kpiDataDto} setDataObject={setKpiDataDto} fieldName={"yAxis"}/>
          <WebsitePathInput dataObject={kpiDataDto} fieldName={"thumbnailPath"} setDataObject={setKpiDataDto}/>
        </Col>
        <Col lg={6}>
          <JsonInput dataObject={kpiDataDto} fieldName={"settings"} setDataObject={setKpiDataDto}/>
        </Col>
        <Col lg={12}>
          <TextAreaInput dataObject={kpiDataDto} fieldName={"description"} setDataObject={setKpiDataDto}/>
          
          <div className="text-muted pl-1 pb-1">Policy Support:</div>
          <ActivityToggleInput setDataObject={setKpiDataDto} fieldName={"policySupport"} dataObject={kpiData}/>
          
          <div className="text-muted pl-1 pb-1">Status:</div>
          <ActivityToggleInput setDataObject={setKpiDataDto} fieldName={"active"} dataObject={kpiData}/>
        </Col>
      </Row>
    </EditorPanelContainer>
  );
}

KpiEditorPanel.propTypes = {
  kpiData: PropTypes.object,
  setKpiData: PropTypes.func,
  handleClose: PropTypes.func,
};

export default KpiEditorPanel;


