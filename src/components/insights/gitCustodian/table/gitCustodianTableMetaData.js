import { addDays } from "date-fns";

const GitCustodianTableMetaData = {
  idProperty: "_id",
  type: "Git Custodian",
  fields: [
    {
      label: "Date Created",
      id: "commitDate",
    },
    {
      label: "Author",
      id: "author",
    },
    {
      label: "Path",
      id: "path",
    },
    {
      label: "Origin",
      id: "service",
    },
    {
    label: "Exposed For",
    id: "exposedHours"
    },
    {
      label: "Library",
      id: "library"
    },
    {
      label: "Repository",
      id: "repository"
    },
    {
      label: "Main Branch",
      id: "mainBranch"
    },
    {
      label: "Jira Ticket",
      id: "jiraTicket"
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Type",
      id: "type",
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
      label: "Owner",
      id: "owner",
    },
    {
      label: "Tag",
      id: "tag",
    },
    {
      label: "Search",
      id: "search",
    },
    {
      label: "Active Filters",
      id: "activeFilters",
    },
    {
      label: "Repositories",
      id: "repositories",
    },
    {
      label: "Authors",
      id: "authors",
    },
    {
      label: "Line Number",
      id: "lineNumber",
    },
    {
      label: "Tool Registry Entry",
      id: "tool"
    },
    {
      label: "Jira Project Name",
      id: "projectName"
    },
    {
      label: "Jira Issue Type",
      id: "issueType"
    },
    {
      label: "Description",
      id: "description"
    },
    {
      label: "Summary",
      id: "summary"
    },
  ],
  getActiveFilters(filterDto) {
     let activeFilters = [];

     if (filterDto.getData("repositories") != null) {
       activeFilters.push({filterId: "repositories", ...filterDto.getData("repositories")});
     }

     if (filterDto.getData("authors") != null) {
       activeFilters.push({filterId: "authors", ...filterDto.getData("authors")});
     }

     if (filterDto.getData("status") != null) {
        activeFilters.push({filterId: "status", ...filterDto.getData("status")});
     }

     if (filterDto.getData("service") != null) {
       activeFilters.push({filterId: "service", ...filterDto.getData("service")});
     }

     return activeFilters;
  },
  newObjectFields: {
     pageSize: 10,
     currentPage: 1,
     sortOption: {text: "Newest", value: ""},
     search: "",
     activeFilters: [],
     date: {
       startDate: new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)),
       endDate: new Date(new Date().setHours(0, 0, 0, 0)),
       key: "selection",
     }
  },
    sortOptions: [
     {text: "Newest", option: ""},
     {text: "Oldest", option: "oldest"},
     {text: "Date Created", option: "commitDate"},
     {text: "Author", option: "author"},
     {text: "Origin", option: "service"}
  ]
};

export default GitCustodianTableMetaData;
