const argoRepositoryMetadata = {
  type: "Argo Repository",
  fields: [
    {
      label: "Argo Tool",
      id: "toolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      lowercase: true,
      spacesAllowed: false,
      formText: "Name cannot contain spaces.",
      maxLength: 63
    },
    {
      label: "SCM type",
      id: "service",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },   
    {
      id: "gitUrl",
    },
    {
      id: "sshUrl",
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Repository Name",
      id: "repository",
      isRequired: true
    },
    {
      label: "Repository Type",
      id: "repositoryType",
      isRequired: true
    },
  ],
  newObjectFields: {
    _id: "",
    name: "",
    gitToolId: "",
    service: "",
    gitUrl: "",
    sshUrl: "",
    workspace: "",
    repository: "",
    repositoryType: "git",
  }
};

export default argoRepositoryMetadata;