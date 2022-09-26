import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import InlineErrorText from "components/common/status_notifications/inline/InlineErrorText";
import PropType from "prop-types";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { Col } from "react-bootstrap";

export default function RbacWarningField({ model }) {
  const currentData = model?.getCurrentData();
  const {
    userData,
    isSassUser,
  } = useComponentStateReference();

  if (isSassUser !== false) {
    return null;
  }

  if (ObjectAccessRoleHelper.doesObjectHaveRbacApplied(currentData) !== true) {
    return (
      <Col xs={12}>
        <CenteredContentWrapper>
          <InlineErrorText
            className={"mx-auto mb-2"}
            error={`Warning, this ${model.getType()} does not have Access Roles applied, so anyone can see and use it.`}
          />
        </CenteredContentWrapper>
      </Col>
    );
  }

  if (ObjectAccessRoleHelper.doesOnlyUserHaveAccessToObject(userData, currentData) === true) {
    return (
      <Col xs={12}>
        <CenteredContentWrapper>
          <InlineErrorText
            className={"mx-auto mb-2"}
            error={`Warning, only the owner ${model.getData("owner_name")} has access to this ${model.getType()}. Please adjust access rules if this ${model.getType()} is to be used by others.`}
          />
        </CenteredContentWrapper>
      </Col>
    );
  }

  return null;
}

RbacWarningField.propTypes = {
  model: PropType.object,
};