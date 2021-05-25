import React from "react";
import PropTypes from "prop-types";
import InfoText from "components/common/inputs/info_text/InfoText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Row from "react-bootstrap/Row";
import {Button} from "react-bootstrap";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";

function PropertyInputContainer({ children, titleIcon, titleText, field, errorMessage, addProperty, type, addAllowed, helpComponent, toggleButton }) {
  const getTitleBar = () => {
    return (
      <div className="pl-2 d-flex justify-content-between">
        <div className={"pt-2"}><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-2"/>{titleText}</div>
        <div>
          <LaunchHelpIcon helpComponent={helpComponent} className={"pt-2 pr-2"} />
          <div className={"pt-1 pr-1"}>{toggleButton}</div>
        </div>
      </div>
    );
  };

  const getAddPropertyButton = () => {
    if (addProperty) {
      return (
        <Row>
          <div className="ml-auto mt-2 mr-3 d-flex">
            <Button variant="secondary" disabled={!addAllowed} onClick={() => addProperty()} size="sm">
              <span className="text-white"><FontAwesomeIcon className="text-white mr-2" icon={faPlus} fixedWidth />Add {type}</span>
            </Button>
          </div>
        </Row>
      );
    }
  };

  return (
    <div className="object-properties-input">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        {children}
      </div>
      <div>{getAddPropertyButton()}</div>
      <InfoText field={field} errorMessage={errorMessage}/>
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
  toggleButton: PropTypes.object
};

export default PropertyInputContainer;