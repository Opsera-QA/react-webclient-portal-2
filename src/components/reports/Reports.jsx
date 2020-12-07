import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingDialog from "../common/status_notifications/loading";
import AccessDeniedDialog from "../common/status_notifications/accessDeniedInfo";
import {DialogToastContext} from "../../contexts/DialogToastContext";
import ScreenContainer from "../common/panels/general/ScreenContainer";
import Row from "react-bootstrap/Row";
import BreadcrumbPageLink from "../common/links/BreadcrumbPageLink";

function Reports() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false)
    }
  }

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  if (!accessRoleData || isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (!accessRoleData.PowerUser && !accessRoleData.Administrator && !accessRoleData.OpseraAdministrator) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <ScreenContainer
      breadcrumbDestination={"reports"}
      pageDescription={"View reports from this dashboard."}
    >
      <Row className="ml-3">
        <BreadcrumbPageLink breadcrumbDestination={"toolReports"}/>
        <BreadcrumbPageLink breadcrumbDestination={"tagReports"}/>
        <BreadcrumbPageLink breadcrumbDestination={"pipelineReports"}/>
      </Row>
    </ScreenContainer>
  );
}

export default Reports;

