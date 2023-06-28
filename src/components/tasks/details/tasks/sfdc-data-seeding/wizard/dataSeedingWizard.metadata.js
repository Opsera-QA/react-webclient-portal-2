export const dataSeedingTaskWizardMetadata = {
  idProperty: "_id",
  type: "Data Seeding Task Wizard Metadata",
  activeField: "active",
  fields: [
    {
      label: "Salesforce Source Org",
      id: "sourceToolId",
    },
    {
      label: "Salesforce Destination Org",
      id: "targetToolId",
    },
    {
      label: "Task ID",
      id: "taskId",
    },
    {
      label: "Task Type",
      id: "taskType",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "Custom Object",
      id: "selectedCustomSetting",
    },
    {
      label: "Dependent Object List",
      id: "dependentObjectList"
    },
    {
      label: "Selected Dependent Object List",
      id: "selectedDependentObjectList",
    },
    {
      label: "Selected Field Properties",
      id: "selectedFieldList",
    },
    {
      label: "Query Filters",
      id: "queryFilters",
    },
    {
      label: "Query",
      id: "filterQuery"
    },
    {
      label: "Field List",
      id: "fieldList"
    },
    {
      label: "Custom Setting Edit Mode",
      id: "customSettingEditMode"
    },
    {
      label: "Query Limit",
      id: "limit"
    }
  ],
  newObjectFields: {
    taskId: "",
    recordId: "",
    sourceToolId: "",
    targetToolId: "",
    runCount: 1,
    type: "",
    taskType: "",
    selectedCustomSetting: "",
    selectedFieldList: [],
    dependentObjectList: [],
    selectedDependentObjectList: [],
    queryFilters: [],
    filterQuery: "",
    fieldList: [],
    customSettingEditMode: true,
    limit: 50,
  }
};