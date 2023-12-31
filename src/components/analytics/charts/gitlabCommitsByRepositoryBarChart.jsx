// Dashboard Planning tab, Persona Executives/Managers, Node Ticket AN-154
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../contexts/AuthContext";
import { ResponsiveBar } from "@nivo/bar";
import { axiosApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/status_notifications/loading";
import ErrorDialog from "../../common/status_notifications/error";
import config from "./gitlabCommitsByRepositoryBarChartConfigs";
import "./charts.css";
import InfoDialog from "../../common/status_notifications/info";
import ModalLogs from "../../common/modal/modalLogs";



function GitlabCommitsByRepositoryBarChart( { persona } ) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, []);


  const fetchData = async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/data";   
    const postBody = {
      data: [
        { 
          request: "gitlabCommitsByRepository",
          metric: "bar" 
        }
      ]
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].gitlabCommitsByRepository : [];
      setData(dataObject);
      setLoading(false);
    }
    catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  };


  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if(loading) {
    return (<LoadingDialog size="sm" />);
  } else if (error) {
    return (<ErrorDialog  error={error} />);
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  } else {    
    return (
      <>
        <ModalLogs header="Tickets Assigned by User" size="lg" jsonMessage={data.data} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

        <div className="chart mb-3" style={{ height: "300px" }}>

          <div className="chart-label-text">Gitlab: Commits per Repository</div>
          {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
            <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
            : 
            <ResponsiveBar
              data={data ? data.data : []}
              onClick={() => setShowModal(true)}
              keys={config.keys}
              indexBy="repository"
              margin={config.margin}
              padding={0.3}
              layout={"horizontal"}
              colors={{ scheme: "dark2" }}
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
              borderRadius={5}
              labelTextColor="inherit:darker(2)"
              animate={true}
              motionStiffness={90}
              borderWidth={2}
              motionDamping={15}
              legends={config.legends}
              tooltip={({ indexValue, value, color }) => (
                <div>
                  <strong style={{ color }}>  Repository: </strong> {indexValue}<br></br>
                  <strong style={{ color }}>  No. of Commits: </strong> {value} Commits <br></br>
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
          }
        </div>
      </>
    );
  }
}
GitlabCommitsByRepositoryBarChart.propTypes = {
  persona: PropTypes.string
};

export default GitlabCommitsByRepositoryBarChart;
