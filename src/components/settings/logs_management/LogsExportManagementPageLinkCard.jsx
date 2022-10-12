import React from "react";
import BreadcrumbPageLinkCard from "components/common/card/link/BreadcrumbPageLinkCard";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function LogsExportManagementPageLinkCard() {
  const {
    isSiteAdministrator,
    isOpseraAdministrator,
    isPowerUser,
    isSaasUser,
  } = useComponentStateReference();

  if (
    (isSiteAdministrator !== true
    && isOpseraAdministrator !== true
    && isPowerUser !== true)
    || isSaasUser !== false
  ) {
    return null;
  }

  return (
    <BreadcrumbPageLinkCard
      breadcrumbDestination={"logsExportManagement"}
    />
  );
}