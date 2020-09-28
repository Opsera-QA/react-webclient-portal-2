const toolFilterMetadata = {
  idProperty: "_id",
  type: "Tool Filter",
  fields: [
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tool Identifier",
      id: "toolIdentifier",
    },
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
  ],
  newObjectFields: {
    pageSize: 50,
    currentPage: 1,
    sortOption: "name"
  },
  // TODO: If these are the same options everywhere, move to SortFilter
  sortOptions: [
    {text: "Oldest", option: "oldest"},
    {text: "Newest", option: "newest"},
    {text: "Name", option: "name"},
    {text: "Last Updated", option: "lastupdated"}
  ]
};

export default toolFilterMetadata;