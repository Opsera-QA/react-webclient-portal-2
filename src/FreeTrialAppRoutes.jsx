import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "./components/login/LoginForm";
import { Route, useHistory } from "react-router-dom";
import { SecureRoute, LoginCallback } from "@okta/okta-react";
import Home from "./Home";
import Logout from "./components/login/Logout";
import About from "./components/about/About";
import Pricing from "./components/about/Pricing";
import OnlineHelp from "./components/about/Help";
import Signup from "components/user/signup/Signup";
import AdminTools from "./components/admin/AdminTools";
import RegisteredUsersManagement from "./components/admin/registered_users/RegisteredUsersManagement";
import RegisteredUserDetailView
  from "./components/admin/registered_users/details/RegisteredUserDetailView";
import ManageSystems from "./components/admin/manage_systems/ManageSystems";
import ReportsRegistration from "./components/admin/analytics/ReportsRegistration";
import KpiIdentifierManagement from "components/admin/kpi_identifiers/KpiIdentifierManagement";
import KpiIdentifierDetailView from "components/admin/kpi_identifiers/details/KpiIdentifierDetailView";
import PipelineTemplateManagement from "components/admin/pipeline_templates/PipelineTemplateManagement";
import ToolDetailView from "./components/inventory/tools/tool_details/ToolDetailView";
import PipelineTemplateDetailView from "components/admin/pipeline_templates/details/PipelineTemplateDetailView";
import ToolCategoryDetailView
  from "components/admin/tools/categories/details/ToolCategoryDetailView";
import ToolIdentifierDetailView
  from "./components/admin/tools/identifiers/details/ToolIdentifierDetailView";
import PipelineDetailView from "./components/workflow/pipelines/pipeline_details/PipelineDetailView";
import SiteNotificationManagement from "./components/admin/site_notifications/SiteNotificationManagement";
import SiteNotificationDetailView
  from "./components/admin/site_notifications/details/SiteNotificationDetailView";
import SiteNotificationManager from "components/admin/site_notifications/manager/SiteNotificationManager";
import TaskDetailView from "components/tasks/details/TaskDetailView";
import PipelineStorageManagement from "components/admin/pipeline_storage/PipelineStorageManagement";
import PipelineStorageDetailView
  from "components/admin/pipeline_storage/details/PipelineStorageDetailView";
import ToolCategoryManagement from "components/admin/tools/categories/ToolCategoryManagement";
import ToolIdentifierManagement from "components/admin/tools/identifiers/ToolIdentifierManagement";
import Faq from "components/about/faq/Faq";
import CustomEnvironmentVariableManagement
  from "components/admin/environment_variables/CustomEnvironmentVariableManagement";
import HelpDocumentationScreen from "components/about/help_documentation/HelpDocumentationScreen";
import FreeTrialRegistration from "components/trial/registration/FreeTrialRegistration";
import OpseraFooter from "components/footer/OpseraFooter";
import FreeTrialWorkspace from "components/workspace/trial/FreeTrialWorkspace";

const FreeTrialAppRoutes = ({ authenticatedState, isPublicPathState, authClient, OKTA_CONFIG, userData, hideSideBar }) => {
  const history = useHistory();

  useEffect(() => {}, [userData, authenticatedState, isPublicPathState, hideSideBar]);

  const onAuthResume = async () => {
    history.push('/');
  };

  //Login Form
  if (!authenticatedState && !isPublicPathState) {
    return (
      <div className="container-fluid" style={{ margin: "0" }}>
        <div className="d-flex flex-row">
          <div className="w-100 pb-4">
            <LoginForm issuer={OKTA_CONFIG.issuer} authClient={authClient} />

            <Route path='/implicit/callback' render={ (props) => <LoginCallback {...props} onAuthResume={ onAuthResume } /> } />
            <Route path="/logout" exact component={Logout} />

          </div>
        </div>
        <OpseraFooter />
      </div>
    );
  }

  return (
    <div className={"container-fluid m-0"}>
      <div className={"d-flex flex-row"}>
        {/*{getSideBar()}*/}
        <div className={"w-100 hide-x-overflow"} style={{ marginBottom: "26px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/login" render={() => <LoginForm issuer={OKTA_CONFIG.issuer} authClient={authClient} />} />
          <Route path="/implicit/callback" component={LoginCallback} />
          <Route path="/logout" exact component={Logout} />

          <Route path="/trial/registration" exact component={FreeTrialRegistration} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/help-documentation" exact component={HelpDocumentationScreen} />
          <Route path="/about" exact component={About} />
          <Route path="/about/pricing" component={Pricing} />
          <Route path="/help" component={OnlineHelp} />

          <SecureRoute path="/inventory/tools/details/:id/:tab?" exact component={ToolDetailView} />
          <SecureRoute path="/task/details/:id" exact component={TaskDetailView} />


          <SecureRoute path="/admin" exact component={AdminTools} />
          <SecureRoute path="/admin/custom-environment-variables" exact component={CustomEnvironmentVariableManagement} />
          <SecureRoute path="/admin/manage_systems" component={ManageSystems} />
          <SecureRoute path="/admin/registered-users" exact component={RegisteredUsersManagement} />
          <SecureRoute path="/admin/registered-users/:id" exact component={RegisteredUserDetailView} />
          <SecureRoute path="/admin/analytics/reports-registration" component={ReportsRegistration} />
          <SecureRoute path="/admin/tools/categories" exact component={ToolCategoryManagement} />
          <SecureRoute path="/admin/tools/identifiers" exact component={ToolIdentifierManagement} />
          <SecureRoute path="/admin/tools/types/details/:toolTypeId" exact component={ToolCategoryDetailView} />
          <SecureRoute path="/admin/tools/identifiers/details/:toolIdentifierId" exact
                       component={ToolIdentifierDetailView} />
          <SecureRoute path="/admin/kpis" exact component={KpiIdentifierManagement} />
          <SecureRoute path="/admin/kpis/:id" exact component={KpiIdentifierDetailView} />
          <SecureRoute path="/admin/templates" exact component={PipelineTemplateManagement} />
          <SecureRoute path="/admin/templates/details/:templateId" exact component={PipelineTemplateDetailView} />
          <SecureRoute path="/admin/pipeline-storage" exact component={PipelineStorageManagement} />
          <SecureRoute path="/admin/pipeline-storage/details/:id" exact component={PipelineStorageDetailView} />


          <SecureRoute path="/admin/site-notifications/table" exact component={SiteNotificationManagement} />
          <SecureRoute path="/admin/site-notifications/details/:id" exact
                       component={SiteNotificationDetailView} />
          <SecureRoute path="/admin/site-notifications" exact component={SiteNotificationManager} />

          <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />

          <SecureRoute path="/workspace" component={FreeTrialWorkspace} />
        </div>
      </div>
      <OpseraFooter />
    </div>
  );
};

FreeTrialAppRoutes.propTypes = {
  authenticatedState: PropTypes.bool,
  isPublicPathState:  PropTypes.bool,
  authClient: PropTypes.object,
  OKTA_CONFIG: PropTypes.object,
  userData: PropTypes.object,
  hideSideBar: PropTypes.bool,
};

export default FreeTrialAppRoutes;

