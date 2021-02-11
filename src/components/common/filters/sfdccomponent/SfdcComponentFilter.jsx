import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

function SfdcComponentFilter({ componentType, filterDto, setFilterDto, className}) {

  const setData = (fieldName, value) => {    
    let newDataObject = filterDto;
    newDataObject.setData(fieldName, value.value);    
    setFilterDto({...newDataObject});
  };

  if (filterDto == null) {
    return null;
  }

  return (
    <div className={className} style={{width: "200px"}}>
      <FilterSelectInputBase
        fieldName={"classFilter"}
        placeholderText={"Filter By Component"}
        setDataObject={setFilterDto}
        dataObject={filterDto}
        selectOptions={componentType}
        setDataFunction={setData}
      />
    </div>
  );
}

SfdcComponentFilter.propTypes = {
  componentType: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  className: PropTypes.string
};

export default SfdcComponentFilter;


