// Ticket Number - AN 43 Deployment Frequency
// Worked on By - Shrey Malhotra
// Sprint - Analytics Mt. Rainier

import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import ErrorDialog from "components/common/status_notifications/error";
import "components/analytics/charts/charts.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../api/apiService";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ModalLogs from "components/common/modal/modalLogs";

function AnchoreVulnerabilitiesByDateLineChart({ persona, date, tags }) {
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
      request: "anchoreVulnerabilityFrequency",
      startDate: date.start,
      endDate: date.end,
      tags: tags
    };

    try {
      const res = await axiosApiService(accessToken).post(apiUrl, postBody);
      let dataObject = res && res.data ? res.data.data[0].anchoreVulnerabilityFrequency : [];
      setData(dataObject);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrors(err.message);
    }
  }, [contextType]);

  useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await fetchData();
      } catch (err) {
        if (err.name === "AbortError")
          // console.log("Request was canceled via controller.abort");
          return;
      }
    };
    runEffect();

    return () => {
      controller.abort();
    };
  }, [fetchData, date]);

  if (loading) return <LoadingDialog size="sm" />;
  else if (error) return <ErrorDialog error={error} />;
  // } else if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return (<div style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}><ErrorDialog error="No Data is available for this chart at this time." /></div>);
  else
    return (
      <>
        <ModalLogs
          header="Vulnerability Frequency"
          size="lg"
          jsonMessage={data.data}
          dataType="bar"
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
              indexBy="date"
              // indexBy="date"
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
              }}
              xFormat="time:%Y-%m-%d"
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              axisTop={null}
              axisRight={null}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Number of Vulnerabilities",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              axisBottom={{
                format: "%b %d",
                tickValues: data.maxLength && data.maxLength > 10 ? 10 : 'every 1 days',
                tickRotation: -25,
                legendOffset: -12,
              }}
              colors={{ scheme: "category10" }}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
      </>
    );
}
AnchoreVulnerabilitiesByDateLineChart.propTypes = {
  persona: PropTypes.string,
};

export default AnchoreVulnerabilitiesByDateLineChart;
