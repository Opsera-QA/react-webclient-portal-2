import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function TerraformGitRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    const repoId = selectedOption?.id || selectedOption?.repositoryId || "";
    const gitUrl = selectedOption?.httpUrl || selectedOption?.remoteUrl || "";
    const repoName = selectedOption?.nameSpacedPath || selectedOption?.name || "";
    newModel.setData("repositoryName", repoName);
    newModel.setData("gitRepository", selectedOption?.name);
    newModel.setData("gitRepositoryID", repoId);
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    newModel.setData("gitUrl", gitUrl);
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"gitRepository"}
       service={model?.getData("type")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

TerraformGitRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformGitRepositorySelectInput;