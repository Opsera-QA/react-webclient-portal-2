import React, { useEffect, useContext, useState, useMemo, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import PropTypes from "prop-types";
import axios from "axios";
import FilterContainer from "components/common/table/FilterContainer";
import Model from "core/data_model/model";
import sonarPipelineDetailsFilterMetadata from "../sonar.pipeline.details.filter.metadata";
import SonarPipelineTableMetadata from "../sonar.pipeline.table.metadata";
import { getChartTrendStatusColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import { Row, Col } from "react-bootstrap";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import chartsActions from "components/insights/charts/charts-actions";
function SonarPipelineWiseMaintainibilityDetails() {
  const { getAccessToken } = useContext(AuthContext);
  const [model, setModel] = useState(
    new Model({...sonarPipelineDetailsFilterMetadata.newObjectFields}, sonarPipelineDetailsFilterMetadata, false)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [maintainibilityData, setMaintainibilityData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  // const [error, setError] = useState(undefined);
  const [footerData, setFooterData] = useState(undefined);
  const [issueTypeData, setIssueTypeData]=useState(undefined);


  const noDataMessage = "Sonar Maintainibility report is currently unavailable at this time";

  const fields = SonarPipelineTableMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "project")),
      getTableTextColumn(getField(fields, "runCount")),
      getChartTrendStatusColumn(getField(fields, "status")),
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

  const calculateTrend = (maintainibility)=>{
    if(maintainibility.currentScanIssuesCount || !maintainibility.previousScanIssuesCount ){
      return '-';
    } else if (maintainibility.currentScanIssuesCount > maintainibility.previousScanIssuesCount ){
      return 'green';
    } else if (maintainibility.currentScanIssuesCount < maintainibility.previousScanIssuesCount) {
      return 'red';
    } else {
      return 'neutral';
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, filterDto = model) => {    
    try {
      setIsLoading(true);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "sonarRatingsCodeSmellsActionableInsights",
        undefined,
        undefined,        
        filterDto,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      );
      if (isMounted?.current === true && response?.status === 200) {
        const sonarMaintainability = response?.data?.data[0]?.sonarMaintainabilities?.data[0]?.projectData;
        await setMaintainibilityData(sonarMaintainability.map(maintainibility=>({
              ...maintainibility,
              status : calculateTrend(maintainibility)
            })));
        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", sonarMaintainability.length);
        setModel({ ...newFilterDto });
        setIssueTypeData( response?.data?.data[0]?.sonarMaintainabilities?.data[0]?.typeData[0]);
        setFooterData(response?.data?.data[0]?.sonarMaintainabilities?.data[0]?.debtData[0]);
      }
    } catch (error) {      
      if (isMounted?.current === true) {
        console.error(error);
        // setError(error);
      }
    } finally {
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
          title={`Maintainibility Report`}
          titleIcon={faDraftingCompass}
          body={getTable()}          
          className={"px-2 pb-2"}
        />
        {getFooterDetails()}
      </>
    );
  };

  const getPipelineDetails = () => {
    if (!issueTypeData){
      return null;
    }
    return (
      <Row className="py-3 px-5">
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.total}</div>
            <div className="w-100 text-muted mb-1">Maintainibility</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.critical}</div>
            <div className="w-100 text-muted mb-1">Critical</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.minor}</div>
            <div className="w-100 text-muted mb-1">Major</div>
          </div>
        </Col>
        <Col>
          <div className="metric-box p-3 text-center">
            <div className="font-weight-bold">{issueTypeData?.info}</div>
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
    
  const getPaginationOptions = () => {
    return {
      pageSize: model.getData("pageSize"),
      totalCount: model.getData("totalCount"),
      currentPage: model.getData("currentPage"),
      gotoPageFn: gotoPage,
    };
  };
  
  const gotoPage = (pageNumber, pageSize) => {
    let newModel = {...model};
    newModel.setData("currentPage", pageNumber);
    newModel.setData("pageSize", pageSize);
    setModel({...newModel});
  };
  
  const getTable = () => {    
    return (
      <CustomTable
        isLoading={isLoading}
        columns={columns}
        data={maintainibilityData}
        noDataMessage={noDataMessage}
        paginationOptions={getPaginationOptions()}
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

SonarPipelineWiseMaintainibilityDetails.propTypes = {
  dataObject: PropTypes.object,
};

export default SonarPipelineWiseMaintainibilityDetails;
