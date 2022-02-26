import React from "react";
import PropTypes from "prop-types";
import UserEditableMetricStrategicCriteriaPanel
  from "components/common/inputs/metric/data_points/strategic_criteria/UserEditableMetricStrategicCriteriaPanel";

function UserEditableMetricDataPointInputBase(
  {
    model,
    setModel,
    dataPoint,
  }) {

  // TODO: Change what's supported based on type
  const getBody = () => {
    return (
      <UserEditableMetricStrategicCriteriaPanel
        model={model}
        setModel={setModel}
        strategicCriteria={dataPoint?.strategic_criteria}
      />
    );
  };

  return (
    <div className={"m-1"}>
      <span className={"mb-2 mx-2"}>{dataPoint?.description}</span>
      <div className={"m-3"}>
        {getBody()}
      </div>
    </div>
  );
}

UserEditableMetricDataPointInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoint: PropTypes.object,
};

export default UserEditableMetricDataPointInputBase;