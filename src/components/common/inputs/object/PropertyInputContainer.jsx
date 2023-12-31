import React from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {faExclamationTriangle, faPlus, faTrash} from "@fortawesome/pro-light-svg-icons";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import IconBase from "components/common/icons/IconBase";

function PropertyInputContainer(
  {
    children,
    isLoading,
    titleIcon,
    titleText,
    field,
    errorMessage,
    addProperty,
    clearDataFunction,
    type,
    addAllowed,
    helpComponent,
    incompleteRowMessage,
    model,
  }) {
  const getClearDataButton = () => {
    if (clearDataFunction) {
      return (
        <Button className={"mr-2"} variant="danger" disabled={!addAllowed} onClick={() => clearDataFunction()} size="sm">
          <span className="text-white"><IconBase className={"text-white mr-2"} icon={faTrash}/>Remove All {type}s</span>
        </Button>
      );
    }
  };

  const getAddPropertyButton = () => {
    if (addProperty) {
      return (
        <Button variant="secondary" disabled={!addAllowed} onClick={() => addProperty()} size="sm">
          <span className="text-white"><IconBase className={"text-white mr-2"} icon={faPlus}/>Add {type}</span>
        </Button>
      );
    }
  };

  const getIncompleteRowBlock = () => {
    if (incompleteRowMessage != null) {
      return (
        <div className="w-100 m-2 text-muted small">
          <IconBase className={"text-warning mr-1"} icon={faExclamationTriangle}/>
          <span className="mt-1">{incompleteRowMessage}</span>
        </div>
      );
    }
  };

  return (
    <div className="object-properties-input">
      <div className="content-container content-container-curved-top">
        <InputTitleBar
          icon={titleIcon}
          isLoading={isLoading}
          helpComponent={helpComponent}
          customTitle={titleText}
          />
        {children}
        <Row className={"d-flex justify-content-between mx-0"}>
          <div className={"mt-auto"}>
            {getIncompleteRowBlock()}
          </div>
          <div className={"ml-auto m-2 d-flex"}>
            {getClearDataButton()}
            {getAddPropertyButton()}
          </div>
        </Row>
      </div>
      <InfoText
        model={model}
        fieldName={field?.id}
        field={field}
        errorMessage={errorMessage}
      />
    </div>
  );
}

PropertyInputContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  children: PropTypes.any,
  field: PropTypes.object,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  addProperty: PropTypes.func,
  addAllowed: PropTypes.bool,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  incompleteRowMessage: PropTypes.string,
  model: PropTypes.object,
  clearDataFunction: PropTypes.func,
};

export default PropertyInputContainer;