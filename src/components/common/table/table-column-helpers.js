import { format } from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircle, faOctagon,
  faPauseCircle, faPlayCircle, faSearchPlus,
  faSpinner,
  faStopCircle,
  faTimesCircle, faTrash, faPlay, faExclamationCircle
} from "@fortawesome/pro-light-svg-icons";
import SuccessIcon from "../../common/icons/table/SuccessIcon";
import WarningIcon from "../../common/icons/table/WarningIcon";
import FailIcon from "../../common/icons/table/FailIcon";
import SuccessMetricIcon from "components/common/icons/metric/success/SuccessMetricIcon";
import DangerMetricIcon from "components/common/icons/metric/danger/DangerMetricIcon";
import React from "react";
import Model from "core/data_model/model";
import PipelineTypesField from "components/common/fields/pipelines/PipelineTypesField";
import DashboardFavoritesIcon from "components/common/icons/dashboards/DashboardFavoritesIcon";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {Button} from "react-bootstrap";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import {convertFutureDateToDhmsFromNowString} from "components/common/helpers/date-helpers";
import {capitalizeFirstLetter, hasStringValue, truncateString} from "components/common/helpers/string-helpers";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {ACCESS_ROLES_FORMATTED_LABELS} from "components/common/helpers/role-helpers";
import { getPipelineStateFieldBase} from "components/common/fields/pipelines/state/PipelineStateField";
import TagDisplayer from "components/common/fields/multiple_items/tags/TagDisplayer";
import UnchangedMetricIcon from "components/common/icons/metric/unchanged/UnchangedMetricIcon";
import NoTrendMetricIcon from "components/common/icons/metric/trend/NoTrendMetricIcon";
import IconBase from "components/common/icons/IconBase";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import { getTimeDisplay } from "components/insights/charts/sdlc/sdlc-duration-by-stage-utility";

export const getCustomTableHeader = (field) => {
  return field ? field.label : "";
};

export const getCustomTableAccessor = (field) => {
  return field ? field.id : "";
};

export const getTableTextColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    class: className ? className : undefined
  };
};

export const getTableTextColumn = (field, className) => {
  if (className) {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      class: className
    };
  }

  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined
  };
};

export const getTableDurationTextColumn = (field, className) => {
  if (className) {
    return {
      Header: getCustomTableHeader(field),
      accessor: getCustomTableAccessor(field),
      class: className,
      Cell: function parseText(row) {
        const value = row?.value;
        return getTimeDisplay(value);
      }
    };
  }

  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
    Cell: function parseText(row) {
      const value = row?.value;
      return getTimeDisplay(value);
    }
  };
};

export const getOwnerNameField = (headerText = "Owner Name") => {
  return {
    Header: headerText,
    accessor: "owner_name",
  };
};

export const getLimitedTableTextColumn = (field, maxLength, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    class: className ? className : undefined,
    Cell: function parseText(row) {
      const value = row?.value;

      if (value != null) {
        const truncatedString = truncateString(value, maxLength);

        if (truncatedString !== value) {
          return (<TooltipWrapper innerText={value}><span>{truncatedString}</span></TooltipWrapper>);
        }

        return value;
      }

      return "";
    },
  };
};

export const getFormattedLabelWithFunctionColumnDefinition = (field, formatFunction, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function formatValue(row) {
      return formatFunction(row?.value);
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTaskStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    width: 105,
    Cell: function getTaskStatus(row) {
      const taskStatus = row?.value;
      if (taskStatus == null || taskStatus === "") {
        return (
          <div className="d-flex flex-nowrap">
            <div>{getPipelineStatusIcon("created")}</div>
            <div className="ml-1">Created</div>
          </div>
        );
      }

      return (
        <div className="d-flex flex-nowrap">
          <div>{getPipelineStatusIcon(row)}</div>
          <div className="ml-1">{capitalizeFirstLetter(taskStatus)}</div>
        </div>
      );
    },
    class: className ? className : undefined
  };
};

export const getRoleArrayColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const array = row?.value;

      if (Array.isArray(array) && array.length > 0) {
        return array.map((item, index) => {
          return (`${item.role}:${item.user}:${item.group}${array.length > index + 1 ? ',' : ''}`);
        });
      }

      return "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTagColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function stringifyArray(row) {
      const tags = row?.value;

      return (
        <TagDisplayer
          tags={tags}
        />
      );
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableLeaderColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseLeader(row) {
      return row.value ? `${row.value.name} (${row.value.email})` : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDate(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateTimeColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseDateTime(row) {
      return row.value ? format(new Date(row.value), "yyyy-MM-dd', 'hh:mm a") : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getTableDateAndTimeUntilValueColumn = (header, id, fakeColumn = "fakeColumn", className) => {
  return {
    Header: header,
    accessor: fakeColumn,
    Cell: function parseDate(row) {
      const originalRow = row.row.original;
      return originalRow[id] ? convertFutureDateToDhmsFromNowString(new Date(originalRow[id])) : "";
    },
    class: className ? className : "no-wrap-inline"
  };
};

export const getPipelineStatusIcon = (row) => {
  switch (row.value) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="cell-icon red my-auto" fixedWidth />);
    case "error":
      return (<FontAwesomeIcon icon={faExclamationCircle} className="cell-icon red my-auto" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="cell-icon yellow my-auto" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="cell-icon red my-auto" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="cell-icon green my-auto" fixedWidth/>);
    case "queued":
      return (<FontAwesomeIcon icon={faPauseCircle} className="cell-icon green my-auto" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="cell-icon red my-auto" fixedWidth/>);
    case "created":
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="cell-icon green my-auto" fixedWidth/>);
  }
};

export const getAssociatedPipelineStatusIcon = (pipelineStatus) => {
  switch (pipelineStatus) {
    case "failure":
    case "failed":
      return (<FontAwesomeIcon icon={faTimesCircle} className="red" fixedWidth />);
    case "error":
      return (<FontAwesomeIcon icon={faExclamationCircle} className="red" fixedWidth />);
    case "unknown":
      return (<FontAwesomeIcon icon={faCircle} className="yellow" fixedWidth/>);
    case "rejected":
      return (<FontAwesomeIcon icon={faStopCircle} className="red" fixedWidth/>);
    case "running":
    case "processing event":
      return (<FontAwesomeIcon icon={faPlayCircle} className="green" fixedWidth/>);
    case "queued":
    case "pending":
      return (<FontAwesomeIcon icon={faPauseCircle} className="green" fixedWidth/>);
    case "stopped":
    case "halted":
      return (<FontAwesomeIcon icon={faOctagon} className="red" fixedWidth/>);
    default:
      return (<FontAwesomeIcon icon={faCheckCircle} className="green" fixedWidth/>);
  }
};

export const getPipelineTypeColumn = (field, className) => {
  return {
    Header: "",
    accessor: getCustomTableAccessor(field),
    Cell: function parseType(workflow) {
      return <PipelineTypesField fieldName={field.id} dataObject={new Model(workflow.row.original, pipelineMetadata, false)} />;
    },
    class: className ? className : "cell-center"
  };
};

export const getCustomTablePipelineStateColumnDefinition = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(tableRow) {
      const pipelineState = tableRow.row.original[field?.id];

      return (getPipelineStateFieldBase(pipelineState));
    },
    class: className
  };
};

export const getChartPipelineStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : status;
      switch (status) {
        case "failure":
        case "failed":
          return (<FailIcon />);
        case "unknown":
          return (<WarningIcon/>);
        case "passed":
        case "success":
        case "successful":
          return (<SuccessIcon/>);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getChartTrendStatusColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function parseStatus(row) {
      let status = typeof row?.value === "string" ? row.value.toLowerCase() : "";

      switch (status) {
        case "red":
          return (<DangerMetricIcon />);
        case "neutral":
          return (<UnchangedMetricIcon />);
        case "green":
        return (<SuccessMetricIcon />);
        case "-":
          return (<NoTrendMetricIcon />);
        default:
          return status;
      }
    },
    class: className ? className :  undefined
  };
};

export const getTableFavoriteColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getFavoritesIcon(row) {
      return <DashboardFavoritesIcon key={row.row.original._id} dashboard={row.row.original} dashboardsActions={dashboardsActions} />;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableDeleteColumn = (headerText, deleteFunction, className) => {
  return {
    Header: headerText,
    Cell: function getDeleteIcon(row) {
      return <FontAwesomeIcon icon={faTrash} className="pointer danger-red" onClick={() => {deleteFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className, buttonClassName) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getTableButton(row) {
      return <Button size={"sm"} variant={variant} className={buttonClassName} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}}>{buttonText}</Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getGitTaskTableRunButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getRunButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].status === "running"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
        {row?.data[row?.row?.index].status === "running" ? (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Running </span>) : (<span><FontAwesomeIcon icon={faPlay} className="mr-1" fixedWidth/> {buttonText} </span> ) }
        </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};

export const getDeletePlatformToolTableButtonColumn = (accessor = "row", headerText, variant, buttonText, buttonFunction, className) => {
  return {
    Header: headerText,
    accessor: accessor,
    Cell: function getDeleteButton(row) {
      return <Button size={"sm"} variant={variant} disabled={row?.data[row?.row?.index].toolStatus !== "ACTIVE"} onClick={() => {buttonFunction(row?.data[row?.row?.index]);}} >
                {buttonText}
            </Button>;
    },
    class: className ? className :  "no-wrap-inline py-1"
  };
};
export const getTableBooleanIconColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getStatusIcon(row) {
      return row.value ? <div><FontAwesomeIcon icon={faCheckCircle} className="green ml-2" /></div> :  <div><FontAwesomeIcon icon={faTimesCircle} className="red ml-2" /></div>;
    },
    class: className ? className : "text-left"
  };
};

export const getTableInfoIconColumn = (showInformationFunction, accessor = "row", className) => {
  return {
    Header: "Info",
    accessor: accessor,
    Cell: function getInfoIcon(row) {
      return <FontAwesomeIcon icon={faSearchPlus} className="pointer" onClick={() => {showInformationFunction(row?.data[row?.row?.index]); }}/>;
    },
    class: className ? className : undefined
  };
};

// This just takes the data field and returns the count inside the array
export const getTableArrayCountColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getCount(row) {
      return Array.isArray(row?.value) ? row.value.length : "";
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getCountColumnWithoutField = (header, accessor, className) => {
  return {
    Header: header,
    accessor: accessor,
    Cell: function getCount(row) {
      return row.value.length;
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getRoleAccessLevelColumn = (field, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getRoleAccessLevel(row) {
      const roles = row?.data[row?.row?.index]?.roles;
      const text = row?.value;

      if (text == null) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_roles_assigned}`;
      }

      const accessLevel = ACCESS_ROLES_FORMATTED_LABELS[text];

      if (accessLevel) {
        return `${accessLevel}`;
      }

      if (!Array.isArray(roles) || roles.length === 0) {
        return `${ACCESS_ROLES_FORMATTED_LABELS.no_access_rules}`;
      }

      return "ROLE ACCESS LEVEL UNKNOWN";
    },
    class: className ? className :  "no-wrap-inline"
  };
};

export const getStaticInfoColumn = (icon, accessor = "row", className) => {
  return {
    Header: "",
    accessor: accessor,
    Cell: function StaticIcon(){
      return <IconBase icon={faSearchPlus} />;
    },
    class: className ? className : undefined
  };
};

export const getExternalLinkIconColumnDefinition = (field, linkText, className) => {
  return {
    Header: getCustomTableHeader(field),
    accessor: getCustomTableAccessor(field),
    Cell: function getPageLink(row){
      return (
        <PageLinkIcon
          pageLink={row?.value}
          externalLink={true}
          pageLinkText={linkText}
        />
      );
    },
    class: className ? className : undefined
  };
};