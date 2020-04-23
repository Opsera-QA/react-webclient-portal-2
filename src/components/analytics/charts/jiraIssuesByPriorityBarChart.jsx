// Dashboard Planning Tab, Persona Executives/Managers, Node Ticket AN-164
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./jiraIssuesByPriorityBarChartConfigs";
import "./charts.css";


function JiraIssuesByPriorityBarChart( { token, persona } ) {
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const getApiData = async () => {
    setLoading(true);
    const apiCall = new ApiService("/analytics/data", { "filter": { "data": [{ "metric": "bar", "request": "jiraIssuesByPriority" }] } }, token);
    
    apiCall.get()
      .then(res => {
        let dataObject = res && res.data ? res.data.data[0].jiraIssuesByPriority : [];
        setData(dataObject);
        setLoading(false);
      })
      .catch(err => {
        setErrors(err);
        setLoading(false);
      });
  };

  useEffect( () => {
    getApiData();
  }, []);

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  } else if (typeof data !== "object" || Object.keys(data).length == 0 || data.status !== 200) {
    return (<ErrorDialog  error="No Data Present in the ES!" />);
  } else {    
    return (
      <>
        <div className="chart-label-text">Jira: Issues By Project</div>
        <ResponsiveBar
          data={data ? data.data : []}
          keys={config.keys}
          indexBy="project"
          margin={config.margin}
          padding={0.3}
          layout={"horizontal"}
          colors={({ id, data }) => data[`${id}_color`]}
          borderColor={{ theme: "background" }}
          colorBy="id"
          defs={config.defs}
          fill={config.fill}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          enableLabel={false}
          borderRadius={0}
          labelTextColor="inherit:darker(2)"
          animate={true}
          motionStiffness={90}
          borderWidth={2}
          motionDamping={15}
          tooltip={({ indexValue, value, id }) => (
            <div>
              <strong>  Project: </strong> {indexValue}<br></br>
              <strong>  Issue Type: </strong> {id}<br></br>
              <strong>  No. of Issues: </strong> {value}<br></br>
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
JiraIssuesByPriorityBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default JiraIssuesByPriorityBarChart;
