import React, { useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {
  endpointResponseFieldMetadata
} from "components/common/inputs/endpoints/endpoint/response/body/endpointResponseField.metadata";
import EndpointResponseBodyFieldInputRow
  from "components/common/inputs/endpoints/endpoint/response/body/EndpointResponseBodyFieldInputRow";

function EndpointResponseBodyInputBase(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [fields, setFields] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    loadData();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = () => {
    const currentData = model?.getData(fieldName);
    const items = Array.isArray(currentData) ? currentData : [];

    if (items.length === 0) {
      items.push({...endpointResponseFieldMetadata.newObjectFields});
    }

    setFields([...items]);
  };

  const validateAndSetData = (newFields) => {
    const newArray = Array.isArray(newFields) ? newFields : [];

    if (newArray.length === 0) {
      newFields.push({...endpointResponseFieldMetadata.newObjectFields});
    }

    setFields([...newFields]);
    const newModel = {...model};
    newModel.setData(fieldName, [...newFields]);
    setModel({...newModel});
  };

  const updateFieldFunction = (index, field) => {
    const newFields = [...fields];
    newFields[index] = field;
    validateAndSetData(newFields);
  };

  const addField = () => {
    const newFields = fields;
    newFields.push({...endpointResponseFieldMetadata.newObjectFields});
    validateAndSetData(newFields);
  };

  const deleteFieldFunction = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    validateAndSetData(newFields);
  };

  const getFieldBody = () => {
    if (!fields || fields.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted my-3">No fields have been added</div>
        </div>
      );
    }

    return (
      <div>
        {fields.map((fieldData, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <EndpointResponseBodyFieldInputRow
                index={index}
                deleteFieldFunction={() => deleteFieldFunction(index)}
                endpointBodyField={fieldData}
                updateFieldFunction={(newField) => updateFieldFunction(index, newField)}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <Row className={"d-flex py-1 justify-content-between"}>
        <Col xs={11}>
          <Row>
            <Col xs={5} className={"my-auto"}>
              <span className={'ml-3'}>Field Name</span>
            </Col>
            <Col xs={5} className={"my-auto"}>
              <span>Type</span>
            </Col>
            <Col xs={2}/>
          </Row>
        </Col>
        <Col xs={1}/>
      </Row>
    );
  };

  const getBody = () => {
    return (
      <div>
        <div className={"filter-bg-white"}>
          {getHeaderBar()}
        </div>
        <div className="fields-input">
          {getFieldBody()}
        </div>
      </div>
    );
  };

  const isFieldComplete = (field) => {
    return (
      hasStringValue(field?.fieldName) === true
      && hasStringValue(field?.type) === true
    );
  };

  const lastFieldComplete = () => {
    if (fields.length === 0) {
      return true;
    }

    return isFieldComplete(fields.lastItem);
  };

  if (field == null) {
    return null;
  }

  return (
    <div className={"my-2"}>
      <PropertyInputContainer
        titleIcon={faBracketsCurly}
        titleText={field?.label}
        addProperty={addField}
        type={"Field"}
        addAllowed={lastFieldComplete() === true}
      >
        {getBody()}
      </PropertyInputContainer>
    </div>
  );
}

EndpointResponseBodyInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EndpointResponseBodyInputBase;
