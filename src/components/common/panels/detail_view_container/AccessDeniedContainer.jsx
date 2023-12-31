import React from "react";
import PropTypes from "prop-types";
import ScreenContainerTitleBar from "components/common/fields/ScreenContainerTitleBar";
import AccessDeniedMessage from "components/common/status_notifications/AccessDeniedMessage";
import { faExclamationTriangle } from "@fortawesome/pro-light-svg-icons";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import useComponentStateReference from "hooks/useComponentStateReference";

const HEIGHT = `calc(${screenContainerHeights.SCREEN_CONTAINER_HEIGHT} - ${screenContainerHeights.CONTENT_BLOCK_FOOTER_HEIGHT} - 22px)`;
const BODY_HEIGHT = `calc(${HEIGHT} - 48px)`;

export default function AccessDeniedContainer(
  {
    navigationTabContainer,
    customMessage,
  }) {
  const {
    isOpseraAdministrator,
    isFreeTrial
  } = useComponentStateReference();

  const getTopNavigation = () => {
    if (navigationTabContainer) {
      return (
        <div className={"mb-3"}>
          {navigationTabContainer}
        </div>
      );
    }

    if (isFreeTrial !== true || isOpseraAdministrator !== true) {
      return (
        <div className={"mb-3"}>
          <div className={"sub-navigation-block"} />
        </div>
      );
    }
  };

  return (
    <div className={"max-content-width hide-x-overflow"}>
      {getTopNavigation()}
      <div
        className={"screen-container content-container content-card-1"}
        style={{
          minHeight: HEIGHT,
        }}
      >
        <div className={"px-3 content-block-header title-text-header-1 py-2 d-flex"}>
          <div className={"my-auto w-100"}>
            <ScreenContainerTitleBar
              titleIcon={faExclamationTriangle}
              title={"Access Denied!"}
            />
          </div>
        </div>
        <CenteredContentWrapper
          minHeight={BODY_HEIGHT}
        >
          <AccessDeniedMessage
            text={customMessage}
          />
        </CenteredContentWrapper>
      </div>
    </div>
  );
}

AccessDeniedContainer.propTypes = {
  navigationTabContainer: PropTypes.object,
  customMessage: PropTypes.string,
};