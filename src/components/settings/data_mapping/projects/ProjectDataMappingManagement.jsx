import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import ProjectDataMappingsTable from "components/settings/data_mapping/projects/ProjectDataMappingsTable";
import {projectDataMappingActions} from "components/settings/data_mapping/projects/projectDataMapping.actions";

function ProjectDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [projectDataMappingMetadata, setProjectDataMappingMetadata] = useState(undefined);
  const [projectDataMappings, setProjectDataMappings] = useState([]);
  const isMounted = useRef(false);
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
      await getProjectDataMappings(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getProjectDataMappings = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await projectDataMappingActions.getProjectDataMappingsV2(getAccessToken, cancelSource);
      const mappings = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(mappings)) {
        setProjectDataMappingMetadata({...response?.data?.metadata});
        setProjectDataMappings(mappings);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  return (
    <div className={"mt-2"}>
      <ProjectDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        projectDataMappings={projectDataMappings}
        isMounted={isMounted}
        projectDataMappingMetadata={projectDataMappingMetadata}
      />
    </div>
  );
}

export default ProjectDataMappingManagement;
