const roleDefinitionMetadata = {
  idProperty: "_id",
  type: "Role Definition",
  fields: [
    {
      label: "ID",
      id: "id",
    },
    {
      label: "Action",
      id: "description",
    },
    {
      label: "Allowed Roles",
      id: "allowedRoles",
    },
    {
      label: "Site Administrator",
      id: "administrator",
    },
    {
      label: "Power User",
      id: "power_user",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Manager",
      id: "manager",
    },
    {
      label: "SecOps",
      id: "secops",
    },
    {
      label: "User",
      id: "user",
    },
    {
      label: "Free Trial User",
      id: "free_trial_user",
    },
    {
      label: "No Access Restrictions",
      id: "no_access_rules",
    },
  ],
  newObjectFields: {
    id: "",
    description: "",
    allowedRoles: []
  }
};

export default roleDefinitionMetadata;