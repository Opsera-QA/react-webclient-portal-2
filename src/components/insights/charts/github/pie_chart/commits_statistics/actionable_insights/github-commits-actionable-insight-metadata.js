const GithubCommitsActionableMetadata = {
  idProperty: "_id",
  type: "Github Commits Table Report",
  fields: [
    {
      label: "Repository Name",
      id: "repositoryName",
    },
    {
      label: "Collaborator Name",
      id: "collaboratorName",
    },
    {
      label: "Request created at",
      id: "createdAt",
    },
    {
      label: "Commit Message",
      id: "mergeRequestTitle",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Closed at",
      id: "closedAt",
    },
  ],
  newObjectFields: {},
};

export default GithubCommitsActionableMetadata;