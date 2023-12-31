import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import ProvarReportSummaryOverview
    from "./ProvarSummaryReportOverview";
import provarSummaryLogResultMetadata from "./provarSummaryLogResultMetadata";
import LoadingDialog from "components/common/status_notifications/loading";
import VanitySetTabAndViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabAndViewContainer";
import VanitySetTabViewContainer from "components/common/tabs/vertical_tabs/VanitySetTabViewContainer";
import VanitySetTabView from "components/common/tabs/vertical_tabs/VanitySetTabView";
import ProvarSummaryLogVerticalTabContainer
    from "./ProvarSummaryLogVerticalTabContainer";
import { faClipboardListCheck, faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ProvarReportView
    from "./ProvarReportView";

function ProvarLogSummaryReportPanel({ pipelineTaskData }) {
    const [provarReportModel, setProvarReportModel] = useState(undefined);
    const [provarObj, setProvarObj] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        initializeData().catch((error) => {
            if (isMounted?.current === true) {
                throw error;
            }
        });

        return () => {
            isMounted.current = false;
        };
    }, [JSON.stringify(pipelineTaskData)]);

    const initializeData = async () => {
        try {
            const jobDetails = pipelineTaskData?.api_response?.testResult;
            const deployObj = Object.keys(jobDetails)?.length > 0 ? jobDetails.testCase : undefined;
            setProvarObj(deployObj);
            if (jobDetails != null) {
                setProvarReportModel(new Model(jobDetails, provarSummaryLogResultMetadata, false));
            }
        } catch (error) {
            if (isMounted?.current === true) {
                console.error(error);
            }
        }
        finally {
            if (isMounted?.current === true) {
                setIsLoading(false);
            }
        }
    };

    // TODO: Make own component
    const getTabContentContainer = () => {
        return (
            <VanitySetTabViewContainer>
                <VanitySetTabView tabKey={"summary"}>
                    <SummaryPanelContainer className={"mx-3 mt-3"}>
                        <ProvarReportSummaryOverview
                            provarResultsModel={provarReportModel}
                        />
                        <ProvarReportView
                            provarObj={provarObj}
                        />
                    </SummaryPanelContainer>
                </VanitySetTabView>
            </VanitySetTabViewContainer>
        );
    };

    if (pipelineTaskData == null || isLoading) {
        return (
            <LoadingDialog
                message={"Loading Report"}
                size={'sm'}
            />
        );
    }

    if (provarReportModel == null) {
        return (
            <div className={"mt-3"}>
                <IconBase className={"mr-2"} icon={faCheckCircle} />
                There was no proper summary log captured with this execution.
            </div>
        );
    }

    return (
        <VanitySetTabAndViewContainer
            icon={faClipboardListCheck}
            title={`Provar Execution Summary`}
            defaultActiveKey={"summary"}
            verticalTabContainer={<ProvarSummaryLogVerticalTabContainer />}
            currentView={getTabContentContainer()}
        />
    );
}


ProvarLogSummaryReportPanel.propTypes = {
    pipelineTaskData: PropTypes.object,
};

export default ProvarLogSummaryReportPanel;