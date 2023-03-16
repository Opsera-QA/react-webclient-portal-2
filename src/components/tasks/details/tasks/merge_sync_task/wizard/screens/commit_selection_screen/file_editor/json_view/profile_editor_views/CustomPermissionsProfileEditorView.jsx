import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CheckboxInputBase from "../../../../../../../../../../common/inputs/boolean/CheckboxInputBase";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import { jsonViewFileMetadata } from "../../../jsonViewFile.metadata";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customPermissionJsonMetadata } from "../jsonFileEdit.metadata";

const CustomPermissionsProfileEditorView = ({
  customPermissionsData,
  setCustomPermissionJson,
  isLoading,
  disabled,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      customPermissionsData,
      customPermissionJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [customPermissionsData]);

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
    newModel?.setData("enabled", newValue);
    setCustomMetaJsonMetadata({ ...newModel });
    setCustomPermissionJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"name"}
        />
      </Col>
      <Col lg={6}>
        <CheckboxInputBase
          fieldName={"enabled"}
          model={customMetaJsonMetadata}
          setModel={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

CustomPermissionsProfileEditorView.propTypes = {
  setCustomPermissionJson: PropTypes.func,
  isLoading: PropTypes.bool,
  customPermissionsData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomPermissionsProfileEditorView;
