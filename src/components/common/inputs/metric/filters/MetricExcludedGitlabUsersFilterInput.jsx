import React from "react";
import PropTypes from "prop-types";
import SupportedMetricFilterInputContainer from "components/common/metrics/container/SupportedMetricFilterInputContainer";
import { KPI_FILTER_TYPES } from "components/common/list_of_values_input/admin/kpi_configurations/filters/kpiFilter.types";
import GitlabUsersFilterSelectInput from "components/common/list_of_values_input/insights/charts/gitlab/GitlabUsersFilterSelectInput";

function MetricExcludedGitlabUsersFilterInput({
  metricFilterModel,
  setMetricFilterModel,
  metricModel,
  fieldName,
}) {
  return (
    <GitlabUsersFilterSelectInput
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      model={metricFilterModel}
      setModel={setMetricFilterModel}
    />
  );
}

MetricExcludedGitlabUsersFilterInput.propTypes = {
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
  metricModel: PropTypes.object,
  fieldName: PropTypes.string,
};

MetricExcludedGitlabUsersFilterInput.defaultProps = {
  fieldName: "gitlab-excluded-users",
};

export default MetricExcludedGitlabUsersFilterInput;
