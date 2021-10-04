import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import Model from "core/data_model/model";
// import genericChartFilterMetadata from "components/insights/charts/generic_filters/genericChartFilterMetadata";
import sonarPipelineDetailsFilterMetadata from "../sonar-pipeline-details-filter-metadata";
import SonarPipelineTableMetadata from "../sonar-pipeline-table-metadata";
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import {
    getChartTrendStatusColumn
  } from "components/common/table/table-column-helpers";

function SonarPipelineWiseVulnerabilitiesDetails({dataObject}) {

const dataObject2 = 
    {
        "maintainibilites":23,
        "minor" : 28.0,
        "major" : 36.0,
        "critical" : 32.0,
        "info" : 2.0
    };

  const { getAccessToken } = useContext(AuthContext);
  const [tableFilterDto, setTableFilterDto] = useState(
    new Model({...sonarPipelineDetailsFilterMetadata.newObjectFields}, sonarPipelineDetailsFilterMetadata, false)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineVulnerabilityData, setPipelineVulnerabilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);

  const noDataMessage = "Sonar Vulnerabilities report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "runCount")),
    //  getChartTrendStatusColumn(getField(fields, "highTrend")),
      getTableTextColumn(getField(fields, "critical")),
      getTableTextColumn(getField(fields, "major")),
      getTableTextColumn(getField(fields, "minor")),
      getTableTextColumn(getField(fields, "info")),   
      getTableTextColumn(getField(fields, "total_effort")),   

    ],
    []
  );

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
  }, []);

  const loadData = async (cancelSource = cancelTokenSource, filterDto = tableFilterDto) => {
    try {
      setIsLoading(true);
      const response ={data:
        {
            "issueTypeData" : [ 
                {
                    "minor" : 28.0,
                    "major" : 36.0,
                    "critical" : 32.0,
                    "info" : 2.0
                }
            ],
            "projectData" : [ 
                {
                    "total_effort" : 651,
                    "highTrend":'green',
                    "project" : "Node-Analytics-Services",
                    "runCount" : 54,
                    "minor" : 27.0,
                    "major" : 36.0,
                    "critical" : 32.0,
                    "info" : 2.0
                }, 
                {
                    "total_effort" : 1,
                    "project" : "Cypress-Example",
                    "runCount" : 52,
                    "highTrend":'red',
                    "minor" : 1.0,
                    "major" : 0.0,
                    "critical" : 0.0,
                    "info" : 0.0
                },
                {
                  "total_effort" : 1,
                  "project" : "Cypress-Example",
                  "runCount" : 52,
                  "highTrend":'red',
                  "minor" : 1.0,
                  "major" : 0.0,
                  "critical" : 0.0,
                  "info" : 0.0
              },
              {
                "total_effort" : 1,
                "project" : "Cypress-Example",
                "runCount" : 52,
                "highTrend":'red',
                "minor" : 1.0,
                "major" : 0.0,
                "critical" : 0.0,
                "info" : 0.0
            }
            ],
            "totalDebtData" : [ 
                {
                    "minor" : 90,
                    "major" : 440,
                    "critical" : 122,
                    "info" : 0
                }
            ]
        }
        };
    /*await chartsActions.getSecondaryInsightsData(
        getAccessToken,
        cancelSource,
        "getPipelineSonarVulnerabilitiesData",
        {
          pipelineId: dataObject?.pipelineId, 
          projectName: dataObject?.projectName, 
          runCount: dataObject?.run_count
        },
        filterDto
      );*/

      //if (isMounted?.current === true && response?.status === 200) {
        const sonarIssues = response?.data?.projectData;
        setPipelineVulnerabilityData(sonarIssues);
        let newFilterDto = filterDto;
        newFilterDto.setData(
          "totalCount",sonarIssues.length
         // response?.data?.data[0]?.PipelineSonarVulnerabilitiesData?.data[0]?.count[0]?.count
        );
        setTableFilterDto({ ...newFilterDto });
        setFooterData(response?.data?.totalDebtData[0]);
      }
    /*} catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } */finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getBody = () => {

    return (
      <>
        {getPipelineDetails()}
        <FilterContainer
          isLoading={isLoading}
          showBorder={false}
          title={`Maintainability Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />
        {getFooterDetails()}
      </>
    );
  };

  const getPipelineDetails = () => {
    return (
      <Row className="py-3 px-5">
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject2?.maintainibilites}</div>
            <div className="w-100 text-muted mb-1">Maintainibility</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject2?.critical}</div>
            <div className="w-100 text-muted mb-1">Critical</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject2?.minor}</div>
            <div className="w-100 text-muted mb-1">Major</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{dataObject2?.info}</div>
            <div className="w-100 text-muted mb-1">Info</div>
          </div>
        </Col>
      </Row>
    );
  };

  const getFooterDetails =()=>{
    if(!footerData){
      return null;
    }
    return(<>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Critical Issues : {footerData?.critical} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Major Issues : {footerData?.major} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Minor Issues : {footerData?.minor} 
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="text-right">
              Total Debt for Remediating Info Issues : {footerData?.info} 
            </Col>
          </Row>
          </>);
  };

  const getTable = () => {    
    return (
      <VanityTable
        isLoading={isLoading}
        columns={columns}
        data={pipelineVulnerabilityData}
        noDataMessage={noDataMessage}
        paginationModel={tableFilterDto}
        setPaginationModel={setTableFilterDto}
        loadData={loadData}
      />      
    );
  };

  return (
    <>
      {getBody()}      
    </>
  );

}

SonarPipelineWiseVulnerabilitiesDetails.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarPipelineWiseVulnerabilitiesDetails;
