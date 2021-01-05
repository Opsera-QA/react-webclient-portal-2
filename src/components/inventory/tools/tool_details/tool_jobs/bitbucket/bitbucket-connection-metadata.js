const bitbucketConnectionMetadata = {
  type: "Bitbucket Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "URL",
      id: "url",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
    },
    {
      label: "Enable Two-Factor Authentication",
      id: "twoFactorAuthentication",
    },
  ],
  fieldsAlt: [
    {
      label: "URL",
      id: "url",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Password",
      id: "accountPassword",
    },
    {
      label: "Private Key",
      id: "secretPrivateKey",
      isRequired: true,
    },
    {
      label: "Access Key",
      id: "secretAccessTokenKey",
      isRequired: true,
      maxLength: 256,
    },
    {
      label: "Enable Two-Factor Authentication",
      id: "twoFactorAuthentication",
    },
  ],
  newModelBase:
    {
      url: "https://api.bitbucket.org/",
      accountUsername: "",
      accountPassword: "",
      secretPrivateKey: "",
      secretAccessTokenKey: "",
      twoFactorAuthentication: false
    }
};

export default bitbucketConnectionMetadata;