import React, {useState} from "react";
import PropTypes from "prop-types";
import pipelineActions from "components/workflow/pipeline-actions";
import ActionBarDuplicateButtonBase from "components/common/actions/buttons/ActionBarDuplicateButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarDuplicatePipelineButton({pipeline, isActionAllowedFunction}) {
  const [isDuplicating, setIsDuplicating] = useState(false);
  const {
    toastContext,
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
    getAccessToken,
  } = useComponentStateReference();

  const duplicatePipelineFunction = async () => {
    try {
      setIsDuplicating(true);
      await pipelineActions.duplicatePipelineV2(getAccessToken, cancelTokenSource, pipeline?._id);
      toastContext.showSystemInformationToast("A new pipeline configuration has been created, duplicating all of the settings from this one.  That pipeline is now in your list of Pipelines for viewing.  No tools or activity logs have been duplicated in this process.");
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showSystemErrorToast(error, "There was an issue duplicating this pipeline");
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsDuplicating(false);
      }
    }
  };

  if (pipeline == null || isActionAllowedFunction("duplicate_pipeline_btn", pipeline?.owner) !== true) {
    return null;
  }

  if (isOpseraAdministrator !== true) {
    return (
      <ActionBarDuplicateButtonBase
        disabled={true}
        popoverText={"Duplicating Pipeline configurations is available in the main Opsera offering."}
        className={"ml-3"}
        isDuplicating={isDuplicating}
      />
    );
  }

  return (
    <ActionBarDuplicateButtonBase
      duplicateFunction={duplicatePipelineFunction}
      popoverText={"Duplicate this Pipeline Configuration"}
      className={"ml-3"}
      isDuplicating={isDuplicating}
    />
  );
}

ActionBarDuplicatePipelineButton.propTypes = {
  pipeline: PropTypes.object,
  isActionAllowedFunction: PropTypes.func
};

export default ActionBarDuplicatePipelineButton;