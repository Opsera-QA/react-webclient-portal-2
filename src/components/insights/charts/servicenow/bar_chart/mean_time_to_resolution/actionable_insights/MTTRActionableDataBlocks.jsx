import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import {
  faCheckCircle,
  faExclamationTriangle,
  faFolders,
  faLockOpenAlt,
  faShieldCheck,
  faSirenOn,
  faExclamation,
  faLock,
} from "@fortawesome/pro-light-svg-icons";

function MTTRActionableDataBlocks({ data }) {
  let className = `p-2 dark-gray-text-primary`;

  // const getColor = (metric) => {
  //   if (metric > 0) {
  //     return "danger-red";
  //   }
  //   return "green";
  // };
  //
  // const getIcon = (level) => {
  //   if (level == "Low") {
  //     return faExclamation;
  //   }
  //   if (level == "Medium") {
  //     return faExclamationTriangle;
  //   }
  //   if (level == "High") {
  //     return faSirenOn;
  //   }
  // };

  return (
    <div>
      <Row className="justify-content-sm-center px-2">
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data?.totalIssues ? data?.totalIssues : 0}
              subtitle={"Total Incidents"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data?.resolvedIssues ? data?.totalIssues : 0}
              subtitle={"Resolved Incidents"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data?.overallMTTR ? data?.overallMTTR : 0}
              subtitle={"Overall MTTR"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data?.minMTTR ? data?.minMTTR : 0}
              subtitle={"Min MTTR"}
            />
          </DataBlockBoxContainer>
        </Col>
        <Col xl={2} lg={2} sm={4} className={"my-3"}>
          <DataBlockBoxContainer showBorder={true}>
            <TwoLineScoreDataBlock
              className={className}
              score={data?.maxMTTR ? data?.maxMTTR : 0}
              subtitle={"Max MTTR"}
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    </div>
  );
}

MTTRActionableDataBlocks.propTypes = {
  data: PropTypes.object,
  level: PropTypes.string,
};

export default MTTRActionableDataBlocks;
