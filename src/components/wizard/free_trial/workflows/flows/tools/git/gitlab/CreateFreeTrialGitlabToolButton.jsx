import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { dateHelpers } from "components/common/helpers/date/date.helpers";

export default function CreateFreeTrialGitlabToolButton(
  {
    gitToolModel,
    gitToolId,
    setGitToolId,
    onSuccessFunction,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();

  const saveConnectionDetails = async (toolId) => {
    const configuration = gitToolModel?.getPersistData();
    configuration.accountPassword = await toolsActions.saveSimpleVaultPasswordToVaultV2(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      configuration?.accountPassword,
    );
    configuration.secretPrivateKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      "secretPrivateKey",
      configuration?.secretPrivateKey,
      );
    configuration.secretAccessTokenKey = await toolsActions.saveThreePartToolPasswordToVaultV3(
      getAccessToken,
      cancelTokenSource,
      toolId,
      toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
      "secretAccessTokenKey",
      configuration?.secretAccessTokenKey,
    );

    return await toolsActions.updateToolConnectionDetails(
      getAccessToken,
      cancelTokenSource,
      toolId,
      configuration,
    );
  };

  const handleGitToolCreation = async () => {
    let toolId = gitToolId;

    const accountUsername = dataParsingHelper.parseString(gitToolModel?.getData("accountUsername"), "");
    const createDate = dateHelpers.getNowFormattedDateString();
    if (isMongoDbId(gitToolId) !== true) {
      const newTool = {
        name: `${accountUsername} - Gitlab Tool - ${createDate}`,
        tool_identifier: toolIdentifierConstants.TOOL_IDENTIFIERS.GITLAB,
        tool_type_identifier: "source",
        active: true,
      };

      const response = await toolsActions.createStandaloneTool(
        getAccessToken,
        cancelTokenSource,
        newTool,
      );

      toolId = response?.data?._id;
    }
    await saveConnectionDetails(toolId);

    setGitToolId(toolId);
    onSuccessFunction();
  };

  return (
    <CreateButton
      addAnotherOption={false}
      showSuccessToasts={false}
      customLabel={"Continue"}
      createRecord={handleGitToolCreation}
      recordDto={gitToolModel}
    />
  );
}

CreateFreeTrialGitlabToolButton.propTypes = {
  gitToolModel: PropTypes.object,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
};

