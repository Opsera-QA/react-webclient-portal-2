import PropTypes from "prop-types";
import config from "./gitLabLeadTimeChartConfigs";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { AuthContext } from "contexts/AuthContext";
import {
    defaultConfig,
    getColorByData,
    adjustBarWidth,
    assignSuccessBarColors,
} from "../../../charts-views";
import ChartTooltip from "../../../ChartTooltip";
import { Container, Col, Row } from "react-bootstrap";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import GitLabMeanLeadTimeDataBlock from "../../data_blocks/GitLabMeanLeadTimeDataBlock";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {ResponsiveBar} from "@nivo/bar";
import GitlabLeadTimeHelpDocumentation
    from "../../../../../common/help/documentation/insights/charts/GitlabLeadTimeHelpDocumentation";

function GitLabLeadTimeChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
    const { getAccessToken } = useContext(AuthContext);
    const [error, setError] = useState(undefined);
    const [metrics, setMetrics] = useState([]);
    const [meanData, setMeanData] = useState({});
    const [meanCommitData, setMeanCommitData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

    useEffect(() => {
        if (cancelTokenSource) {
            cancelTokenSource.cancel();
        }

        const source = axios.CancelToken.source();
        setCancelTokenSource(source);

        isMounted.current = true;
        loadData(source).catch((error) => {
            if (isMounted?.current === true) {
                throw error;
            }
        });

        return () => {
            source.cancel();
            isMounted.current = false;
        };
    }, [JSON.stringify(dashboardData)]);

    const loadData = async (cancelSource = cancelTokenSource) => {
        try {
            setIsLoading(true);
            let dashboardTags =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
            let dashboardOrgs =
                dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
                    ?.value;
            const response = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "gitlabLeadTimeForChange",
                kpiConfiguration,
                dashboardTags,
                null,
                null,
                dashboardOrgs
            );
            const response2 = await chartsActions.parseConfigurationAndGetChartMetrics(
                getAccessToken,
                cancelSource,
                "gitlabAverageCommitTimeToMerge",
                kpiConfiguration,
                dashboardTags,
                null,
                null,
                dashboardOrgs
            );
            const dataObject = response?.data?.data[0]?.gitlabLeadTimeForChange?.data[0].leadTimeCommits;
            const meanDataObject = response?.data?.data[0]?.gitlabLeadTimeForChange?.data[0] || {};
            const meanCommitTimeDataObject = response2?.data?.data[0]?.gitlabAverageCommitTimeToMerge?.data || {};
            assignSuccessBarColors(dataObject);

            if (isMounted?.current === true && Array.isArray(dataObject)) {
                setMetrics(dataObject);
                setMeanData(meanDataObject);
                setMeanCommitData(meanCommitTimeDataObject);
            }
        } catch (error) {
            if (isMounted?.current === true) {
                console.error(error);
                setError(error);
            }
        } finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };
    const getMaxValue = (data) => {
        let countsMax = Math.max.apply(Math,data.map(function(o){return o.count;}));
        return countsMax;
    };
    const getChartBody = () => {
        if (!Array.isArray(metrics) || metrics.length === 0) {
            return null;
        }

        const getIcon = (data, previousData) => {
            if (data > previousData) {
                return faArrowCircleUp;
            } else
            if (data < previousData) {
                return faArrowCircleDown;
            } else
            if (data === previousData) {
                return faMinusCircle;
            } else {
                return undefined;
            }
        };

        const getLeadTimeIconColor = (data, previousData) => {
            if (data > previousData) {
                return "green";
            } else
            if (data < previousData) {
                return "red";
            } else
            if (data === previousData) {
                return "light-gray-text-secondary";
            } else {
                return "black";
            }
        };

        const getBarChart = () => {
            return (
                <div className="new-chart p-0" style={{height: "300px"}}>
                    <ResponsiveBar
                        data={metrics}
                        {...defaultConfig("Frequency (commits)", "Days",
                            false, false, "wholeNumbers", "wholeNumbers", true)}
                        {...config(getColorByData, getMaxValue(metrics))}
                        {...adjustBarWidth(metrics)}
                        tooltip={({ indexValue, value, data, color }) => <ChartTooltip
                            titles={["Number of Commits"]}
                            values={[data.count ]}
                            style={false}
                            color={color} />}
                    />
                </div>
            );
        };

        const getLeftDataBlocks = () => {
            return (
                <div>
                    <GitLabMeanLeadTimeDataBlock
                        data={meanData.currentAvgLeadTime}
                        previousData={meanData.previousAvgLeadTime}
                        getIcon={getIcon}
                        topText={"Average Lead Time (Days)"}
                        bottomText={"Previous Average Lead Time: "}
                        getIconColor={getLeadTimeIconColor}/>
                    <GitLabMeanLeadTimeDataBlock
                        data={meanCommitData.currentAvgCommitToMergeTime}
                        previousData={meanCommitData.previousAvgCommitToMergeTime != undefined? meanCommitData.previousAvgCommitToMergeTime : "N/A" }
                        getIcon={getIcon}
                        topText={"Average Merge Time (Days)"}
                        bottomText={"Previous Average Merge Time: "}
                        getIconColor={getLeadTimeIconColor}/>
                </div>
            );
        };
        return (
            <Container fluid>
                <Row className="align-items-center">
                    <Col sm={4} className={"p-2"}>
                        {getLeftDataBlocks()}
                    </Col>
                    <Col sm={8} className={"p-2"}>
                        {getBarChart()}
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Gitlab Lead Time"}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                chartHelpComponent={(closeHelpPanel) => (
                  <GitlabLeadTimeHelpDocumentation
                    closeHelpPanel={closeHelpPanel}
                  />
                )}
            />
        </div>
    );
}
GitLabLeadTimeChart.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
    nodes: PropTypes.any,
    xScale: PropTypes.any,
    yScale: PropTypes.any,
};

export default GitLabLeadTimeChart;
