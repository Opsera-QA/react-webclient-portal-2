import React, {useContext, useEffect, useState, useRef} from "react";
import ArgoClusterTable from "./ArgoClusterTable";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import argoActions from "components/inventory/tools/tool_details/tool_jobs/argo/argo-actions";
import modelHelpers from "components/common/model/modelHelpers";
import argoClusterMetadata from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/argo-cluster-metadata";
import ArgoClusterEditorPanel
  from "components/inventory/tools/tool_details/tool_jobs/argo/clusters/details/ArgoClusterEditorPanel";
import _ from "lodash";

function ArgoToolClustersPanel({ toolId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [argoClusters, setArgoClusters] = useState([]);
  const [selectedArgoCluster, setSelectedArgoCluster] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if(cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(cancelTokenSource).catch((error) => {
      if(isMounted?.current === true){
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
      await getArgoClusters(cancelSource);
    } catch (error) {
      if(isMounted?.current === true){
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if(isMounted?.current === true){
        setIsLoading(false);
      }
    }
  };

  const getArgoClusters = async (cancelSource = cancelTokenSource) => {
    const response = await argoActions.getArgoClustersV2(getAccessToken, cancelSource, toolId);
    const clusters = response?.data?.data;

    if(isMounted?.current === true && Array.isArray(clusters)){
      setArgoClusters(_.sortBy(clusters, ["name"]));
    }
  };

  const onRowSelect = (grid, row) => {
    const clusterObject = {
      clusterName: row?.name,
      server: row?.server
    };
    const parsedModel = modelHelpers.parseObjectIntoModel(clusterObject, argoClusterMetadata);
    setSelectedArgoCluster({...parsedModel});
  };


  const closePanel = () => {
    setSelectedArgoCluster(undefined);
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (selectedArgoCluster != null) {
    return (
      <ArgoClusterEditorPanel
        argoClusterData={selectedArgoCluster}
        toolId={toolId}
        clusterData={argoClusters}
        handleClose={closePanel}
      />
    );
  }

  return (
    <ArgoClusterTable
      isLoading={isLoading}
      toolId={toolId}
      loadData={loadData}
      onRowSelect={onRowSelect}
      argoClusters={argoClusters}
    />
  );
}

ArgoToolClustersPanel.propTypes = {
  toolId: PropTypes.string,
};

export default ArgoToolClustersPanel;
