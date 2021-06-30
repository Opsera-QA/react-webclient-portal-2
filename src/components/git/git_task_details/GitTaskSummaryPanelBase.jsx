import React, {useContext, useEffect, useRef, useState} from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import GitTaskRoleAccessInput from "components/git/git_task_details/GitTaskRoleAccessInput";
import GitTaskRunButton from "components/common/buttons/git/GitTaskRunButton";
import TagsInlineInputBase from "components/common/inline_inputs/tags/TagsInlineInputBase";
import gitTasksActions from "components/git/git-task-actions";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import CheckECSStatusButton from "../CheckECSStatusButton";

function GitTaskSummaryPanelBase({ gitTasksData, setGitTasksData, setActiveTab, gitTaskTypeSummaryCard, loadData, accessRoleData }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(accessRoleData)]);

  const updateRecord = async (newDataModel) => {
    const response = await gitTasksActions.updateGitTaskV2(getAccessToken, cancelTokenSource, newDataModel);
    loadData();
    return response;
  };

  const actionAllowed = (action) => {
    return workflowAuthorizedActions.gitItems(accessRoleData, action, gitTasksData?.getData("owner"), gitTasksData?.getData("roles"));
  };

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab} editingAllowed={actionAllowed("edit_settings")}>
      <Row>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"name"}/>
        </Col>
        <Col md={6}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"owner_name"}/>
        </Col>
        <Col md={6}>
          <SmartIdField model={gitTasksData} fieldName={"_id"}/>
        </Col>
        <Col md={6}>
          <DateFieldBase dataObject={gitTasksData} fieldName={"createdAt"}/>
        </Col>
        {gitTasksData.getData("type") != "ecs_cluster_creation" &&
        <Col md={6}>
          <TextFieldBase className={"upper-case-first my-2"} dataObject={gitTasksData} fieldName={"tool_identifier"} />
        </Col>
        }
        <Col md={12} className={"pt-1"}>
          <TextFieldBase dataObject={gitTasksData} fieldName={"description"}/>
        </Col>
        <Col md={12} className={"pt-1"}>
          <TagsInlineInputBase type={"task"} dataObject={gitTasksData} fieldName={"tags"} saveData={updateRecord} disabled={!actionAllowed("edit_settings")}/>
        </Col>
        <Col lg={12}>
          <GitTaskRoleAccessInput dataObject={gitTasksData} setDataObject={setGitTasksData} disabled={!actionAllowed("edit_access_roles")} />
        </Col>
      </Row>
      {gitTasksData.getData("type") != "sfdc-cert-gen" &&
        <Row className={"mx-0 w-100 my-2"}>
          <div className={"mx-auto"}>
            <div className={"mx-auto"}><GitTaskRunButton gitTasksData={gitTasksData} loadData={loadData} actionAllowed={actionAllowed("run_task")} /></div>
          </div>
        </Row>
      }
      <Row className={"mx-0 w-100 my-2"}>
        <div className={"mx-auto"}>
          <div className={"mx-auto"}><CheckECSStatusButton gitTasksData={gitTasksData} loadData={loadData} /></div>
        </div>
      </Row>
      <div className="px-3 mt-3">{gitTaskTypeSummaryCard}</div>
    </SummaryPanelContainer>
  );
}

GitTaskSummaryPanelBase.propTypes = {
  gitTasksData: PropTypes.object,
  setGitTasksData: PropTypes.func,
  setActiveTab: PropTypes.func,
  gitTaskTypeSummaryCard: PropTypes.object,
  loadData: PropTypes.func,
  accessRoleData: PropTypes.object,
};

export default GitTaskSummaryPanelBase;
