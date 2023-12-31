export const ldapIdpAccountsMetaData = {
  idProperty: "name",
  type: "IdP Account",
  fields: [
  {
    label: "IdP Account Name",
    id: "name",
      isRequired: true
  },
  {
    label: "IdP Domain",
    id: "domain",
      isRequired: true
  },
  {
    label: "IdP Redirect URI",
    id: "idpRedirectURI",
      isRequired: true
  },
  {
    label: "Client ID",
    id: "clientID",
  },
  {
    label: "Issuer",
    id: "issuer",
  },
  {
    label: "Base URL",
    id: "baseUrl",
  },
  {
    label: "IdP Vendor",
    id: "idpVendor",
  },
  {
    label: "Configuration Entry Type",
    id: "configEntryType",
  },
  {
    label: "Name ID Mapping",
    id: "idpNameIDMapping",
  },
],
  newObjectFields: {
    name: "",
    domain: "",
    idpRedirectURI: "https://portal.opsera.io/implicit/callback",
    clientID: "0oaou6bztkPJFnxaL0h7",
    issuer: "https://dev-842100.oktapreview.com/oauth2/default",
    baseUrl: "https://dev-842100.oktapreview.com",
    idpVendor: "OKTA",
    configEntryType: "IDP",
    idpNameIDMapping: "idmap"
  }
};
