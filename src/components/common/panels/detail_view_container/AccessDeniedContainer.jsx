import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";
import AccessDeniedDialog from "components/common/status_notifications/accessDeniedInfo";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";

function AccessDeniedContainer() {
  return (
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={"accessDenied"} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          <FontAwesomeIcon icon={faExclamationTriangle} fixedWidth className="mr-1"/>Access Denied!
        </div>
        <div className="p-2 mt-2 shaded-container detail-container-body">
          <div className="p-3 shaded-panel">
            <div className="info-text text-center m-auto">
              <AccessDeniedDialog />
            </div>
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}

AccessDeniedContainer.propTypes = {
};

export default AccessDeniedContainer;