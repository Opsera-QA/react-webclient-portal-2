import React from "react";
import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import TextFieldBase from "components/common/form_fields/TextFieldBase";
import SFDCJobSummaryCardContainer from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/sfdc/configuration_forms/SFDCJobSummaryCardContainer";

function SFDCPackageJobSummaryCard({ sfdcStepConfigurationDto, isLoading }) {
  if (isLoading) {
    return <SFDCJobSummaryCardContainer isLoading={isLoading} />;
  }

  return (
    <SFDCJobSummaryCardContainer sfdcStepConfigurationDto={sfdcStepConfigurationDto} isLoading={isLoading}>
      <div className="mb-2">
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"toolName"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcToolName"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"isOrgToOrg"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"sfdcDestToolName"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"service"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"gitCredential"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"repository"} />
        <TextFieldBase dataObject={sfdcStepConfigurationDto} fieldName={"gitBranch"} />
      </div>
    </SFDCJobSummaryCardContainer>
  );
}

SFDCPackageJobSummaryCard.propTypes = {
  sfdcStepConfigurationDto: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SFDCPackageJobSummaryCard;
