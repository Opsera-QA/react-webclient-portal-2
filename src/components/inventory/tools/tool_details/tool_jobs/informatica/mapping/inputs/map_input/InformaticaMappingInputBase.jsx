import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import InformaticaMappingInputRow from "./InformaticaMappingInputRow";

function InformaticaMappingInputBase({ fieldName, model, setModel, helpComponent, disabled, className }) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [mapRows, setMapRows] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    unpackData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedRoles = currentData;
    } else {
      unpackedRoles.push({type: "", regex: ""});
    }

    setMapRows([...unpackedRoles]);
  };

  const validateAndSetData = (newRoleList) => {
    setMapRows([...newRoleList]);
    let newModel = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of mappings. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
        const type = item?.type;
        const regex = item?.regex;

        if (type === "" || regex === "") {
          return;
        }
        newArray.push(item);      
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isMappingComplete = (threshold) => {
    return threshold?.type !== "" && threshold?.regex !== "";
  };

  const lastMappingComplete = () => {

    let newMappingList = mapRows;
    if (newMappingList.length === 0) {
      return true;
    }

    if(hasDuplicates(newMappingList)) {
      return false;
    }
    let lastObject = newMappingList[newMappingList.length - 1];
    return isMappingComplete(lastObject);
  };

  const hasDuplicates = (mapRows) => {
    let permittedValues = mapRows.map(value => value.type);
    const noDups = new Set(permittedValues);
    // console.log(permittedValues.length !== noDups.size);
    return permittedValues.length !== noDups.size;
  };

  const addRow = () => {
    let newMappingList = mapRows;

    if (lastMappingComplete()) {
      let newRow = {type: "", regex: ""};
      newMappingList.push(newRow);
      validateAndSetData(newMappingList);
    }
  };

  const deleteRow = (index) => {
    let newMappingList = mapRows;
    newMappingList.splice(index, 1);
    validateAndSetData(newMappingList);
  };

  const updateRow = (index, innerField, newValue) => {
    let newMappingList = mapRows;

    if (newMappingList[index][innerField] !== newValue) {
      newMappingList[index][innerField] = newValue;
      validateAndSetData(newMappingList);
    }
  };

  const getDisabledMappings = () => {
    if (mapRows.length > 0) {
      const disabledMappings = [];
      mapRows.map((property) => {
        disabledMappings.push(property?.type);
      });
      // console.log(disabledMappings);
      return disabledMappings;
    }
  };

  const getFieldBody = () => {
    if (!mapRows || mapRows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No Mapping have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {mapRows.map((threshold, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <InformaticaMappingInputRow
                disabled={disabled}
                index={index}
                deleteRow={deleteRow}
                disabledMappings={getDisabledMappings()}
                type={threshold?.type}
                regex={threshold?.regex}
                updateType={(newValue) => updateRow(index, "type", newValue)}
                updateRegex={(newValue) => updateRow(index, "regex", newValue)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex py-1">
        <Col sm={11}>
          <Row>
            <Col sm={6}>
              <span className="text-muted ml-5">Type</span>
            </Col>
            <Col sm={6} className={"mx-auto"}>
              <span className="text-muted">Regex</span>
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteMessage = () => {
    if (!lastMappingComplete()) {
      return (`Incomplete Mappings Will Be Removed Upon Saving and Duplicate Types are not allowed`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getThresholdMessage = () => {
    return (`If a Mapping Type is not assigned, regex validation will be ignored.`);
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={className}>
      <PropertyInputContainer
        titleIcon={faClipboardListCheck}
        field={field}
        addProperty={addRow}
        titleText={field?.label}
        errorMessage={errorMessage}
        type={"Mapping"}
        addAllowed={lastMappingComplete() && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
      <InfoText customMessage={getThresholdMessage()} />
    </div>
  );
}

InformaticaMappingInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default InformaticaMappingInputBase;