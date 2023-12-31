const awsAccountRegistrationMetadata = {
  fields: [
    {
      label: "First Name",
      id: "firstName",
      regexDefinitionName: "nameField",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Last Name",
      id: "lastName",
      regexDefinitionName: "nameField",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Email",
      id: "email",
      isRequired: true,
      isEmail: true,
      lowercase: true
    },
    {
      label: "Company",
      id: "organizationName",
      regexDefinitionName: "nameField",
      isRequired: true,
      maxLength: 50
    },
    {
      label: "Street",
      id: "street",
      regexDefinitionName: "limitedTextWithSpaces",
      // isRequired: true,
      maxLength: 150
    },
    {
      label: "City",
      id: "city",
      regexDefinitionName: "nameField",
      // isRequired: true,
      maxLength: 50
    },
    {
      label: "State",
      id: "state",
      // regexDefinitionName: "nameField",
      // isRequired: true,
      maxLength: 50
    },
    {
      label: "Zip",
      id: "zip",
      // isRequired: true,
      regexDefinitionName: "limitedTextWithSpaces",
      maxLength: 12
    },
    {
      label: "Resource Subdomain Name",
      id: "domain",
      fieldText: "When new resources are created for this account, this will be the default sub-domain name used when building DNS records.",
      inputMaskRegex: /^[A-Za-z0-9][A-Za-z0-9-]*$/,
      isDomain: true,
      isRequired: true,
      maxLength: 50,
      lowercase: true
    },
    {
      label: "Cloud Provider",
      id: "cloudProvider",
      isRequired: true
    },
    {
      label: "Region",
      id: "cloudProviderRegion",
      isRequired: true
    },
    {
      label: "Attributes",
      id: "attributes",
      // isRequired: true,
    },
    {
      label: "AWS Customer ID",
      id: "aws_customer_id",
      isRequired: true,
    },
    {
      label: "Product Code",
      id: "aws_product_code",
      isRequired: true,
    },
  ],
  newObjectFields: {
    domain: "",
    organizationName: "",
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    cloudProvider: "EKS",
    cloudProviderRegion: "us-east-2",
    aws_customer_id: "",
    aws_product_code: "7dwskd2i8nz61yttpokqug1cu",
  }
};

export default awsAccountRegistrationMetadata;
