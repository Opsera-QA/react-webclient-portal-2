import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ErrorDialog from "../../common/error";
import config from "./jenkinsStatusByJobNameBarChartConfigs";
import "./charts.css";

function JenkinsStatusByJobNameBarChar( { data, persona } ) {
  const { jenkinsStatusByJobName }  =  data;


  if (typeof data !== "object" || Object.keys(data).length == 0 || Object.keys(jenkinsStatusByJobName.data).length == 0 || jenkinsStatusByJobName.status !== 200) {
    return (<ErrorDialog error="No Data is available for this chart at this time." />);
  } else {
    
    return (
      <>
        <div className="chart-label-text">Jenkins: Build Status by Job Name</div>
        <ResponsiveBar
          data={jenkinsStatusByJobName ? jenkinsStatusByJobName.data : []}
          keys={config.keys}
          indexBy="key"
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={{ scheme: "set2" }}
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
          borderWidth={2}
          motionDamping={15}
          tooltip={({ indexValue, color, value, id }) => (
            <div>
              <strong style={{ color }}>
                Build Tag: </strong> {indexValue}<br></br>
              <strong style={{ color }}> {id} Builds: </strong> {value}
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

JenkinsStatusByJobNameBarChar.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default JenkinsStatusByJobNameBarChar;
