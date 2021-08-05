import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function TaskCreationHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={"Task Creation"} closeHelpPanel={closeHelpPanel}>
      <div>To create a task, provide values for the following fields:</div>
      <ul>
        <li><b>Name</b> - Create a unique name for your task.</li>
        <li><b>Type</b> - Select a Task Type from the drop down menu. Once selection is made you can configure task details. .
          <ul>
            <li><b>SFDC Org Sync</b> - Create and configure the SFDC Org Sync task to sync the changes in Salesforce Org with the configured Git branch.</li>
            <li><b>SFDC Branch Restructuring</b> - Convert the Salesforce metadata components available in Git Branch from Ant to SFDX format or vice versa.</li>
            <li><b>GIT to GIT Sync </b> - Use this task to sync up between 2 different Git branches and merge the changes. The resulting Merge Request can be configured to be approved by set of approvers before Merging.</li>
            <li><b>Create AWS ECS Cluster </b> - Create an AWS Elastic Container Service Cluster template and run the task to create a cluster.</li>
            <li><b>Create AWS ECS Service </b> - Create AWS Elastic Container Service to integrate tasks and management, then publish the containers through Opsera pipelines.</li>
            <li><b>Create AWS Lambda Function</b> - Create an AWS Lambda Function template and run the task to create a cluster. </li>
          </ul></li>
        <li><b>Tags</b> - Select any tags to be associated with your Task. Applying tags at this level will associate that tag with this Task.</li>
        <li><b>Description</b> - Write a description for your Task.</li>
        <li><b>Roles</b> - Assign access roles for the task by selecting Group or User, an Assignee and Access Type.</li>
      </ul>
      <div>Select <b>Create</b> to save.</div>
    </HelpDocumentationContainer>
  );
}

TaskCreationHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(TaskCreationHelpDocumentation);