import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { Col, Row } from "react-bootstrap";
import modelHelpers from "../../../../../../../../../../common/model/modelHelpers";
import TextFieldBase from "../../../../../../../../../../common/fields/text/TextFieldBase";
import { customTabJsonMetadata } from "../jsonFileEdit.metadata";
import SelectInputBase from "../../../../../../../../../../common/inputs/select/SelectInputBase";

const tabVisibilityOptions = [
  { name: "Hidden", value: "Hidden" },
  { name: "Default On", value: "DefaultOn" },
  { name: "Default Off", value: "DefaultOff" },
];

const CustomTabProfileEditorView = ({
  customTabData,
  setCustomTabDataJson,
  isLoading,
  disabled,
}) => {
  const [customMetaJsonMetadata, setCustomMetaJsonMetadata] =
    useState(undefined);

  useEffect(() => {
    const newCustomMetadata = modelHelpers.parseObjectIntoModel(
      customTabData,
      customTabJsonMetadata,
    );
    setCustomMetaJsonMetadata(newCustomMetadata);
  }, [customTabData]);

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
    newModel?.setData(fieldName, newValue?.value);
    setCustomMetaJsonMetadata({ ...newModel });
    setCustomTabDataJson(newModel.getPersistData());
  };

  return (
    <Row>
      <Col lg={12}>
        <TextFieldBase
          dataObject={customMetaJsonMetadata}
          fieldName={"tab"}
        />
      </Col>
      <Col lg={6}>
        <SelectInputBase
          fieldName={"visibility"}
          selectOptions={tabVisibilityOptions}
          dataObject={customMetaJsonMetadata}
          setDataObject={setCustomMetaJsonMetadata}
          setDataFunction={setDataFunction}
          valueField={"value"}
          textField={"name"}
          busy={isLoading}
          placeholderText={"Select Tab Group Visibility"}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

CustomTabProfileEditorView.propTypes = {
  setCustomTabDataJson: PropTypes.func,
  isLoading: PropTypes.bool,
  customTabData: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomTabProfileEditorView;
