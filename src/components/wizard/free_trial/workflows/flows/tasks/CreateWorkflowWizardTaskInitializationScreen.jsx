import React, { useEffect, useState } from "react";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import PropTypes from "prop-types";
import {taskTemplateActions} from "../../../../../admin/task_templates/taskTemplate.actions";

export default function CreateWorkflowWizardTaskInitializationScreen(
  {
    type,
    setTaskFunction,
    templateIdentifier,
  }) {
  const [status, setStatus] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    initializeSalesforceTaskTemplate().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);


  const initializeSalesforceTaskTemplate = async () => {
    try {
      setStatus(buttonLabelHelper.BUTTON_STATES.BUSY);
      const response = await taskTemplateActions.deployTemplate(
          getAccessToken,
          cancelTokenSource,
          templateIdentifier,
      );
      const newTask = response?.data;

      if (isMongoDbId(newTask?._id)) {
        setStatus(buttonLabelHelper.BUTTON_STATES.SUCCESS);
        setTaskFunction(newTask);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        setStatus(buttonLabelHelper.BUTTON_STATES.ERROR);
        toastContext.showInlineErrorMessage(error, `Error Initializing ${type} Workflow:`);
      }
    }
  };

  const getLabel = () => {
    return buttonLabelHelper.getLabelForStatus(
      status,
      `Initializing ${type} Workflow`,
      `Initializing ${type} Workflow`,
      `Initialized ${type} Workflow!`,
      `Error Initializing ${type} Workflow!`,
    );
  };

  if (setTaskFunction == null) {
    return null;
  }

  return (
    <div>
      <CenterLoadingIndicator customMessage={getLabel()} />
    </div>
  );
}

CreateWorkflowWizardTaskInitializationScreen.propTypes = {
  type: PropTypes.string,
  setTaskFunction: PropTypes.func,
  templateIdentifier: PropTypes.string,
};

