import regexHelpers from "utils/regexHelpers";

const toolMetadata = {
  idProperty: "_id",
  type: "Tool",
  activeField: "active",
  detailView: function (record) {
    return `/inventory/tools/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Tool Details [${record?.name}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Tool Name",
      id: "name",
      isRequired: true,
      maxLength: 30,
      regexValidator: regexHelpers.regexTypes["generalTextWithSpaces"],
      formText: "Names can be up to 30 characters and can consist of letters, apostrophes, numbers, spaces, dashes, colons, underscores, and periods"
    },
    {
      label: "Account",
      id: "account",
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Tool Identifier",
      id: "tool_identifier",
      isRequired: true,
      formText: "This field also updates the Tool Type value."
    },
    {
      label: "Tool Type",
      id: "tool_type_identifier",
    },
    {
      label: "Compliance",
      id: "compliance",
    },
    {
      label: "Licensing",
      id: "licensing",
    },
    {
      label: "Location",
      id: "location",
      type: "multi",
    },
    {
      label: "Classification",
      id: "classification",
    },
    {
      label: "Contacts",
      id: "contacts",
    },
    {
      label: "Application",
      id: "applications",
    },
    {
      label: "Organization",
      id: "organization",
    },
    {
      label: "External Reference",
      id: "external_reference",
      // fields: ["name", "description", "identifier"],
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Roles",
      id: "roles",
    },
    {
      label: "Configuration",
      id: "configuration",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Cost Center",
      id: "costCenter",
      inputMaskRegex: regexHelpers.regexTypes["generalText"],
      maxLength: 25
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Updated",
      id: "updatedAt",
    }
  ],
  newObjectFields: {
    name: "",
    description: "",
    tool_identifier: "",
    costCenter: "",
    compliance: [],
    licensing: [],
    location: [],
    classification: "",
    contacts: [],
    applications: [],
    organization: [],
    external_reference: [],
    active: true,
    roles: [],
    configuration: {},
    status: "",
    tags: []
  }
};

export default toolMetadata;