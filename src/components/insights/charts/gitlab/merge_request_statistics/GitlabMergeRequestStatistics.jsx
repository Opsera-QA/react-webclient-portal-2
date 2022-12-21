import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import config from "../deployment_frequency/GitlabDeploymentFrequencyLineChartConfig";
import "components/analytics/charts/charts.css";
import ModalLogs from "components/common/modal/modalLogs";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "contexts/AuthContext";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import {
    faArrowCircleDown,
    faArrowCircleUp,
    faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import ChartTooltip from "components/insights/charts/ChartTooltip.jsx";
import {
    assignStandardColors,
    assignStandardLineColors,
    defaultConfig,
    spaceOutServiceNowCountBySeverityLegend,
} from "components/insights/charts/charts-views.js";
import { DialogToastContext } from "contexts/DialogToastContext.js";
import { ResponsiveLine } from "@nivo/line";
import { metricHelpers } from "components/insights/metric.helpers";
import IconBase from "components/common/icons/IconBase";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import _ from "lodash";
import { smartTimeFormatter } from "components/common/helpers/date/date.helpers";
import gitlabAction from "../gitlab.action";
import GitlabPipelineStatisticsTrendDataBlock
    from "../line_chart/pipeline-statistics/GitlabPipelineStatisticsTrendDataBlock";
import {getReverseTrend, getReverseTrendIcon, getTrend, getTrendIcon} from "../../charts-helpers";
import GitlabPipelineStatisticsLineChartContainer
    from "../line_chart/pipeline-statistics/GitlabPipelineStatisticsLineChartContainer";
import BadgeBase from "../../../../common/badges/BadgeBase";
import VanityMetricContainer from "../../../../common/panels/insights/charts/VanityMetricContainer";
import GitlabMergeRequestLineChartContainer from "./GitlabMergeRequestLineChartContainer";
import GitlabMergeRequestTrendDataBlock from "./GitlabMergeRequestTrendDataBlock";
import BoomiActionableTabOverlay from "../../boomi/actionable_insights/BoomiActionableTabOverlay";
function GitlabMergeRequestStatistics({
                                                kpiConfiguration,
                                                setKpiConfiguration,
                                                dashboardData,
                                                index,
                                                setKpis,
                                                showSettingsToggle,
                                            }) {
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [error, setError] = useState(undefined);
    const [openChart, setOpenChart] = useState([]);
    const [openStats, setOpenStats] = useState([]);
    const [closeChart, setCloseChart] = useState([]);
    const [closeStats, setCloseStats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const [dataBlockValues, setDataBlockValues] = useState([]);
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
            let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(
                dashboardData?.data?.filters,
            );
            let dashboardTags = dashboardMetricFilter?.tags;
            let dashboardOrgs = dashboardMetricFilter?.organizations;
            console.log("before");

            const response = await gitlabAction.gitlabMergeRequestStatistics(
                getAccessToken,
                cancelSource,
                kpiConfiguration,
                dashboardTags,
                dashboardOrgs,
            );
            console.log("response", response);
            const metrics = response?.data?.data?.gitlabMergeRequestStatistics?.data;
            if (isMounted?.current === true && metrics) {
                setCloseChart(metrics?.averageMergeTime[0]?.chartData[0]?.data);
                setCloseStats(metrics?.averageMergeTime[0]?.statisticsData);
                setOpenStats(metrics?.averageOpenTime[0]?.statisticsData);
                setOpenChart(metrics?.averageOpenTime[0]?.chartData[0]?.data);
            } else {
                setCloseStats({});
                setCloseChart([]);
                setOpenStats({});
                setOpenChart([]);

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

    const onRowSelect = () => {
        toastContext.showOverlayPanel(
            <BoomiActionableTabOverlay
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
            />
        );
    };

    const getChartBody = () => {
        if (
            !closeStats || !closeChart?.length || !openStats || !openChart?.length) {
            return null;
        }
        return (
            <div
                className="new-chart m-3 p-0"
                style={{ minHeight: "450px", display: "flex" }}
            >
                 <Row className={"w-100"}>
                     <Row
                        xl={4}
                        lg={4}
                        md={4}
                        className={"mb-2 d-flex justify-content-center"}
                    >
                         <Col md={12} className={"px-3"}>
                             <GitlabMergeRequestTrendDataBlock
                                 value={912}
                                 prevValue={
                                     912
                                 }
                                 trend={getTrend(912,912) }
                                 getTrendIcon={getTrendIcon}
                                 topText={"Total Merge Requests"}
                                 bottomText={"Prev: "}
                             />
                         </Col>
                        <Col
                            md={12}
                            className={"px-3"}
                        >
                            <GitlabMergeRequestTrendDataBlock
                                value={openStats[0]?.meanPullRequestTime}
                                prevValue={
                                    openStats[0]?.prevData
                                }
                                trend={getTrend(openStats[0]?.meanPullRequestTime, openStats[0]?.prevData)}
                                getTrendIcon={getTrendIcon}
                                topText={"Average Open Time (days)"}
                                bottomText={"Prev: "}
                            />
                        </Col>
                        <Col md={12} className={"px-3"}>
                            <GitlabMergeRequestTrendDataBlock
                                value={closeStats[0]?.meanPullRequestTime}
                                prevValue={
                                    closeStats[0]?.prevData
                                }
                                trend={getTrend(closeStats[0]?.meanPullRequestTime,closeStats[0]?.prevData) }
                                getTrendIcon={getTrendIcon}
                                topText={"Average Merge Time (days)"}
                                bottomText={"Prev: "}
                            />
                        </Col>
                    </Row>
                    <Col md={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
                        <GitlabMergeRequestLineChartContainer
                            openChart={openChart}
                            closeChart={closeChart}
                        />
                    </Col>
                     <Col md={12} className={"my-2 p-0"}>
                         <BadgeBase className={"mx-2"} badgeText={"Note: Results fetched are based on UTC timezone of selected dates"} />
                     </Col>
                 </Row>
             </div>
        );
    };

    return (
        <div>
            <VanityMetricContainer
                title={"Pipeline metrics"}
                kpiConfiguration={kpiConfiguration}
                setKpiConfiguration={setKpiConfiguration}
                chart={getChartBody()}
                loadChart={loadData}
                dashboardData={dashboardData}
                index={index}
                error={error}
                setKpis={setKpis}
                isLoading={isLoading}
                isBeta={true}
                launchActionableInsightsFunction={onRowSelect}
                // chartHelpComponent={(closeHelpPanel) => (
                //   <GitlabDeployFrequencyChartHelpDocumentation
                //     closeHelpPanel={closeHelpPanel}
                //   />
                // )}
            />
        </div>

    );
}

GitlabMergeRequestStatistics.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setKpiConfiguration: PropTypes.func,
    setKpis: PropTypes.func,
    bars: PropTypes.any,
    xScale: PropTypes.any,
    yScale: PropTypes.any,
    showSettingsToggle: PropTypes.bool,
};

export default GitlabMergeRequestStatistics;