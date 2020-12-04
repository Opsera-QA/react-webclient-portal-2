import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly, faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import InfoText from "../form_fields/input/InfoText";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Combobox } from 'react-widgets'
import adminTagsActions from "../../settings/tags/admin-tags-actions";

function ObjectPropertiesInput({dataObject, setDataObject, fieldName, disabledFields}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let currentData = dataObject.getData(fieldName);

    if (currentData)
    {
      let items = [];

      Object.keys(currentData).map((key) => {
        items.push({name: key, value: currentData[key]})
      });

      if (items.length === 0) {
        items.push({name: "", value: ""});
      }

      setProperties([...items]);
    }
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = {...dataObject};

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of configuration items. Please remove one to add another.");
      return;
    }

    let newObject = {};

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((item) => {
        newObject[item.name] = item.value;
      });
    }

    newDataObject.setData(fieldName, {...newObject});
    setDataObject({...newDataObject});
  }

  const addProperty = () => {
    let newPropertyList = properties;
    let lastObject = newPropertyList[newPropertyList.length - 1];

    // Do not add another row if key is not configured for last row
    if (lastObject?.name === "") {
      return;
    }

    let newRow = {name: "", value: ""};
    newPropertyList.push(newRow);
    validateAndSetData(newPropertyList);
  };

  const deleteProperty = (index) => {
    let newPropertyList = properties
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const updateProperty = (row, innerField, value) => {
    let newPropertyList = properties
    let index = newPropertyList.indexOf(row);
    newPropertyList[index][innerField] = value;
    validateAndSetData(newPropertyList);
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth/>
      </Button>
    )
  };

  const getAddPropertyButton = () => {
    return (
      <Button variant="link" onClick={() => addProperty()}>
        <FontAwesomeIcon className="text-white" icon={faPlus} fixedWidth />
      </Button>
    );
  }

  const getPropertyRow = (property, index) => {
    return (
      <div className="d-flex my-2 justify-content-between" key={index}>
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-1"}>
              <Combobox
                data={adminTagsActions.configurationOptions}
                valueField={"id"}
                textField={"label"}
                value={property["name"]}
                filter={"contains"}
                suggest={true}
                placeholder={"Select or Type a New Property"}
                onChange={(value) => updateProperty(property, "name", value.id ? value.id : value)}
              />
            </Col>
            <Col sm={6} className={"pl-1 pr-0"}>
              <input
                className="form-control"
                type={"text"}
                value={property["value"]}
                onChange={(event) => updateProperty(property, "value", event.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    if (!properties || properties.length === 0) {
      return (
        <div className="text-center">
          <div className="text-muted no-data-message">No configuration properties have been added to this Tag</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {properties.map((property, index) => {
          return getPropertyRow(property, index);
        })}
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <Row>
        <Col className="mt-2" sm={11}>
          <span><FontAwesomeIcon icon={faBracketsCurly} fixedWidth className="mr-1"/>{field.label}</span>
        </Col>
        <Col sm={1} className={"pr-3 pl-1"}>
          {getAddPropertyButton()}
        </Col>
      </Row>
    );
  };


  if (field == null) {
    return <></>;
  }

  return (
    <div className="object-properties-input">
      <div className="content-container content-card-1">
        <div className="pl-2 pr-3 property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div className="properties-body">
          {getFieldBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
      <InfoText field={field} errorMessage={errorMessage} />
    </div>
  );
}

ObjectPropertiesInput.propTypes = {
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fields: PropTypes.array,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string
};

ObjectPropertiesInput.defaultProps = {
  disabledFields: []
}

export default ObjectPropertiesInput;