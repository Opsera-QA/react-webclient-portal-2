import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./avgBuildsByUserBarChartConfigs";
import "./charts.css";


function AvgBuildDurationBarChart( { data, persona } ) {
  useEffect( () => {
    
  }, [data]);

  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    const result = data.avgBuildDuration.data;
    console.log(result);
    return (
      <>
        <div className="chart-label-text">Jenkins: Average Build Duration</div>
        <ResponsiveBar
          data={result}
          keys={config.keys}
          layout="vertical"
          indexBy="key"
          margin={config.margin}
          padding={0.3}
          colors={{ scheme: "category10" }}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          enableLabel={false}
          borderRadius={5}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          // legends={config.legends}
          theme={{
            tooltip: {
              container: {
                fontSize: "12px",
              },
            },
          }}
        />
      </>
    );
  }
}

AvgBuildDurationBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default AvgBuildDurationBarChart;

