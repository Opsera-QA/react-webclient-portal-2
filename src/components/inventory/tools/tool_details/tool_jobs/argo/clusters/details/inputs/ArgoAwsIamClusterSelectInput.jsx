import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import argoActions from "../../../argo-actions";

function ArgoAwsIamClusterSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  textField,
  valueField,
  awsToolConfigId,
  awsIamRole,
  awsIamRoleName,
  clusterData
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [clusters, setClusters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Cluster");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
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
  }, [awsToolConfigId, awsIamRole]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadAwsClusters(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadAwsClusters = async (cancelSource) => {
    try {
      setClusters([]);
      const res = await argoActions.getIamAwsClusters(getAccessToken, cancelSource, awsToolConfigId, awsIamRole, awsIamRoleName);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Clusters Found");
          return;
        }
        setPlaceholder("Select a Cluster");
        const clusterNames = clusterData.map(c => c.name.trim());                
        const tempClusters = res.data.filter(cluster => !clusterNames.includes(cluster));
        setClusters(tempClusters);
        return;
      }
      setPlaceholder("No Clusters Found");
      setClusters([]);
    } catch (error) {
      setPlaceholder("No Clusters Found");
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={clusters}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (clusters == null || clusters.length === 0))}
    />
  );
}

ArgoAwsIamClusterSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolConfigId: PropTypes.string,
  clusterData: PropTypes.array,
  awsIamRole: PropTypes.string,
  awsIamRoleName: PropTypes.string,
};

ArgoAwsIamClusterSelectInput.defaultProps = {
  fieldName: "clusterName",
  textField: "clusterName",
  valueField: "clusterName",
};

export default ArgoAwsIamClusterSelectInput;
