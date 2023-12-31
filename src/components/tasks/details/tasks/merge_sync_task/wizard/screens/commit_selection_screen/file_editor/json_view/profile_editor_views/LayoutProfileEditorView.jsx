import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { layoutJsonMetadata } from "../jsonFileEdit.metadata";

const LayoutProfileEditorView = ({
  layoutData,
  setLayoutDataJson,
  isLoading,
  disabled,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      layoutData,
      layoutJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [layoutData]);

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Fetching Permissions"}
      />
    );
  }

  const setDataFunction = (fieldName, newValue) => {
    const newModel = { ...customMetaJsonMetadata };
    newModel?.setData("recordType", newValue);
    setCustomMetaJsonMetadata({ ...newModel });
    setLayoutDataJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"layout"}
        />
      </Col>
      <Col lg={12}>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"recordType"}
        />
      </Col>
    </Row>
  );
};

LayoutProfileEditorView.propTypes = {
  setLayoutDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  layoutData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default LayoutProfileEditorView;
