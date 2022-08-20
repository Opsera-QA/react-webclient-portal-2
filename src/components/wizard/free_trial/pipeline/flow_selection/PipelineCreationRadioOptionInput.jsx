import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";

export const PIPELINE_CREATION_OPTIONS = {
  SALESFORCE: "salesforce",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "sdlc",
  GIT_CUSTODIAN: "git_custodian",
};

export const PIPELINE_CREATION_OPTION_LABELS = {
  SALESFORCE: "Salesforce.com",
  SOFTWARE_DEVELOPMENT_LIFE_CYCLE: "Software Development Life Cycle",
  GIT_CUSTODIAN: "Git Custodian",
};

function PipelineCreationRadioOptionInput(
  {
    className,
    selectedOption,
    setSelectedOption,
  }) {
  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={PIPELINE_CREATION_OPTIONS.SALESFORCE}
        text={PIPELINE_CREATION_OPTION_LABELS.SALESFORCE}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
      />
      <WizardSelectionRadioOption
        className={"mt-2"}
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={PIPELINE_CREATION_OPTIONS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
        text={PIPELINE_CREATION_OPTION_LABELS.SOFTWARE_DEVELOPMENT_LIFE_CYCLE}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
        disabled={true}
      />
      <WizardSelectionRadioOption
        className={"mt-2"}
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={PIPELINE_CREATION_OPTIONS.GIT_CUSTODIAN}
        text={PIPELINE_CREATION_OPTION_LABELS.GIT_CUSTODIAN}
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}
        disabled={true}
      />
    </div>
  );
}

PipelineCreationRadioOptionInput.propTypes = {
  className: PropTypes.string,
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
};

export default PipelineCreationRadioOptionInput;


