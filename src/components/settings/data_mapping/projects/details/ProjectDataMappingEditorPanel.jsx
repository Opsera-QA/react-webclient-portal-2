import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import LoadingDialog from "components/common/status_notifications/loading";
import ActivityToggleInput from "components/common/inputs/boolean/ActivityToggleInput";
import ProjectMappingToolIdentifierSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolIdentifierSelectInput";
import ProjectMappingWorkspaceSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingWorkspaceSelectInput";
import ProjectRepositorySelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectRepositorySelectInput";
import ProjectMappingToolSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolSelectInput";
import SonarProjectSelectInput
  from "../../../../common/list_of_values_input/settings/data_tagging/projects/SonarProjectSelectInput";
import TagManager from "components/common/inputs/tags/TagManager";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import JiraProjectSelectInput from "components/common/list_of_values_input/tools/jira/projects/JiraProjectSelectInput";
import JiraCustomTagFieldSelectInput from "components/common/list_of_values_input/tools/jira/custom_fields/JiraCustomTagFieldSelectInput";
import JiraCustomFieldMappingSelectInput from "components/common/list_of_values_input/tools/jira/custom_fields/JiraCustomFieldMappingSelectInput";
import AnalyticsDataMappingEditWarningMessage
  from "components/settings/data_mapping/AnalyticsDataMappingEditWarningMessage";
import GitlabProjectDataMappingSubform from "../../tools/gitlab/subforms/GitlabProjectDataMappingSubform"; 

const determineKeyFromFullPath = keyPath => {
  const splitPath = keyPath.split('/');
  return splitPath[splitPath.length - 1];
};

function ProjectDataMappingEditorPanel(
  {
    projectDataMappingModel,
    setProjectDataMappingModel,
    handleClose,
  }) {
  const setDataHandler = (id, selectedOption) => {
    projectDataMappingModel.setData('key', determineKeyFromFullPath(selectedOption?.nameSpacedPath));
    projectDataMappingModel.setData('keyPath', selectedOption?.nameSpacedPath);
    projectDataMappingModel.setData('repoId', selectedOption?.id);
    setProjectDataMappingModel({ ...projectDataMappingModel });
  };

  const setJiraDataHandler = (fieldName, selectedOption) => {
    const newProjectDataMappingModel = { ...projectDataMappingModel };
    newProjectDataMappingModel.setData('key', selectedOption?.name);
    newProjectDataMappingModel.setData('projectKey', selectedOption?.key);
    newProjectDataMappingModel.setDefaultValue("value");
    newProjectDataMappingModel.setDefaultValue("customTagFields");
    setProjectDataMappingModel({ ...newProjectDataMappingModel });
  };

  // TODO: Rewrite into switch statement or sub panels
  const getDynamicFields = () => {
    if (projectDataMappingModel?.getData("tool_identifier") === "jenkins") {
      return (
        <Col lg={12}>
          <JenkinsRegistryToolJobSelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
            fieldName={"key"}
            jenkinsToolId={projectDataMappingModel?.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "sonar") {
      return (
        <Col lg={12}>
          <SonarProjectSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
            tool_prop={projectDataMappingModel.getData("tool_id")}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "bitbucket") {
      return (
        <>
          <Col lg={12}>
            <ProjectMappingWorkspaceSelectInput
              dataObject={projectDataMappingModel}
              setDataObject={setProjectDataMappingModel}
              toolId={projectDataMappingModel.getData("tool_id")}
            />
          </Col>
          <Col lg={12}>
            <ProjectRepositorySelectInput
              model={projectDataMappingModel}
              setModel={setProjectDataMappingModel}
            />
          </Col>
        </>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "gitlab") {
      return (
        <>
        <Col lg={12}>
          <ProjectRepositorySelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
            setDataFunction={setDataHandler}
            valueField="nameSpacedPath"
          />
        </Col>
        <Col lg={12}>
          <GitlabProjectDataMappingSubform
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
          />
        </Col>
        </>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "github") {
      return (
        <Col lg={12}>
          <ProjectRepositorySelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
          />
        </Col>
      );
    }
    if (projectDataMappingModel?.getData("tool_identifier") === "jira") {
      return (
        <Col lg={12}>
          <JiraProjectSelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
            jiraToolId={projectDataMappingModel.getData("tool_id")}
            valueField={"name"}
            fieldName={"key"}
            setDataFunction={setJiraDataHandler}
          />
        </Col>
      );
    }
  };

  const getCustomTagFieldInput = () => {
    if (projectDataMappingModel?.getData("tool_identifier") === "jira" && projectDataMappingModel?.getData("projectKey") && projectDataMappingModel?.getData("projectKey") !== "") {
      return (
        <>
          <Col lg={12}>
            <JiraCustomTagFieldSelectInput
              model={projectDataMappingModel}
              setModel={setProjectDataMappingModel}
              jiraToolId={projectDataMappingModel.getData("tool_id")}
              projectKey={projectDataMappingModel?.getData("projectKey")}
              fieldName={"customTagFields"}
            />
          </Col>
          <Col lg={12}>
            <JiraCustomFieldMappingSelectInput
              model={projectDataMappingModel}
              setModel={setProjectDataMappingModel}
              jiraToolId={projectDataMappingModel.getData("tool_id")}
              projectKey={projectDataMappingModel?.getData("projectKey")}
              fieldName={"customMappingFields"}
            />
          </Col>
        </>
      );
    }
  };

  const getWarningMessage = () => {
    if (projectDataMappingModel?.isNew() !== true) {
      return (
        <AnalyticsDataMappingEditWarningMessage />
      );
    }
  };

  if (projectDataMappingModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <VanityEditorPanelContainer
      model={projectDataMappingModel}
      setModel={setProjectDataMappingModel}
      handleClose={handleClose}
      className={"px-3 pt-1 pb-3"}
    >
      {getWarningMessage()}
      <Row>
        <Col lg={12}>
          <ProjectMappingToolIdentifierSelectInput
            dataObject={projectDataMappingModel}
            setDataObject={setProjectDataMappingModel}
          />
        </Col>
        <Col lg={12}>
          <ProjectMappingToolSelectInput
            model={projectDataMappingModel}
            setModel={setProjectDataMappingModel}
          />
        </Col>
        {getDynamicFields()}
        <Col lg={12}>
          <TagManager
            type={"project"}
            dataObject={projectDataMappingModel}
            fieldName={"value"}
            setDataObject={setProjectDataMappingModel}
            disabled={projectDataMappingModel && projectDataMappingModel.getData("tool_id").length === 0}
            excludeTypes={["custom"]}
          />
        </Col>
        {getCustomTagFieldInput()}
        <Col lg={12}>
          <ActivityToggleInput
            dataObject={projectDataMappingModel}
            fieldName={"active"}
            setDataObject={setProjectDataMappingModel}
          />
        </Col>
      </Row>
    </VanityEditorPanelContainer>
  );
}

ProjectDataMappingEditorPanel.propTypes = {
  projectDataMappingModel: PropTypes.object,
  setProjectDataMappingModel: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ProjectDataMappingEditorPanel;
