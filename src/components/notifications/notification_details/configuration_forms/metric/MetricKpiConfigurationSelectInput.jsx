import React, {useState} from "react";
import PropTypes from "prop-types";
import KpiSelectInput from "components/common/list_of_values_input/admin/kpi_configurations/KpiSelectInput";

import {Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NumberInputBase from "components/common/inputs/text/NumberInputBase";
import NotificationConditionSelectInput
  from "components/common/list_of_values_input/notifications/NotificationConditionSelectInput";
import  NotificationConditionTriggerSelectInput
  from "components/common/list_of_values_input/notifications/NotificationConditionTriggerSelectInput";
import MetricNotificationConfigurationCardContainer
  from "components/notifications/notification_details/configuration_forms/metric/MetricNotificationConfigurationCardContainer";

import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function MetricKpiConfigurationSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  const [currentKpi, setCurrentKpi] = useState(undefined);
  const [dataPoints, setDataPoints] = useState(undefined);

  // Faseeh, here is where you add what fields you pull off of the KPI configuration to the data object
  const validateAndSetData = (fieldName, value) => {
    const newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value["identifier"]);
    newDataObject.setData("conditionIf", value["yAxis"]);
    setDataPoints(value["dataPoints"])
    setCurrentKpi(value);
    setDataObject({...newDataObject});
  }

  const setDataPoint = (fieldName, value) => {
    console.log(value)
    console.log(value["name"])
    const newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value["name"]);
    newDataObject.setData("conditionIf", value["type"]);
    setDataObject({...newDataObject});
  }

  const getImage = () => {
    if (currentKpi != null) {
      return <Image src={currentKpi["thumbnailPath"]} className="kpi-image-2" />;
    }
  };

  return (
    <Row className="mt-2">
      <Col lg={6}>
        <div className="ml-2">
          <MetricNotificationConfigurationCardContainer>
            <Row>
              <Col lg={12}>
                <KpiSelectInput
                  fieldName={fieldName}
                  dataObject={dataObject}
                  setDataObject={setDataObject}
                  setDataFunction={validateAndSetData}
                  setCurrentKpi={setCurrentKpi}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <SelectInputBase
                  fieldName="dataPoint"
                  dataObject={dataObject}
                  setDataObject={setDataObject}
                  selectOptions={dataPoints}
                  setDataFunction={setDataPoint}
                  valueField="value"
                  textField="name"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <NotificationConditionTriggerSelectInput dataObject={dataObject} setDataObject={setDataObject} />
              </Col>
              <Col lg={4}>
                <NotificationConditionSelectInput dataObject={dataObject} setDataObject={setDataObject}/>
              </Col>
              <Col lg={4}>
                <NumberInputBase dataObject={dataObject} setDataObject={setDataObject} fieldName={"threshold"} formatType={dataObject.getData("conditionIf")}/>
              </Col>
            </Row>
          </MetricNotificationConfigurationCardContainer>
        </div>
      </Col>
      <Col lg={6}>
        {getImage()}
      </Col>
    </Row>
  );
}

MetricKpiConfigurationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

MetricKpiConfigurationSelectInput.defaultProps = {
  fieldName: "kpi_identifier"
};

export default MetricKpiConfigurationSelectInput;