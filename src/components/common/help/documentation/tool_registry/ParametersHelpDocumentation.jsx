import React, { useContext } from "react";
import { DialogToastContext } from "../../../../../contexts/DialogToastContext";
import HelpOverlayBase from "../../../overlays/center/help/HelpOverlayBase";

function ParametersHelpDocumentation() {
    const toastContext = useContext(DialogToastContext);
    const closePanel = () => {
      toastContext.clearOverlayPanel();
    };
  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      titleText={"Parameters Help"}>
      <div className={"mt-3 ml-1"}>Opsera Custom Parameters allow the user to store sensitive information in the vault in order to reference it later in the pipeline step.</div>
      <div className={"mt-2 ml-4"}><b>To create a new parameter:</b>
        <ol>
          <li>Select the <b>+New Parameter</b> button.</li>
          <li>Complete the <b>Create New Parameter</b> form including the following fields:
            <ul style={{listStyleType: "none"}}>
              <li><b>Name</b> - Set a unique name for the parameter. Name must begin with <b>opsera-</b> and contain lowercase letters, numbers, dashes and periods.</li>
              <li><b>Secured in Vault</b> - Toggle is enabled by default. If you wish to disable, the parameter will not be secured in the vault. Once this value is set and the form is saved it cannot be changed.</li>
              <li><b>Value</b> - Value by default will be hidden. To view, click on the eye icon.</li>
              <li><b>Roles</b> - Set any access roles by Assignee and Access Type. Select <b>Add Role</b> to save.</li>
            </ul></li>
          <li>Select <b>Create</b> button to save the parameter. The parameter can now be referenced in a pipeline.</li>
        </ol>
        <div className={"mb-1"}>For more detailed information on Parameter creation and how to configure them in Opsera pipelines, view the  <a href="https://opsera.atlassian.net/l/c/ERJ1YuUM" target="_blank" rel="noreferrer"><b>Custom Parameters Help Documentation</b>.</a></div>
      </div>

    </HelpOverlayBase>
  );
}

export default React.memo(ParametersHelpDocumentation);