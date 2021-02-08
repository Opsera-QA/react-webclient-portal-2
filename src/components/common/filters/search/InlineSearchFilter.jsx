import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faSpinner} from "@fortawesome/pro-light-svg-icons";

function InlineSearchFilter({ filterDto, setFilterDto, loadData, disabled, fieldName, supportSearch, className}) {
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSetData = (value) => {
    let newFilterDto = {...filterDto};
    newFilterDto.setData(fieldName, value);
    setFilterDto({...newFilterDto});
  };

  const handleSearch = async () => {
    try {
      let newFilterDto = {...filterDto};
      setIsLoading(true);
      newFilterDto.setData("currentPage", 1);
      setFilterDto({...newFilterDto});
      await loadData(newFilterDto);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getSearchIcon = () => {
    if (isLoading) {
      return <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>;
    }

    return  <FontAwesomeIcon icon={faSearch} fixedWidth />;
  }

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  }

  if (filterDto == null || supportSearch !== true) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size="sm">
        <input
          disabled={disabled}
          placeholder="Search"
          value={filterDto.getData(fieldName)}
          className="inline-search-filter inline-filter-input"
          onKeyPress={(event) => handleKeyPress(event)}
          onChange={e => validateAndSetData(e.target.value)}
        />
        <InputGroup.Append>
          <Button className="inline-filter-input filter-bg-white" variant="outline-primary" onClick={handleSearch}>
            {getSearchIcon()}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

InlineSearchFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
  supportSearch: PropTypes.bool,
  className: PropTypes.string
};

InlineSearchFilter.defaultProps = {
  fieldName: "search"
};

export default InlineSearchFilter;


