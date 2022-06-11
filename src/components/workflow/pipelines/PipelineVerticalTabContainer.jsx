import PropTypes from "prop-types";
import React from "react";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import {faBracketsCurly, faDraftingCompass, faMicrochip, faUser, faRss} from "@fortawesome/pro-light-svg-icons";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import cookieHelpers from "core/cookies/cookie-helpers";
import {useHistory} from "react-router-dom";

function PipelineVerticalTabContainer({ isLoading, pipelineFilterModel }) {
  const history = useHistory();

  const handleTabClick = (tab) => {
    cookieHelpers.setCookie("pipelines", "selectedTab", tab);
    history.push(`/workflow/${tab}`);
  };

  return (
    <VanitySetVerticalTabContainer>
      <VanitySetVerticalTab
        icon={faDraftingCompass}
        tabText={"All Pipelines"}
        tabName={"all"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View all Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faUser}
        tabText={"My Pipelines"}
        tabName={"owner"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Pipelines that you are the owner of."}
      />
      <VanitySetVerticalTab
        icon={faBracketsCurly}
        tabText={"Software Development"}
        tabName={"sdlc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Software Development Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faMicrochip}
        tabText={"Machine Learning"}
        tabName={"ai-ml"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Machine Learning Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faSalesforce}
        tabText={"Salesforce"}
        tabName={"sfdc"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Salesforce Pipelines that you have access to."}
      />
      <VanitySetVerticalTab
        icon={faRss}
        tabText={"Subscriptions"}
        tabName={"subscribed"}
        disabled={isLoading}
        handleTabClick={handleTabClick}
        activeTab={pipelineFilterModel?.getData("type")}
        tooltipText={"View Pipelines that you have access to and have subscribed to."}
      />
    </VanitySetVerticalTabContainer>
  );
}

PipelineVerticalTabContainer.propTypes = {
  isLoading: PropTypes.bool,
  pipelineFilterModel: PropTypes.object,
};

export default PipelineVerticalTabContainer;