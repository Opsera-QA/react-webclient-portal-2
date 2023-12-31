import baseActions from "../../../../../../../../utils/actionsBase";

const KafkaConnectActions = {};

KafkaConnectActions.getSCMRepoFiles = async (dataObject, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/scm/getFilesUnderPath`;
  const postBody = {
    branch: dataObject?.getData("defaultBranch"),
    filePath: dataObject?.getData("connectorFilePath"),
    gitToolId: dataObject?.getData("gitToolId"),
    projectId: dataObject?.getData("repoId"),
    workspace: dataObject?.getData("workspace"),
    service: dataObject?.getData("service"),
  };
  let response = await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

KafkaConnectActions.getConfigurations = async (id, getAccessToken, cancelTokenSource) => {
  const apiUrl = `/tools/kafkaConnect/configurations/${id}`;
  let response = await baseActions.apiGetCallV2(getAccessToken,cancelTokenSource, apiUrl);
  if (response && response.status === 200) {
    return response.data;
  }
  return [];
};

export default KafkaConnectActions;
