import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import usePolicyActions from "hooks/settings/organization_settings/policies/usePolicyActions";
import useLoadData from "temp-library-components/useLoadData/useLoadData";

export default function useGetPolicies() {
  const [policies, setPolicies] = useState([]);
  const policyActions = usePolicyActions();
  const {
    isLoading,
    error,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setPolicies([]);
    loadData(getPolicies).catch(() => {});
  }, []);

  const getPolicies = async () => {
    const response = await policyActions.getPolicies();
    setPolicies([...DataParsingHelper.parseNestedArray(response, "data.data", [])]);
  };

  return ({
    policies: policies,
    setPolicies: setPolicies,
    loadData: () => loadData(getPolicies),
    isLoading: isLoading,
    error: error,
  });
}
