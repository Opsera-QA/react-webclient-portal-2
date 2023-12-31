const gitlabPendingMergeRequestsMetadata = {
  idProperty: "_id",
  type: "Gitlab Pending Merge Requests",
  fields: [
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Total Count",
      id: "totalCount",
    },
    {
      label: "Sort Option",
      id: "sortOption",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Author",
      id: "AuthorName",
    },
    {
      label: "Reviewer",
      id: "AssigneeName",
    },
    {
      label: "Merge Request Title",
      id: "MergeRequestTitle",
    },
    {
      label: "Branch",
      id: "BranchName",
    },
    {
      label: "Project",
      id: "ProjectName",
    },
    {
      label: "Created Time",
      id: "mrCreatedTimeTimeStamp",
    },
    {
      label: "View MR",
      id: "mergeRequestUrl",
    },
  ],
  newObjectFields: {
    pageSize: 5,
    currentPage: 1,
    sortOption: { text: "Newest", value: "" },
    search: "",
    type: "pending",
  },
  sortOptions: [
    { text: "Newest", option: "" },
    { text: "Oldest", option: "oldest" },
  ],
};

export default gitlabPendingMergeRequestsMetadata;
