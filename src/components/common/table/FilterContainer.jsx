import React from "react";
import PropTypes from "prop-types";
import InlineSearchFilter from "components/common/filters/search/InlineSearchFilter";
import FilterButtons from "components/common/filters/buttons/FilterButtons";
import ViewToggle from "components/common/view/ViewToggle";
import RefreshButton from "components/common/buttons/data/RefreshButton";
import FilterTitleBar from "components/common/panels/table_screen_container/FilterTitleBar";
import ActiveFilterDisplayer from "components/common/filters/ActiveFilterDisplayer";

function FilterContainer(
  {
    filterDto,
    setFilterDto,
    titleIcon,
    title,
    dropdownFilters,
    inlineFilters,
    loadData,
    isLoading,
    body,
    addRecordFunction,
    supportSearch,
    supportViewToggle,
    saveCookies
  }) {
  const getInlineFilters = () => {
    return (
      <div className="d-flex my-1 inline-filter-input">
        {inlineFilters}
        <InlineSearchFilter supportSearch={supportSearch} filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} className={"mr-2"} />
        <ViewToggle supportViewToggle={supportViewToggle} filterDto={filterDto} setFilterDto={setFilterDto} saveCookies={saveCookies} className="mr-2" />
        <RefreshButton isLoading={isLoading} loadData={loadData} className="mr-2" />
        <FilterButtons isLoading={isLoading} loadData={loadData} dropdownFilters={dropdownFilters} filterDto={filterDto} />
      </div>
    )
  };

  if (filterDto == null) {
    return body;
  }

  return (
    <div className="filter-container">
      <div className="filter-title-bar w-100">
        <div className="px-2 d-flex content-block-header">
          <FilterTitleBar
            isLoading={isLoading}
            title={title}
            filterDto={filterDto}
            titleIcon={titleIcon}
            inlineFilters={getInlineFilters()}
            addRecordFunction={addRecordFunction}
          />
        </div>
        <ActiveFilterDisplayer filterDto={filterDto} setFilterDto={setFilterDto} loadData={loadData} />
      </div>
      <div>
        {body}
      </div>
    </div>
  );
}

FilterContainer.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  dropdownFilters: PropTypes.any,
  isLoading: PropTypes.bool,
  supportSearch: PropTypes.bool,
  titleIcon: PropTypes.object,
  title:PropTypes.string,
  children: PropTypes.any,
  body: PropTypes.object,
  loadData: PropTypes.func,
  addRecordFunction: PropTypes.func,
  supportViewToggle: PropTypes.bool,
  inlineFilters: PropTypes.any,
  saveCookies: PropTypes.func
};

export default FilterContainer;


