import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faSync } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { DialogToastContext } from "contexts/DialogToastContext";
import dataSeedingTaskWizardActions from "../../dataSeedingTaskWizard.actions";
import { DATA_SEEDING_WIZARD_SCREENS } from "../../dataSeedingTaskWizard.constants";

function DataSeedingTaskWizardCreateNewRecordButton({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  taskType,
  size,
  className,
  disabled,
  icon,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [creatingNewRecord, setCreatingNewRecord] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createNewTaskWizardRecord = async () => {
    try {
      setCreatingNewRecord(true);
      const response =
        await dataSeedingTaskWizardActions.createNewRecordV2(
          getAccessToken,
          cancelTokenSource,
          wizardModel?.getData("taskId"),
          wizardModel?.getData("runCount"),
        );
      const newRecord = response?.data?.data;

      if (isMounted?.current === true && newRecord != null) {
        wizardModel?.setData("recordId", newRecord._id);
        setWizardModel({ ...wizardModel });
        const sfdcToolId = wizardModel?.getData("sourceToolId");
        await dataSeedingTaskWizardActions.triggerCustomSettingsPull(
          getAccessToken,
          cancelTokenSource,
          wizardModel?.getData("taskId"),
          wizardModel?.getData("runCount"),
          sfdcToolId,
          newRecord._id,
        );
        setCurrentScreen(
          DATA_SEEDING_WIZARD_SCREENS.CONFIGURATION_SCREEN,
        );
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(
          error,
          "Could not create new wizard record:",
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setCreatingNewRecord(false);
      }
    }
  };

  if (wizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (creatingNewRecord) {
      return "Starting New Instance";
    }

    return "Start A New Instance";
  };

  return (
    <div className={className}>
      <Button
        size={size}
        variant={"primary"}
        disabled={creatingNewRecord === true || disabled === true}
        onClick={createNewTaskWizardRecord}
      >
        <span>
          <IconBase
            icon={icon}
            className={"mr-2"}
            isLoading={creatingNewRecord}
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

DataSeedingTaskWizardCreateNewRecordButton.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  taskType: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

DataSeedingTaskWizardCreateNewRecordButton.defaultProps = {
  size: "sm",
  icon: faSync,
};

export default DataSeedingTaskWizardCreateNewRecordButton;
