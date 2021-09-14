import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function AwsLambdaFunctionCreationTaskHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer helpTopic={"Create AWS Lambda Function"} closeHelpPanel={closeHelpPanel}>
      <div>Create AWS Lambda Function workflow requires setup in both Tasks and Opsera Pipelines. The workflow is separated into two parts where the user enters certain static information in the Tasks page and then links the task to the respective step in the pipeline. For more detailed information on the AWS Lambda Function Creation workflow including pipeline setup, view the <a href="https://opsera.atlassian.net/l/c/Pcv3z811" target="_blank" rel="noreferrer"><b>AWS Lambda Functions Documentation</b>.</a></div>
      <div className={"mt-2"}><h5>Task Setup Instructions:</h5></div>
      <ol>
        <li>Select <b>Create AWS Lambda Function</b> from the Type drop down. Once this has been selected, the following values will be fetched for selection:
          <ul style={{listStyleType: "none"}}>
            <li><b>AWS Tool</b> - Select an established AWS tool from the Tool Registry.</li>
            <li><b>Function Name</b> - Create a unique name for the function. To confirm that the name is unique and does not exist in AWS yet, click the Validate button. If it already exists user will receive an error stating that the function with that name already exists.</li>
            <li><b>Handler</b> - Use this syntax for java8:   <em>example.Hello::handleRequest</em> </li>
            <li><b>IAM Role</b> - Select from the drop down fetched from AWS. </li>
            <li><b>Runtime</b> - Select the language to write the function. Currently supported: java8 </li>
          </ul></li>
        <li> Select <b>Save</b> to create a template.</li>
      </ol>
      <div className={"mt-2"}>Once the templates are created the user can create and deploy the functions via the Opsera pipeline.  </div>
    </HelpDocumentationContainer>
  );
}

AwsLambdaFunctionCreationTaskHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func,
};

export default React.memo(AwsLambdaFunctionCreationTaskHelpDocumentation);