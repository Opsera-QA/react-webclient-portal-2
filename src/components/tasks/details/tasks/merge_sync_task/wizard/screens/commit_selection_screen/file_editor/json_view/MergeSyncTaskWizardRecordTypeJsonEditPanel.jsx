import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";
import { AuthContext } from "../../../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../../../contexts/DialogToastContext";
import useComponentStateReference from "../../../../../../../../../../hooks/useComponentStateReference";
import { hasStringValue } from "../../../../../../../../../common/helpers/string-helpers";
import mergeSyncTaskWizardActions from "../../../../mergeSyncTaskWizard.actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import RecordTypeProfileEditorView from "./profile_editor_views/RecordTypeProfileEditorView";
import { mockData } from "../MergeSyncTaskWizardProfilesAdvancedEditingPanel";
import IconBase from "../../../../../../../../../common/icons/IconBase";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import InlineWarning from "../../../../../../../../../common/status_notifications/inline/InlineWarning";
import StandaloneSaveButton from "../../../../../../../../../common/buttons/saving/StandaloneSaveButton";
import { getUniqueListBy } from "../../../../../../../../../common/helpers/array-helpers";
import ToolNameFieldDisplayer from "../../../../../../../../../common/fields/inventory/name/ToolNameFieldDisplayer";
import MergeSyncTaskWizardProfileSubmitFileButton from "../MergeSyncTaskWizardProfileSubmitFileButton";

const MergeSyncTaskWizardRecordTypeJsonEditPanel = ({
  wizardModel,
  setWizardModel,
  comparisonFileModel,
  setComparisonFileModel,
  fileName,
  isLoading,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isJsonLoading, setIsJsonLoading] = useState(true);
  const toastContext = useContext(DialogToastContext);
  const { isMounted, cancelTokenSource } = useComponentStateReference();

  const [modifiedContentJson, setModifiedContentJson] = useState(undefined);
  const [originalContentJson, setOriginalContentJson] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [showUnsavedChangesMessage, setShowUnsavedChangesMessage] =
    useState(false);

  useEffect(() => {
    if (hasStringValue(fileName)) {
      loadJsonData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [fileName]);

  const loadJsonData = async () => {
    try {
      setIsJsonLoading(true);
      // TODO : Convert both original and modified contents to JSON

      const jsonContent =
        await mergeSyncTaskWizardActions.componentTypeConvertView(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          "RecordType",
        );

      if (isMounted?.current === true) {
        setModifiedContentJson(
          JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.sourceContent",
            ),
          ),
        );
        setOriginalContentJson(
          JSON.parse(
            DataParsingHelper.safeObjectPropertyParser(
              jsonContent,
              "data.message.destinationContent",
            ),
          ),
        );
      }
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
      if (isMounted?.current === true) {
        setIsJsonLoading(false);
      }
    }
  };

  if (isJsonLoading || isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Conversion in progress"}
      />
    );
  }
  const saveModifiedContent = async () => {
    try {
      const modifiedFileContent = {"recordTypeVisibilities": [...modifiedContentJson?.recordTypeVisibilities]};
      const response =
        await mergeSyncTaskWizardActions.saveComponentConvertViewJson(
          getAccessToken,
          cancelTokenSource,
          wizardModel,
          fileName,
          modifiedFileContent,
          "RecordType",
        );
      console.log(response);
      if (response && response.status !== 200) {
        toastContext.showLoadingErrorDialog(response?.data?.message);
        return;
      }

      const newWizardModel = { ...wizardModel };
      let newFileList = newWizardModel.getData("updatedFileList");
      newFileList.push({ fileName: fileName });
      newWizardModel?.setData(
        "updatedFileList",
        getUniqueListBy(newFileList, "fileName"),
      );
      setWizardModel({ ...newWizardModel });
      setShowUnsavedChangesMessage(false);
      return;
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const getWarningMessage = () => {
    if (showUnsavedChangesMessage) {
      return (
        <InlineWarning
          warningMessage={"You must hit save before changes will take effect"}
        />
      );
    }
  };

  const getButtonContainer = () => {
    return (
      <div className="w-100 d-flex justify-content-between py-2 mx-4">
        <div></div>
        <div>{getSearchBar()}</div>
        <div>
          <MergeSyncTaskWizardProfileSubmitFileButton
            saveFunction={saveModifiedContent}
            type={"Profile"}
            showToasts={false}
            disable={!showUnsavedChangesMessage}
          />
        </div>
      </div>
    );
  };
  const updateSearchText = (value) => {
    setSearchText(value);
  };
  const getSearchBar = () => {
    return (
      <div className="membership-search d-flex mx-auto">
        <IconBase
          icon={faSearch}
          iconClassName={"mr-2 opsera-dark-purple h-100"}
        />
        <input
          placeholder="Search"
          value={searchText}
          className="form-control"
          onChange={(event) => updateSearchText(event.target.value)}
        />
      </div>
    );
  };
  const setRecordTypeDataJson = (modifiedValue) => {
    setShowUnsavedChangesMessage(true);
    let newModifiedJson = { ...modifiedContentJson };
    let modifiedItem = newModifiedJson?.recordTypeVisibilities.find(
      (recordTypeData) =>
        recordTypeData.recordType === modifiedValue.recordType,
    );
    if (modifiedItem) {
      modifiedItem.visible = modifiedValue.visible;
      modifiedItem.default = modifiedValue.default;
    }
    setModifiedContentJson(newModifiedJson);
  };

  const modifiedCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">
          Source Salesforce Org (
          <ToolNameFieldDisplayer
            toolId={wizardModel?.getData("sfdcToolId")}
            loadToolInNewWindow={true}
          />
          )
        </span>
        {modifiedContentJson &&
          Object.keys(modifiedContentJson).length > 0 &&
          modifiedContentJson?.recordTypeVisibilities
            ?.filter((obj) => {
              return obj?.recordType
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((recordTypeData, idx, { length }) => (
              <div key={idx}>
                <RecordTypeProfileEditorView
                  recordTypeData={recordTypeData}
                  setRecordTypeDataJson={setRecordTypeDataJson}
                  isLoading={isLoading}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText />
                )}
              </div>
            ))}
      </Col>
    );
  };

  const originalCustomMetaEditView = () => {
    return (
      <Col>
        <span className="h5">Target Git Branch ({wizardModel?.getData("targetBranch")})</span>
        {originalContentJson &&
          Object.keys(originalContentJson).length > 0 &&
          originalContentJson?.recordTypeVisibilities
            ?.filter((obj) => {
              return obj?.recordType
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .map((recordTypeData, idx, { length }) => (
              <div key={idx}>
                <RecordTypeProfileEditorView
                  recordTypeData={recordTypeData}
                  setRecordTypeDataJson={setRecordTypeDataJson}
                  isLoading={isLoading}
                  disabled={true}
                />
                {idx + 1 !== length && (
                  <DividerWithCenteredText />
                )}
              </div>
            ))}
      </Col>
    );
  };
  return (
    <div>
      {/*<Row className={"ml-2"}>{getWarningMessage()}</Row>*/}
      <Row>{getButtonContainer()}</Row>
      <Row>
        {originalCustomMetaEditView()}
        {modifiedCustomMetaEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardRecordTypeJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  fileName: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default MergeSyncTaskWizardRecordTypeJsonEditPanel;