import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./xunitMaxMinPercBarChartConfigs";
import "./charts.css";


function XUnitMaxMinPercBarChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {
    const { xunitMaxMinPerc }  =  data;
    return (
      <>
        <div className="chart-label-text">X Unit: Max/Min/Percentiles Test Duration</div>
        <ResponsiveBar
          data={xunitMaxMinPerc ? xunitMaxMinPerc.data : []}
          keys={config.keys}
          groupMode="grouped"
          layout="horizontal"
          indexBy="buildId"
          margin={config.margin}
          padding={0.1}
          colors={{ scheme: "set1" }}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          enableLabel={false}
          borderRadius={0}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          // legends={config.legends}
          tooltip={({ indexValue, value, id, color }) => (
            <div>
              <strong style={{ color }}>
              Build Number: </strong> {indexValue}<br></br>
              <strong style={{ color }}>  {id} Test Case Duration: </strong> {value} seconds
            </div>
          )}
          theme={{
            tooltip: {
              container: {
                fontSize: "16px",
              },
            },
          }}
        />
      </>
    );
  }
}

XUnitMaxMinPercBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default XUnitMaxMinPercBarChart;

