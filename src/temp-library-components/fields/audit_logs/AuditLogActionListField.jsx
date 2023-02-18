import React, {useState} from "react";
import PropTypes from "prop-types";
import {faList} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import auditLogActionConstants from "@opsera/definitions/constants/audit-logs/actions/auditLogAction.constants";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function AuditLogActionListField(
  {
    model,
    fieldName,
    className,
    customTitle,
  }) {
  const [searchText, setSearchText] = useState("");
  const actions = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  const field = model?.getFieldById(fieldName);

  const getFilteredItems = () => {
    if (hasStringValue(searchText) !== true) {
      return actions;
    }

    return actions.filter((action) => action.toLowerCase().includes(searchText.toLowerCase()));
  };

  const getActionCards = () => {
    if (actions.length === 0) {
      return (
        <ul className={"list-group membership-list"}>
          <div className={"h-100 m-auto text-center"}>
            <span>No Events Selected</span>
          </div>
        </ul>
      );
    }

    return (
      <ul className={"list-group membership-list"}>
        {getFilteredItems().map((action, index) => {
          return (
            <div key={action} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <div className={"m-1"}>
                {auditLogActionConstants.getUserActivityLogActionLabel(action)}
              </div>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={className}>
      <InputTitleBar
        icon={faList}
        field={field}
        customTitle={customTitle}
        searchTerm={searchText}
        setSearchTerm={setSearchText}
        showSearchBar={true}
      />
      <div className={"content-container"}>
        <div className={"px-2 py-1 d-flex justify-content-between"}>
          <div className={"my-auto"}>

          </div>
          <div className={"my-auto"}>
            {actions.length} {actions.length !== 1 ? "Events" : "Event"}
          </div>
        </div>
        {getActionCards()}
      </div>
    </div>
  );
}

AuditLogActionListField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  customTitle: PropTypes.string,
};
