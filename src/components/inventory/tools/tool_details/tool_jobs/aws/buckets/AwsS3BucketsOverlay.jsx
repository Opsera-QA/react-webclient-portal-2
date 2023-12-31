import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import awsS3BucketMetadata from "./aws-s3-bucket-metadata";
import AwsS3BucketEditorPanel from "./details/AwsS3BucketEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import modelHelpers from "components/common/model/modelHelpers";

function AwsS3BucketsOverlay({ loadData, toolData, editMode, editRowData }) {
  const toastContext = useContext(DialogToastContext);
  const [awsS3BucketsData, setAwsS3BucketsData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    initializeModel();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const initializeModel = () => {
    setAwsS3BucketsData(modelHelpers.parseObjectIntoModel({}, awsS3BucketMetadata));
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel closePanel={closePanel} objectType={awsS3BucketMetadata.type} loadData={loadData}>
      <AwsS3BucketEditorPanel
        awsS3BucketsData={awsS3BucketsData}
        toolData={toolData}
        loadData={loadData}
        handleClose={closePanel}
        editMode={editMode}
        editRowData={editRowData}
      />
    </CreateCenterPanel>
  );
}

AwsS3BucketsOverlay.propTypes = {
  toolData: PropTypes.object,
  editRowData: PropTypes.object,
  loadData: PropTypes.func,
  editMode: PropTypes.bool,
};

export default AwsS3BucketsOverlay;
