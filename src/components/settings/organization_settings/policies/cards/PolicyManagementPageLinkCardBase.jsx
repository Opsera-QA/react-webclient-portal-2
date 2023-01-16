import React from "react";
import PropType from "prop-types";
import {useHistory} from "react-router-dom";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {policyHelper} from "components/settings/organization_settings/policies/policy.helper";
import policyConstants from "@opsera/definitions/constants/settings/organization-settings/policies/policy.constants";

export default function PolicyManagementPageLinkCardBase(
  {
    policy,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const history = useHistory();

  const handleOnClickFunction = () => {
    history.push(policyHelper.getDetailViewLink(policy?._id));
  };

  const getTitle = () => {
    return (
      <div className={"w-100 d-flex justify-content-between"}>
        <div>{policyConstants.getPolicyNameLabel(policy?.name)}</div>
        <div>
          {/*<div className={"ml-auto"}><b>{DataParsingHelper.parseNumber(siteRole.memberCount, 0)}</b> Users</div>*/}
        </div>
      </div>
    );
  };

  const getBody = () => {
    return (
      <div>
        {/*{breadcrumb?.pageDescription}*/}
      </div>
    );
  };

  return (
    <SelectionCardBase
      titleText={getTitle()}
      body={getBody()}
      // icon={breadcrumb?.icon}
      onClickFunction={handleOnClickFunction}
      className={"my-3"}
    />
  );
}

PolicyManagementPageLinkCardBase.propTypes = {
  policy: PropType.object,
};
