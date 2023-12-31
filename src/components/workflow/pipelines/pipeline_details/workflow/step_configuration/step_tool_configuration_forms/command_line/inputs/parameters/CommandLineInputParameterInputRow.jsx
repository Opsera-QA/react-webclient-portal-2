import React, {useState} from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faPlus} from "@fortawesome/pro-light-svg-icons";
import {
  commandLineInputParameterMetadata
} from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/commandLineInputParameter.metadata";
import CommandLineInputParameterTypeSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/inputs/parameters/CommandLineInputParameterTypeSelectInput";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import InfoText from "components/common/inputs/info_text/InfoText";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

export default function CommandLineInputParameterInputRow(
  {
    error,
    className,
    disabled,
    saveEnvironmentVariables,
    addLocalParameterFunction,
    addEnvironmentParameterFunction,
    addGlobalCustomParameterFunction,
    commandLineStepModel,
  }) {
  const [commandLineInputParameterModel, setCommandLineInputParameterModel] = useState(modelHelpers.parseObjectIntoModel({}, commandLineInputParameterMetadata));

  const handleAddPropertyFunction = () => {
    let successfulAdd = false;
    const newParameter = commandLineInputParameterModel?.getPersistData();
    const type = commandLineInputParameterModel?.getData("type");

    if (type === "local") {
      successfulAdd = addLocalParameterFunction(newParameter);
    } else if (type === "global") {
      successfulAdd = saveEnvironmentVariables !== true
        ? addGlobalCustomParameterFunction(newParameter)
        : addEnvironmentParameterFunction(newParameter);
    }

    if (successfulAdd === true) {
      commandLineInputParameterModel.resetData();
      setCommandLineInputParameterModel({...commandLineInputParameterModel});
    }
  };

  const hasDuplicateName = () => {
    const type = commandLineInputParameterModel?.getData("type");

    if (type === "local") {
      const parameterName = commandLineInputParameterModel?.getData("name");
      const stepParameters = commandLineStepModel?.getArrayData("stepParameters");
      return stepParameters.find((parameter) => parameter?.name === parameterName) != null;
    } else if (type === "global") {
      const customParameters = commandLineStepModel?.getArrayData("customParameters");
      const environmentVariables = commandLineStepModel?.getArrayData("environmentVariables");
      const parameterName = commandLineInputParameterModel?.getData("parameterName");

      return saveEnvironmentVariables !== true
        ? customParameters.find((parameter) => parameter?.parameterName === parameterName) != null
        : environmentVariables.find((parameter) => parameter?.parameterName === parameterName) != null;
    }
  };

  // TODO: Make separate input
  const setParameterFunction = (fieldName, selectedOption) => {
    commandLineInputParameterModel.setData("parameterId", selectedOption?._id);
    commandLineInputParameterModel.setData("parameterName", selectedOption?.name);
    setCommandLineInputParameterModel({...commandLineInputParameterModel});
  };

  const isValid = commandLineInputParameterModel?.checkCurrentValidity();
  const name = DataParsingHelper.parseString(commandLineInputParameterModel?.getData("name"), "");
  const missingOutputKey = saveEnvironmentVariables === true
    && commandLineInputParameterModel?.getData("type") === "global"
    && hasStringValue(commandLineInputParameterModel?.getData("outputKey")) !== true;
  const isDuplicate = hasDuplicateName();
  const invalidLocalParameter = commandLineInputParameterModel?.getData("type") === "local"
    &&  (name.startsWith("opsera-local-") !== true || name === "opsera-local-");

  const getInputFields = () => {
    if (commandLineInputParameterModel?.getData("type") === "global") {
      if (saveEnvironmentVariables === true) {
        return (
          <>
            <Col xs={5}>
              <CustomParameterSelectInput
                model={commandLineInputParameterModel}
                fieldName={"parameterId"}
                disabled={disabled}
                setDataFunction={setParameterFunction}
              />
            </Col>
            <Col xs={5}>
              <TextInputBase
                fieldName={"outputKey"}
                dataObject={commandLineInputParameterModel}
                setDataObject={setCommandLineInputParameterModel}
                disabled={disabled}
              />
            </Col>
          </>
        );
      }

      return (
        <Col xs={10}>
          <CustomParameterSelectInput
            model={commandLineInputParameterModel}
            fieldName={"parameterId"}
            disabled={disabled}
            setDataFunction={setParameterFunction}
          />
        </Col>
      );
    }

    return (
      <>
        <Col xs={5}>
          <TextInputBase
            fieldName={"name"}
            dataObject={commandLineInputParameterModel}
            setDataObject={setCommandLineInputParameterModel}
            disabled={disabled}
            error={isDuplicate === true ? "Local Parameter Names must be unique." : undefined}
          />
        </Col>
        <Col xs={5}>
          <TextAreaInputBase
            fieldName={"value"}
            model={commandLineInputParameterModel}
            setModel={setCommandLineInputParameterModel}
            rowCount={1}
            disabled={disabled}
            useInfoContainer={false}
          />
        </Col>
      </>
    );
  };

  return (
    <div className={className}>
      <Row>
        <Col xs={2}>
          <CommandLineInputParameterTypeSelectInput
            model={commandLineInputParameterModel}
            setModel={setCommandLineInputParameterModel}
            disabled={disabled}
          />
        </Col>
        {getInputFields()}
        <Col xs={12}>
          <div className={"w-100 d-flex"}>
            <VanityButtonBase
              className={"ml-auto"}
              variant={"success"}
              icon={faPlus}
              disabled={ isValid !== true || disabled === true || missingOutputKey === true || isDuplicate === true || invalidLocalParameter === true}
              onClickFunction={handleAddPropertyFunction}
              normalText={"Add Parameter"}
            />
          </div>
        </Col>
        <Col xs={12}>
          <InfoText
            errorMessage={error ? error : isDuplicate === true ? "You have already added this Parameter." : undefined}
          />
        </Col>
      </Row>
    </div>
  );
}

CommandLineInputParameterInputRow.propTypes = {
  addGlobalCustomParameterFunction: PropTypes.func,
  addLocalParameterFunction: PropTypes.func,
  addEnvironmentParameterFunction: PropTypes.func,
  commandLineStepModel: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  saveEnvironmentVariables: PropTypes.bool,
  error: PropTypes.any,
};