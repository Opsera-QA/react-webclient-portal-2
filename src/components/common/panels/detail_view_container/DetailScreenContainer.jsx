import React from "react";
import PropTypes from "prop-types";
import DetailScreenTitleBar from "components/common/panels/detail_view_container/DetailScreenTitleBar";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    type,
    actionBar,
    dataObject,
    managementViewIcon,
    managementViewLink,
    managementTitle,
    title,
    titleIcon,
    detailPanel,
    isLoading,
    activeField,
    accessDenied
  }) {

  const getTitleBar = () => {
    return (<DetailScreenTitleBar isLoading={isLoading} titleIcon={titleIcon} title={title} inactive={activeField ? dataObject?.getData(activeField) === false : false} /> );
  };

  const getDetailBody = () => {
    if (isLoading) {
      return <div className="content-block-loading m-3" />;
    }

    return (detailPanel);
  };

  const getActionBar = () => {
    if (dataObject != null) {
      return actionBar;
    }
  };

  // TODO: We should just pull all the management stuff from the breadcrumb's parent instead.
  if (!isLoading && dataObject == null) {
    return (
      <DataNotFoundContainer type={type} breadcrumbDestination={breadcrumbDestination}>
        <DataNotFoundDialog
          type={type}
          managementViewIcon={managementViewIcon}
          managementViewTitle={managementTitle}
          managementViewLink={managementViewLink}
        />
      </DataNotFoundContainer>
    )
  }

  if (accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  return (
    <div className="max-content-width mb-2 ml-2 max-content-height">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1">
        <div className="pl-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div>
          {getActionBar()}
        </div>
        <div className="p-2 mt-2 shaded-container detail-container-body">
          {getDetailBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DetailScreenContainer.propTypes = {
  activeField: PropTypes.string,
  breadcrumbDestination: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  managementViewLink: PropTypes.string,
  managementTitle: PropTypes.string,
  titleIcon: PropTypes.object,
  detailPanel: PropTypes.object,
  dataObject: PropTypes.object,
  actionBar: PropTypes.object,
  managementViewIcon: PropTypes.object,
  isLoading: PropTypes.bool,
  accessDenied: PropTypes.bool
};

export default DetailScreenContainer;