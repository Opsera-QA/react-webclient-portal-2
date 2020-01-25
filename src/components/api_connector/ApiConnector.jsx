import React, { Component } from "react";
import GitHub from "./source_control/gitHub";
import GitLab from "./source_control/gitLab";
import Jira from "./defect_tracking/jira";
import ServiceNow from "./itsm/serviceNow";
import OpenStack from "./cloud_management/openStack";
import Slack from "./collaboration/slack";
import Tableau from "./analytics/tableau";
import Splunk from "./analytics/splunk";

class ApiConnector extends Component {
  state = {
    selection: ""
  }

  selectView = (id) => {
    this.setState({
      selection: id
    });
  }

  render() {
    return (
      <div>
        <h3>API Connectors</h3>
        <div>Configure connection information for various supported tools.</div>

        <ul className="nav mt-1">
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "github" ? "nav-link-text-active" : "nav-link-text")} onClick={() => this.selectView("github")}>GitHub</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "gitlab" ? "nav-link-text-active" : "nav-link-text")} onClick={() => this.selectView("gitlab")}>GitLab</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link " + (this.state.selection === "jira" ? "nav-link-text-active" : "nav-link-text")} onClick={() => this.selectView("jira")}>Jira</a>
          </li>
          {/* <li className="nav-item">
            <a className={"nav-link disabled " + (this.state.selection === "servicenow" ? "nav-link-text-active" : "")} onClick={() => this.selectView("servicenow")}>ServiceNow</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link disabled " + (this.state.selection === "openstack" ? "nav-link-text-active" : "")} onClick={() => this.selectView("openstack")}>OpenStack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link disabled " + (this.state.selection === "slack" ? "nav-link-text-active" : "")} onClick={() => this.selectView("slack")}>Slack</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link disabled " + (this.state.selection === "tableau" ? "nav-link-text-active" : "")} onClick={() => this.selectView("tableau")}>Tableau</a>
          </li>
          <li className="nav-item">
            <a className={"nav-link disabled " + (this.state.selection === "splunk" ? "nav-link-text-active" : "")} onClick={() => this.selectView("splunk")}>Splunk</a>
          </li> */}
        </ul>

        {this.state.selection === "github" && <GitHub />}
        {this.state.selection === "gitlab" && <GitLab />}
        {this.state.selection === "jira" && <Jira />}
        {this.state.selection === "servicenow" && <ServiceNow />}
        {this.state.selection === "openstack" && <OpenStack />}
        {this.state.selection === "slack" && <Slack />}
        {this.state.selection === "tableau" && <Tableau />}
        {this.state.selection === "splunk" && <Splunk />}
        {this.state.selection === "" &&
          <div className="mt-2">
            OpsERA offers out of the box API connectors which allow you to to integrate your internal platforms for inclusion in pipelines and platform configurations.
          </div>
        }

      </div>
    );
  }
}

export default ApiConnector;