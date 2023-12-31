import React, { useEffect } from "react";
import PropTypes from "prop-types";
import OverlayTitleBar from "components/common/overlays/OverlayTitleBar";
import CloseButton from "components/common/buttons/CloseButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LoadingDialog from "components/common/status_notifications/loading";
import useComponentStateReference from "hooks/useComponentStateReference";

export const CONFIRMATION_OVERLAY_DEFAULT_HEIGHT = "250px";

function ConfirmationOverlay(
  {
    children,
    actionBar,
    titleText,
    titleIcon,
    showPanel,
    closePanel,
    isLoading,
    showToasts,
    showCloseButton,
    buttonContainer,
    pageLink,
    linkTooltipText,
    height,
  }) {
  const {
    toastContext,
    isFreeTrial,
  } = useComponentStateReference();

  useEffect(() => {
    if (showToasts) {
      toastContext.removeInlineMessage();
    }
  }, [showPanel]);

  const getButtons = () => {
    if (buttonContainer) {
      return buttonContainer;
    }

    if (showCloseButton === true) {
      return (
        <SaveButtonContainer>
          <CloseButton
            className={"p-3"}
            size={"sm"}
            closeEditorCallback={closePanel}
            showUnsavedChangesMessage={false}
          />
        </SaveButtonContainer>
      );
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    return children;
  };

  const getStyling = () => {
    if (isFreeTrial === true) {
      return "screen-container confirmation-overlay content-card-1";
    }

    return "confirmation-overlay content-card-1 bg-white";
  };

  if (showPanel === false) {
    return null;
  }

  return (
    <div className={`overlay-panel center-overlay-shadow-background`}>
      <div className={"confirmation-overlay-panel"}>
        <div className={getStyling()}>
          <OverlayTitleBar
            handleClose={closePanel}
            isLoading={isLoading}
            titleText={titleText}
            titleIcon={titleIcon}
            pageLink={pageLink}
            linkTooltipText={linkTooltipText}
          />
          {actionBar}
          <div
            className={"confirmation-overlay-panel-body bg-white"}
            style={{
              minHeight: height,
            }}
          >
            {showToasts && toastContext?.getInlineBanner()}
            <div className={"d-flex bg-white confirmation-overlay-panel-body-text"}>
              {getBody()}
            </div>
          </div>
          <div className={"mt-auto bg-white"}>
            {getButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}

ConfirmationOverlay.propTypes = {
  children: PropTypes.any,
  titleText: PropTypes.string,
  showPanel: PropTypes.bool,
  titleIcon: PropTypes.object,
  closePanel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  showToasts: PropTypes.bool,
  actionBar: PropTypes.object,
  showCloseButton: PropTypes.bool,
  buttonContainer: PropTypes.object,
  pageLink: PropTypes.string,
  linkTooltipText: PropTypes.string,
  height: PropTypes.string,
};

ConfirmationOverlay.defaultProps = {
  showCloseButton: true,
  height: CONFIRMATION_OVERLAY_DEFAULT_HEIGHT,
};

export default ConfirmationOverlay;


