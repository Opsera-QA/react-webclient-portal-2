import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets'
import adminTagsActions from "../../../admin/tags/admin-tags-actions";
import {AuthContext} from "../../../../contexts/AuthContext";
import tagEditorMetadata from "../../../admin/tags/tags-form-fields";
import Model from "../../../../core/data_model/model";

const defaultTags = [
  {type: "pipeline", value: "Pipeline"},
  {type: "application", value: "Application"},
  {type: "project", value: "Project"},
  {type: "release", value: "Release"},
  {type: "custom", value: "Custom"},
];

function DtoTagManagerInput({ fieldName, type, dataObject, setDataObject, disabled, filter, placeholderText, setDataFunction, allowCreate}) {
  const { getAccessToken } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [tagOptions, setTagOptions] = useState(defaultTags);
  const [componentLoading, setComponentLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setComponentLoading(true);
    await getTags();
    // await loadExtraOptions();
    setComponentLoading(false);
  }

  const getTags = async () => {
    const response = await adminTagsActions.getTags(getAccessToken);
    let tags = response.data;

    if (tags && tags.length > 0)
    {
      loadTagOptions(response.data);
    }
  };

  const saveNewTag = async (newTagDto) => {
    console.log("persist this new tag: " + JSON.stringify(newTagDto));
    let createTagResponse = await adminTagsActions.create(newTagDto, getAccessToken);
    console.log("createTagResponse: " + JSON.stringify(createTagResponse));
  };

  const loadTagOptions = (tags) => {
    let currentOptions = tagOptions;
    tags.map((tag, index) => {
      let tagOption = {type: tag["type"], value: tag["value"]};
      currentOptions.push(tagOption);
    });

    setTagOptions(currentOptions);
  }

  // TODO: Remove after everything is wired up correctly with persisting new tags
  // TODO: Check current tags to prevent duplicates
  // const loadExtraOptions = async () => {
  //   let currentTags = dataObject.getData(fieldName);
  //   let currentTagOptions = tagOptions;
  //   if (currentTags && currentTags.length > 0) {
  //     currentTags.map(tag => {
  //       if (currentTagOptions.find(tagOption => tag["type"] == null && tagOption.type === type && tagOption.value === tag) == null) {
  //         handleCreate(tag);
  //       }
  //     });
  //   }
  // };

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({...newDataObject});
  };

  const getExistingTag = (newTag) => {
    return tagOptions.find(tag => tag.type === type && tag.value === newTag);
  };

  const tagAlreadySelected = (newTag) => {
    let currentValues = dataObject.getData(fieldName);
    return currentValues != null && currentValues.length !== 0 && currentValues.find(tag => tag.type === type && tag.value === newTag) != null;
  };

  const handleCreate = async (newValue) => {
    let currentValues = dataObject.getData(fieldName);
    let existingTag = getExistingTag(newValue);

    if (existingTag != null)
    {
      console.info("Tag already exists so will not be created");
      let tagSelected = tagAlreadySelected(newValue);
      if (!tagSelected)
      {
        console.info("Tag already selected so will not be added");
        currentValues.push(existingTag);
        validateAndSetData(fieldName, currentValues);
      }
      return;
    }

    let currentOptions = [...tagOptions];
    let newTag = {type: type, value: newValue, active: true, configuration: {}};
    let newTagOption = {type: type, value: newValue};
    let newTagDto = new Model(newTag, tagEditorMetadata, true);
    await saveNewTag(newTagDto);
    currentValues.push(newTagOption);
    currentOptions.push(newTagOption);
    setTagOptions(currentOptions);
    validateAndSetData(fieldName, currentValues);
  };

  if (type == null)
  {
    return (<div className="danger-red">Error for tag manager input: You forgot to wire up type!</div>);
  }
  else {
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
            busy={componentLoading}
            onCreate={value => handleCreate(value)}
            value={[...dataObject.getData(fieldName)]}
            placeholder={placeholderText}
            disabled={disabled}
            onChange={tag => setDataFunction ? setDataFunction(field.id, tag) : validateAndSetData(field.id, tag)}
          />
          <div className="invalid-feedback">
            <div>{errorMessage}</div>
          </div>
          <small className="form-text text-muted">
            <div>{field.formText}</div>
          </small>
        </div>
      </>
    );
  }
}

DtoTagManagerInput.propTypes = {
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
  disabled: PropTypes.bool
};

DtoTagManagerInput.defaultProps = {
  filter: "contains",
  allowCreate: "onFilter",
  disabled: false
}

export default DtoTagManagerInput;