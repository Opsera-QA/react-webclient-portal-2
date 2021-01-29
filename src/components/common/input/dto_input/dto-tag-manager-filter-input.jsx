import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'
import adminTagsActions from "../../../settings/tags/admin-tags-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import {defaultTags} from "components/settings/tags/tags-metadata";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

function DtoTagManagerFilterInput({ fieldName, type, dataObject, setDataObject, disabled, filter, placeholderText, setDataFunction, allowCreate, groupBy }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      handleNull();
      setComponentLoading(true);
      await getTags();
      await removeOldTags();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog("Could not load tags.");
    }
    finally {
      setComponentLoading(false);
    }
  }

  const getTags = async () => {
    const response = await adminTagsActions.getAllTags(getAccessToken);
    let tags = response.data.data;

    if (tags && tags.length > 0)
    {
      loadTagOptions(tags);
    }
  };

  const removeOldTags = async () => {
    let newTags = [];
    if (dataObject.getData(fieldName)) {
      dataObject.getData(fieldName).map((tag, index) => {
      if (tag["type"] != null && tag["type"] !== "" && tag["value"] != null && tag["value"] !== "")
      {
        let tagOption = {type: tag["type"], value: tag["value"]};
        newTags.push(tagOption);
      }
    });
  }
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, newTags);
    setDataObject({...newDataObject});
  }

  const loadTagOptions = (tags) => {
    let currentOptions = [...defaultTags];
    tags.map((tag, index) => {
      let tagOption = {type: tag["type"], value: tag["value"]};
      currentOptions.push(tagOption);
    });

    setTagOptions(currentOptions);
  }

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    if (value.length === 0){value = null;}
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };


  const handleNull = () => {
    if (dataObject.getData(fieldName)) {
      return [...dataObject.getData(fieldName)];
    } else {
      return [];
    }
  }

  if (type == null)
  {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }

    return (
      field && type &&
      <>
        <div className="form-group custom-multiselect-input m-2">
          <label><span>{field.label}{field.isRequired ? <span className="danger-red">*</span> : null} </span></label>
          <Multiselect
            data={[...tagOptions]}
            textField={data => data["type"] + ": " + data["value"]}
            filter={filter}
            allowCreate={allowCreate}
            groupBy={groupBy}
            busy={componentLoading}
            value={handleNull()}
            placeholder={placeholderText}
            disabled={disabled}
            onChange={tag => setDataFunction ? setDataFunction(field.id, tag) : validateAndSetData(field.id, tag)}
          />
          {/*<div className="invalid-feedback">*/}
          {/*  <div>{errorMessage}</div>*/}
          {/*</div>*/}
          <small className="form-text text-muted">
            <div>{field.formText}</div>
          </small>
        </div>
      </>
    );
}

DtoTagManagerFilterInput.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  filter: PropTypes.string,
  type: PropTypes.string,
  placeholderText: PropTypes.string,
  setDataFunction: PropTypes.func,
  allowCreate: PropTypes.string,
  disabled: PropTypes.bool,
  kpiSettings: PropTypes.object,
  setKpiSettings: PropTypes.func
};

DtoTagManagerFilterInput.defaultProps = {
  filter: "contains",
  allowCreate: "onFilter",
  disabled: false,
  groupBy: "type"
}

export default DtoTagManagerFilterInput;