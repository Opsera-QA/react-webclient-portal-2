// Analytics Software Development Tab, Developer, Node Ticket AN-153
import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import { ResponsiveLine } from "@nivo/line";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import config from "./jiraIssuesCreatedVsResolvedLineChartConfigs";
import "components/analytics/charts/charts.css";
import InfoDialog from "components/common/status_notifications/info";
import ModalLogs from "components/common/modal/modalLogs";

function JiraIssuesCreatedVsResolvedLineChart({ persona, date, tags }) {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/analytics/metrics";
    const postBody = {
      request: "jiraIssuesCreatedAndResolved",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].jiraIssuesCreatedAndResolved : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType, date]);

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
  }, [fetchData]);

  //This needs to be more intelligent than just checking for precense of data.  Node can return a status 400 error from ES, and that would fail this.
  if (loading) return <LoadingDialog size="sm" />;
  if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<ErrorDialog  error="No Data is available for this chart at this time." />);
  return (
    <>
      <ModalLogs
        header="Issues Created vs. Resolved"
        size="lg"
        jsonMessage={data.data}
        dataType="line"
        show={showModal}
        setParentVisibility={setShowModal}
      />

      <div className="new-chart mb-3" style={{ height: "300px" }}>
        {typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200 ? (
          <div
            className="max-content-width p-5 mt-5"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
        ) : (
          <ResponsiveLine
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            margin={{ top: 40, right: 110, bottom: 70, left: 100 }}
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
            }}
            xFormat="time:%Y-%m-%d"
            yScale={{
              type: "linear",
              stacked: false,
            }}
            axisLeft={config.axisLeft}
            axisBottom={config.axisBottom}
            pointSize={10}
            pointBorderWidth={8}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            lineWidth={3.5}
            legends={config.legends}
            colors={(d) => d.color}
            // onClick={function(node){console.log(node.id);}}
            tooltip={(node) => (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <strong> Date: </strong> {node.point.data.xFormatted} <br></br>
                <strong>
                  {node.point.serieId}: {node.point.data.yFormatted}
                </strong>
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
        )}
      </div>
    </>
  );
}
JiraIssuesCreatedVsResolvedLineChart.propTypes = {
  persona: PropTypes.string,
};

export default JiraIssuesCreatedVsResolvedLineChart;
