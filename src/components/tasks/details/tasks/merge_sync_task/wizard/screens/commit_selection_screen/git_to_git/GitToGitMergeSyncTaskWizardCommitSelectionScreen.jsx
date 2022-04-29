import React, {useState, useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import MergeSyncTaskWizardFileSelector
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/MergeSyncTaskWizardFileSelector";

const GitToGitMergeSyncTaskWizardCommitSelectionScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggeredSourceFilePull, setTriggeredSourceFilePull] = useState(false);
  const [triggeredComparisonFileListPull, setTriggeredComparisonFileListPull] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await triggerGitToGitSourceFilePull(cancelSource);
      await triggerComparisonFilePull(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        const prependMessage =
          "Service Error Triggering File List Pulls:";
        toastContext.showInlineErrorMessage(error, prependMessage);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const triggerGitToGitSourceFilePull = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response =
      await mergeSyncTaskWizardActions.triggerGitToGitSourceFilePull(
        getAccessToken,
        cancelSource,
        wizardModel,
      );

    if (response?.data?.status === 500) {
      toastContext.showInlineErrorMessage(
        response,
        "Service Error Triggering Source File List Pull: ",
      );
    } else {
      setTriggeredSourceFilePull(true);
    }
  };

  const triggerComparisonFilePull = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.triggerComparisonFilePull(
      getAccessToken,
      cancelSource,
      wizardModel,
    );

    if (response?.data?.status === 500) {
      const message = response?.data?.message;
      toastContext.showInlineErrorMessage(
        "Service Error Triggering Comparison File List Pull: " + message,
      );
    } else {
      setTriggeredComparisonFileListPull(true);
    }
  };

  const getBody = () => {
    if (isLoading) {
      if (triggeredSourceFilePull !== true) {
        return (
          <LoadingDialog
            size={"sm"}
            message={"Triggering Source Commit File Pull"}
          />
        );
      }

      if (triggeredComparisonFileListPull !== true) {
        return (
          <LoadingDialog
            size={"sm"}
            message={"Triggering Comparison File Pull"}
          />
        );
      }
    }

    if (triggeredSourceFilePull !== true) {
      return <ErrorDialog error={"Service Error Triggering Source File List Pull"} />;
    }

    if (triggeredComparisonFileListPull !== true) {
      return <ErrorDialog error={"Service Error Triggering Comparison File List Pull"} />;
    }

    return (
      <MergeSyncTaskWizardFileSelector
        wizardModel={wizardModel}
        setWizardModel={setWizardModel}
        setCurrentScreen={setCurrentScreen}
        handleClose={handleClose}
      />
    );
  };

  return (
    <div>
      <div className="h5">
        Git To Git Merge Sync: File Comparison and Selection
      </div>
      <div className="text-muted mb-2">
        Select which version of files will be merged in.
      </div>
      {getBody()}
    </div>
  );
};

GitToGitMergeSyncTaskWizardCommitSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func
};

export default GitToGitMergeSyncTaskWizardCommitSelectionScreen;
