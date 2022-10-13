import { addDays } from "date-fns";

export const GitCustodianFilterMetadata = {
  idProperty: "_id",
  type: "Git Custodian",
  fields: [
    {
      label: "Date Created",
      id: "commitDate",
    },
    {
      label: "Scanned On",
      id: "lastScannedOn",
    },
    {
      label: "Author",
      id: "author",
    },
    {
      label: "Email",
      id: "email",
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
      id: "exposedHours",
    },
    {
      label: "Library",
      id: "library",
    },
    {
      label: "Repository",
      id: "repository",
    },
    {
      label: "Main Branch",
      id: "mainBranch",
    },
    {
      label: "Jira Ticket",
      id: "jiraTicket",
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
      label: "Tags",
      id: "tags",
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
      id: "tool",
    },
    {
      label: "Jira Project Name",
      id: "projectName",
    },
    {
      label: "Jira Issue Type",
      id: "issueType",
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Summary",
      id: "summary",
    },
    {
      label: "Date Range",
      id: "date",
    },
  ],
  getActiveFilters(filterDto) {
    let activeFilters = [];

    if (filterDto.getData("repositories") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("repositories").map(filter => ({
        filterId: "repositories",
        text: `Repository: ${filter}`,
      }))];
    }

    if (filterDto.getData("authors") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("authors").map(filter => ({
        filterId: "authors",
        text: `Author: ${filter}`,
      }))];
    }

    if (filterDto.getData("status") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("status").map(filter => ({
        filterId: "status",
        text: `Status: ${filter}`,
      }))];
    }

    if (filterDto.getData("service") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("service").map(filter => ({
        filterId: "service",
        text: `Origin: ${filter}`,
      }))];
    }

    if (filterDto.getData("email") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("email").map(filter => ({
        filterId: "email",
        text: `Email: ${filter}`,
      }))];
    }

    if (filterDto.getData("type") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("type").map(filter => ({
        filterId: "type",
        text: `Type: ${filter}`,
      }))];
    }

    if (filterDto.getData("tags") != null) {
      activeFilters = [...activeFilters, ...filterDto.getData("tags").map(filter => ({
        filterId: "tags",
        text: `${filter.type}: ${filter.value}`,
      }))];
    }

    return activeFilters;
  },
  newObjectFields: {
    pageSize: 10,
    currentPage: 1,
    sortOption: { text: "Newest", value: "" },
    search: "",
    activeFilters: [],
    tags: [],
    date: {
      startDate: new Date(addDays(new Date(), -90).setHours(0, 0, 0, 0)),
      endDate: new Date(new Date().setHours(0, 0, 0, 0)),
      key: "selection",
    },
  },
  sortOptions: [
    { text: "Newest", option: "" },
    { text: "Oldest", option: "oldest" },
    { text: "Author", option: "author" },
    { text: "Type", option: "type" },
  ],
};