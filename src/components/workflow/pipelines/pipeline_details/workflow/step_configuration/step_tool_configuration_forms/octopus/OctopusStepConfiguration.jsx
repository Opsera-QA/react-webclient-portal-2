import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import OctopusStepFormMetadata from "./octopus-stepForm-metadata";
import Model from "core/data_model/model";
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import LoadingDialog from "components/common/status_notifications/loading";
import { DialogToastContext } from "contexts/DialogToastContext";
import OctopusStepActions from "./octopus-step-actions";
import CloseButton from "../../../../../../../common/buttons/CloseButton";
import SaveButtonBase from "components/common/buttons/saving/SaveButtonBase";
import DtoTextInput from "../../../../../../../common/input/dto_input/dto-text-input";
import octopusActions from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/octopus-actions";
import OctopusToolSelectInput from "./input/OctopusToolSelectInput";
import ProjectMappingToolSelectInput
  from "../../../../../../../common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolSelectInput";
import AzureToolSelectInput
  from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/AzureToolSelectInput";
import SpaceNameSelectInput
  from "../../../../../../../inventory/tools/tool_details/tool_jobs/octopus/applications/details/input/SpaceNameSelectInput";
import OctopusSpaceNameSelectInput from "./input/OctopusSpaceNameSelectInput";
import OctopusEnvironmentNameSelectInput from "./input/OctopusEnvironmentSelectInput";
import OctopusTargetRolesSelectInput from "./input/OctopusTargetRolesSelect";
import OctopusPlatformTypeSelectInput from "./input/OctopusPlatformTypeSelectInput";
import OctopusDeploymentTypeInputSelect from "./input/OctopusDeploymentTypeInputSelect";
import OctopusFeedSelectInput from "./input/OctopusFeedSelectInput";
import OctopusVersionSelectInput from "./input/OctopusVersionSelectInput";

function OctopusStepConfiguration({ stepTool, plan, stepId, parentCallback, getToolsList, closeEditorPanel, pipelineId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [octopusStepConfigurationDto, setOctopusStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [octopusSearching, isOctopusSearching] = useState(false);
  const [octopusList, setOctopusList] = useState([]);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(() => {
    loadFormData(stepTool);
  }, []);

  const loadFormData = async (step) => {
    setIsLoading(true);
    let { configuration, threshold } = step;
    if (typeof configuration !== "undefined") {
      setOctopusStepConfigurationDataDto(new Model(configuration, OctopusStepFormMetadata, false));
      if (typeof threshold !== "undefined") {
        setThresholdType(threshold.type);
        setThresholdValue(threshold.value);
      }
    } else {
      setOctopusStepConfigurationDataDto(
        new Model({ ...OctopusStepFormMetadata.newModelBase }, OctopusStepFormMetadata, false)
      );
    }

    if (plan && stepId) {
      let pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setListOfSteps(pipelineSteps);
    }

    await fetchOctopusDetails();
    setIsLoading(false);
  };

  const fetchOctopusDetails = async () => {
    isOctopusSearching(true);

    let results = await getToolsList("octopus");

    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setOctopusList(filteredList);
    }
    isOctopusSearching(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: octopusStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
    await octopusActions.createOctopusProject({pipelineId: pipelineId, stepId: stepId}, getAccessToken)
      .then(function (response) {
        return
      })
      .catch(function (error) {
        console.log(error)
        let errorMesage = (error && error.error && error.error.response && error.error.response.data) ? error.error.response.data : ""
        toastContext.showErrorDialog( `Error in octopus Project Creation:  ${errorMesage}`)
        return
  });
  };

  if (isLoading || octopusStepConfigurationDto === undefined) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <>
      {octopusStepConfigurationDto && (
        <>
          <OctopusToolSelectInput
            fieldName={"octopusToolId"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
          />
          <OctopusSpaceNameSelectInput
            fieldName={"spaceName"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusToolId").length === 0}
            tool_prop={octopusStepConfigurationDto ? octopusStepConfigurationDto.getData("octopusToolId") : ""}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectName"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
          />
          <DtoTextInput
            setDataObject={setOctopusStepConfigurationDataDto}
            dataObject={octopusStepConfigurationDto}
            fieldName={"projectDescription"}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
          />
          <OctopusEnvironmentNameSelectInput
            fieldName={"environmentName"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
            tool_prop={octopusStepConfigurationDto ? octopusStepConfigurationDto.getData("spaceName") : ""}
          />
          <DtoSelectInput
            setDataObject={setOctopusStepConfigurationDataDto}
            textField={"name"}
            valueField={"_id"}
            dataObject={octopusStepConfigurationDto}
            filter={"contains"}
            selectOptions={listOfSteps ? listOfSteps : []}
            fieldName={"ecrPushStepId"}
            disabled={
              listOfSteps.length === 0 || octopusStepConfigurationDto.getData("environmentName").length === 0
            }
          />
          <OctopusTargetRolesSelectInput
            fieldName={"octopusTargetRoles"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName").length === 0 : true}
            tool_prop={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName") : ""}
          />
          <OctopusPlatformTypeSelectInput
            fieldName={"octopusPlatformType"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName").length === 0 : true}
            tool_prop={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName") : ""}
          />
          {octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType") && octopusStepConfigurationDto.getData("octopusPlatformType") === "Kubernetes" &&
            <DtoTextInput
              setDataObject={setOctopusStepConfigurationDataDto}
              dataObject={octopusStepConfigurationDto}
              fieldName={"namespace"}
              disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName").length === 0}
            />
          }
          { octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType") && octopusStepConfigurationDto.getData("octopusPlatformType") === "Azure" &&
            <>
            <OctopusDeploymentTypeInputSelect
            fieldName={"octopusDeploymentType"}
            dataObject={octopusStepConfigurationDto}
            setDataObject={setOctopusStepConfigurationDataDto}
            disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType") ? octopusStepConfigurationDto.getData("octopusPlatformType").length === 0 : true}
            tool_prop={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("octopusPlatformType") ? octopusStepConfigurationDto.getData("octopusPlatformType") : ""}
            />
            <OctopusFeedSelectInput
              fieldName={"octopusFeedId"}
              dataObject={octopusStepConfigurationDto}
              setDataObject={setOctopusStepConfigurationDataDto}
              disabled={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName").length === 0 : true}
              tool_prop={octopusStepConfigurationDto && octopusStepConfigurationDto.getData("spaceName") ? octopusStepConfigurationDto.getData("spaceName") : ""}
            />
            </>
          }
          <Row className="mx-1 py-2">
            <SaveButtonBase
              recordDto={octopusStepConfigurationDto}
              setRecordDto={setOctopusStepConfigurationDataDto}
              createRecord={callbackFunction}
              updateRecord={callbackFunction}
              lenient={true}
            />
            <CloseButton
              isLoading={isLoading}
              closeEditorCallback={closeEditorPanel}
            />
          </Row>
        </>
      )}
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </>
  );
}

OctopusStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  getToolsList: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default OctopusStepConfiguration;
