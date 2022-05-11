import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { hasStringValue } from "components/common/helpers/string-helpers";
import LoadingDialog from "components/common/status_notifications/loading";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  comparisonFileMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/comparisonFile.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import SideBySideDiffField from "components/common/fields/file/diff/SideBySideDiffField";
import {
  MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS
} from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/mergeSyncTaskWizardCommitSelectorContainer.heights";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import MergeSyncTaskWizardSelectFileVersionButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardSelectFileVersionButton";
import { faCheckCircle, faTrash } from "@fortawesome/pro-light-svg-icons";
import SideBySideDeltaDiffField from "components/common/fields/file/diff/delta/SideBySideDeltaDiffField";

const MergeSyncTaskWizardCommitViewer = ({
  wizardModel,
  setWizardModel,
  diffFile,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [comparisonFileModel, setComparisonFileModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setComparisonFileModel(undefined);

    if (hasStringValue(diffFile?.committedFile)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [diffFile]);

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await getDiffFileList(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDiffFileList = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.retrieveSelectedFileContent(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("taskId"),
      wizardModel?.getData("runCount"),
      diffFile?.committedFile,
    );
    const newFileMetadata = response?.data?.data;

    if (isMounted?.current === true && newFileMetadata) {
      const newComparisonFileModel = modelHelpers.parseObjectIntoModel(newFileMetadata, comparisonFileMetadata);
      setComparisonFileModel(newComparisonFileModel);
    }
  };

  const getDiffOptions = () => {
    const deltas = comparisonFileModel?.getArrayData("deltas");

    if (!Array.isArray(deltas) || deltas.length === 0) {
      return "No changes returned from the service";
    }

    return (
      deltas.map((delta, index) => {
        return (
          <Col xs={12} key={index}>
            <SideBySideDeltaDiffField
              delta={delta}
              loadDataFunction={loadData}
              isLoading={isLoading}
              maximumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_CONTAINER_HEIGHT}
              minimumHeight={MERGE_SYNC_TASK_WIZARD_COMMIT_SELECTOR_CONTAINER_HEIGHTS.DIFF_FILE_CONTAINER_HEIGHT}
              leftSideTitleIcon={delta?.ignoreIncoming === false ? faCheckCircle : faTrash}
              rightSideTitleIcon={delta?.ignoreIncoming === true ? faCheckCircle : faTrash}
              sourceCode={comparisonFileModel?.getData("sourceContent")}
              destinationCode={comparisonFileModel?.getData("destinationContent")}
            />
          </Col>
        );
      })
    );
  };

  const getUpdatedFileFieldName = () => {
    const updatedFileList = wizardModel.getArrayData("updatedFileList");
    return updatedFileList?.find((updatedFile) => updatedFile?.fileName === diffFile?.committedFile)?.fieldName;
  };

  if (isLoading === true) {
    return (<LoadingDialog size={"sm"} message={"Loading Selected File Changes"} />);
  }

  return (
    <div className={"mt-1 mx-3"} style={{overflowX: "hidden"}}>
      <Row>
        <Col xs={12}>
          <TextFieldBase
            dataObject={comparisonFileModel}
            fieldName={"file"}
          />
        </Col>
        {getDiffOptions()}
      </Row>
      <SaveButtonContainer
        extraButtons={
          <MergeSyncTaskWizardSelectFileVersionButton
            fileName={diffFile?.committedFile}
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            isLoading={isLoading}
            comparisonFileModel={comparisonFileModel}
            fieldName={"destinationContent"}
            fileContent={comparisonFileModel?.getData("destinationContent")}
            type={"Destination Branch"}
            selected={getUpdatedFileFieldName() === "destinationContent"}
            buttonText={"Keep Existing Changes on Destination Branch"}
            savingButtonText={"Saving Commit Selection"}
            savedButtonText={"Keeping Original Changes on Destination Branch"}
          />
        }
      >
        <MergeSyncTaskWizardSelectFileVersionButton
          fileName={diffFile?.committedFile}
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          isLoading={isLoading}
          comparisonFileModel={comparisonFileModel}
          fieldName={"sourceContent"}
          fileContent={comparisonFileModel?.getData("sourceContent")}
          type={"Source Branch"}
          selected={getUpdatedFileFieldName() === "sourceContent"}
          buttonText={"Merge In Changes from Source Branch"}
          savingButtonText={"Saving Commit Selection"}
          savedButtonText={"Merging in Changes from Source Branch"}
        />
      </SaveButtonContainer>
    </div>
  );
};

MergeSyncTaskWizardCommitViewer.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  diffFile: PropTypes.object,
};

export default MergeSyncTaskWizardCommitViewer;