import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { recordTypeJsonMetadata } from "../jsonFileEdit.metadata";

const RecordTypeProfileEditorView = ({
                                       recordTypeData,
                                       setRecordTypeDataJson,
  isLoading,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      recordTypeData,
      recordTypeJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [recordTypeData]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...customMetaJsonMetadata };
    newModel?.setData(fieldName, newValue);
    setCustomMetaJsonMetadata({ ...newModel });
    setRecordTypeDataJson(newModel.getPersistData());
  };

  return (
    <div>
      <Col>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"recordType"}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"default"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
        />
      </Col>
      <Col>
        <CheckboxInputBase
          fieldName={"visible"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
        />
      </Col>
    </div>
  );
};

RecordTypeProfileEditorView.propTypes = {
  setRecordTypeDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  recordTypeData: PropTypes.object,
};

export default RecordTypeProfileEditorView;
