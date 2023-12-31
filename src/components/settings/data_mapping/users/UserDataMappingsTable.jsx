import React, {useMemo, useContext} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import { useHistory } from "react-router-dom";
import NewUserDataMappingOverlay from "components/settings/data_mapping/users/NewUserDataMappingOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";
import userDataMappingMetadata from "@opsera/definitions/constants/settings/data_mapping/user/userDataMapping.metadata";
import {analyticsUserDataMappingHelper} from "components/settings/data_mapping/users/analyticsUserDataMapping.helper";
import AnalyticsUserDataMappingRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_mappings/users/analyticsUserDataMappingRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function UserDataMappingsTable(
  {
    userDataMappings,
    loadData,
    isLoading,
    isMounted,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = userDataMappingMetadata.fields;
  const { userData } = useComponentStateReference();

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields,"tool_identifier")),
      getTableTextColumn(getField(fields,"opsera_user_email")),
      getTableTextColumn(getField(fields,"tool_user_prop")),
      getTableBooleanIconColumn(getField(fields,"active")),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData) => {
    history.push(analyticsUserDataMappingHelper.getDetailViewLink(rowData?.original?._id));
  };

  const noDataMessage = "No User Data Mapping Tags have been configured";

  const createUserDataMapping = () => {
    toastContext.showOverlayPanel(
      <NewUserDataMappingOverlay
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const getUsersTagsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={userDataMappings}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={AnalyticsUserDataMappingRoleHelper.canCreateAnalyticsUserDataMapping(userData) === true ? createUserDataMapping : undefined}
      supportSearch={false}
      isLoading={isLoading}
      body={getUsersTagsTable()}
      metadata={userDataMappingMetadata}
      titleIcon={faTags}
      showBorder={false}
      title={"User Data Mapping Tags"}
      type={"User Data Mapping Tag"}
      className={"pb-2"}
    />
  );
}

UserDataMappingsTable.propTypes = {
  userDataMappings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
};

export default UserDataMappingsTable;
