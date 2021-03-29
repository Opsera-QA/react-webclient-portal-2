// TODO: Move to server, pull with data
import regexHelpers from "utils/regexHelpers";

export const organizationMetadata = {
  idProperty: "name",
  type: "Organization",
  detailView: function (record) {
    return `/settings/organizations/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Organization Details [${record.getData("name")}]`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      minLength: 3,
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces,
    },
    {
      label: "Leader",
      id: "leader",
    },
    {
      label: "Owner",
      id: "owner",
    },
    {
      label: "Owner Name",
      id: "owner_name",
    },
    {
      label: "Tags",
      id: "tags",
    },
  ],
  newObjectFields: {
    name: "",
    owner: "",
    leader: null,
    tags: []
  }
};