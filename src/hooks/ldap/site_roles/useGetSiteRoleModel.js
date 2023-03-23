import Model from "core/data_model/model";
import ldapSiteRoleMetadata from "@opsera/definitions/constants/accounts/groups/role/ldapSiteRoles.metadata";

export default function useGetSiteRoleModel() {
  const getSiteRoleGroupModel = (
    siteRole,
    isNew,
  ) => {
    return new Model(siteRole, ldapSiteRoleMetadata, isNew);
  };

  return ({
    getSiteRoleGroupModel: getSiteRoleGroupModel,
  });
}

