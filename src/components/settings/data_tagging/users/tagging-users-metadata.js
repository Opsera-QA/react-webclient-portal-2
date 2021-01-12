const usersTagsMetadata = {
  idProperty: "_id",
  type: "User Mapping",
  fields: [
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Tool",
      id: "tool_identifier",
      isRequired: true,
    },
    {
      label: "Tool Registry Configuration",
      id: "tool_id",
      isRequired: true,
    },
    {
      label: "Tool User",
      id: "tool_user_id",
      isRequired: true,
    },
    {
      label: "Tool User Email",
      id: "tool_user_email",
      // isRequired: true
    },
    {
      label: "Opsera User ID",
      id: "opsera_user_id",
      isRequired: true,
    },
    {
      label: "Opsera User",
      id: "opsera_user_email",
      isRequired: true,
    },
    {
      label: "Project/Repository Information",
      id: "tool_user_prop",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Created At",
      id: "createdAt",
    },
  ],
  newObjectFields: {
    type: "users",
    tool_identifier: "",
    tool_user_id: "",
    opsera_user_id: "",
    opsera_user_email: "",
    tool_user_prop: "",
    owner: "",
    account: {},
    createdAt: "",
    active: true,
  },
};

export default usersTagsMetadata;
