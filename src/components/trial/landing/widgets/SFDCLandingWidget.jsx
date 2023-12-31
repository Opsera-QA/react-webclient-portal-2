import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import { faLinkedin, faYoutube, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FreeTrialLaunchSalesforceWorkflowWizardOverlay
  from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";

const EXTERNAL_LINKS = {
  YOUTUBE_CHANNEL: "https://youtube.com/channel/UCJJFTWPkGfK8Kq4nPbNAtaQ",
  LINKEDIN: "https://www.linkedin.com/company/opsera/",
  FACEBOOK: "https://www.facebook.com/opseraio/",
  TWITTER: "https://twitter.com/opseraio",
  SALESFORCE_APPEXCHANGE: "https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3u00000PGa51EAD",
};

const SOCIAL_ICONS = {
  YOUTUBE: faYoutube,
  YOUTUBE_COLOR: "#FF0000",
  YOUTUBE_TOOLTIP: "Opsera Youtube Channel",
  LINKEDIN: faLinkedin,
  LINKEDIN_COLOR: "#0072b1",
  LINKEDIN_TOOLTIP: "Opsera on LinkedIn",
  FACEBOOK: faFacebook,
  FACEBOOK_TOOLTIP: "Get Social with Opsera on Facebook",
  FACEBOOK_COLOR: "#3B5998",
  TWITTER: faTwitter,
  TWITTER_COLOR: "#1DA1F2",
  TWITTER_TOOLTIP: "Opsera on Twitter",
};

export default function SFDCLandingWidget({ className }) {
  const {
    themeConstants,
    userData,
    toastContext,
  } = useComponentStateReference();


  const launchWorkflowCreationWizard = () => {
    toastContext.showOverlayPanel(
      <FreeTrialLaunchSalesforceWorkflowWizardOverlay
      />,
    );
  };


  const handleClick = (url) => e => {
    //window.location.href = url;
    window.open(url, "_blank");
  };

  const getSocialAccountLogo = (url, icon, color, tooltip) => {

    if (!tooltip) {
      tooltip = "Click here.";
    }

    return (
      <TooltipWrapper
        innerText={tooltip}
        placement={"bottom"}
      >
        <div className={"marketingModulesText pointer"} style={{ float: "left", bottom: "20px" }}
             onClick={handleClick(url)}>
          <IconBase
            icon={icon}
            iconSize={"2xl"}
            iconStyling={{
              color: color,
            }}
          />
        </div>
      </TooltipWrapper>
    );
  };


  return (
    <div className={className} style={{ minHeight: "150px", width: "90%" }}>

      <Row className={"m-3"}>
        <Col style={{ textAlign: "center" }}>
          <TooltipWrapper
            innerText={"Get started with Salesforce on Opsera!"}
            placement={"bottom"}
          >
            <div className={"pointer focusText"}
                 onClick={launchWorkflowCreationWizard}>
              <img alt="Get started with Salesforce on Opsera!"
                   src="/img/salesforce/salesforce_logo_white_475x332.png"
                   width="220"
                   height="154"
                   style={{ marginRight: "10px" }}
              />
              Get Started by clicking here!
            </div>
          </TooltipWrapper>
        </Col>
        <Col>

          <div className={"h-100"} style={{ textAlign: "center", paddingTop: "50px", paddingLeft: "50px" }}>
            <TooltipWrapper
              innerText={"Opsera is available on Salesforce AppExchange!"}
              placement={"bottom"}
            >
              <div>
                <span className={"focusText"}>Opsera On</span>
                <img alt="Opsera is available on Salesforce AppExchange!"
                     src="/img/salesforce/salesforce_appexchange_240x80.png"
                     width="240"
                     height="80"
                     onClick={handleClick(EXTERNAL_LINKS.SALESFORCE_APPEXCHANGE)}
                     className={"pointer"}
                />
              </div>
            </TooltipWrapper>
          </div>
          <div className={"w-100"} style={{ textAlign: "right" }}>
            <div style={{ position: "relative", float: "right" }}>
              {getSocialAccountLogo(EXTERNAL_LINKS.YOUTUBE_CHANNEL, SOCIAL_ICONS.YOUTUBE, SOCIAL_ICONS.YOUTUBE_COLOR, SOCIAL_ICONS.YOUTUBE_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.LINKEDIN, SOCIAL_ICONS.LINKEDIN, SOCIAL_ICONS.LINKEDIN_COLOR, SOCIAL_ICONS.LINKEDIN_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.TWITTER, SOCIAL_ICONS.TWITTER, SOCIAL_ICONS.TWITTER_COLOR, SOCIAL_ICONS.TWITTER_TOOLTIP)}
              {getSocialAccountLogo(EXTERNAL_LINKS.FACEBOOK, SOCIAL_ICONS.FACEBOOK, SOCIAL_ICONS.FACEBOOK_COLOR, SOCIAL_ICONS.FACEBOOK_TOOLTIP)}
            </div>
          </div>


        </Col>
      </Row>


    </div>
  );
}

SFDCLandingWidget.propTypes = {
  className: PropTypes.string,
};