const FailedExecutionsActionableInsightsMetaData = {
  idProperty: "_id",
  type: "Failed Executions Actionable Insights",
  fields: [
    {
      label: "Average duration to complete",
      id: "actionDurationInMins",
    },
    {
      label: "Application Name",
      id: "applicationName",
    },
    {
      label: "Action Name",
      id: "actionName",
    },
    {
      label: "Director",
      id: "applicationDirector",
    },
    {
    label: "SVP",
    id: "applicationSVP"
    },
    {
      label: "VP1",
      id: "applicationVP1"
    },
    {
      label: "VP2",
      id: "applicationVP2"
    },
    {
      label: "Workflow Name",
      id: "workflowName",
    },
    {
      label: "Job Name",
      id: "jobName",
    },
    {
      label: "Point Of Failure",
      id: "pointOfFailure",
    },
    {
      label: "Run Number",
      id: "actionRunNumber",
    },

    {
      label: "Success",
      id: "successPercentage",
    },
    {
      label: "Total Commits",
      id: "numberOfCommits"
    },
    {
      label: "Trend",
      id: "runTrend",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
     {
       label: "Total Count",
       id: "totalCount",
     },
     {
       label: "Sort Option",
       id: "sortOption",
     },
     {
       label: "Search",
       id: "search",
     },
     {
       label: "Active Filters",
       id: "activeFilters",
     },
   ],
       getActiveFilters(filterDto) {
         let activeFilters = [];

         if (filterDto.getData("search") != null && filterDto.getData("search") !== "") {
           activeFilters.push({filterId: "search", text: `Keywords: ${filterDto.getData("search")}`});
         }

         return activeFilters;
       },
       newObjectFields: {
         pageSize: 10,
         currentPage: 1,
         sortOption: {text: "Newest", value: ""},
         search: "",
         activeFilters: []
       },
       sortOptions: [
         {text: "Newest", option: ""},
         {text: "Oldest", option: "oldest"},
         {text: "Action Name", option: "actionName"},
         {text: "Application Name", option: "applicationName"}
       ]
};

export default FailedExecutionsActionableInsightsMetaData;
