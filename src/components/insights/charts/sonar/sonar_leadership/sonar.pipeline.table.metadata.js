const SonarPipelineTableMetadata = {
  idProperty: "_id",
  type: "Sonar Pipeline Table Report",
  fields: [
    {
      label: "Project",
      id: "project",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "Timestamp",
      id: "endTimestamp",
    },
    {
      label: " Maintainibility Rating",
      id: "maintainibility_rating",
    },
    {
      label: " Reliability Rating",
      id: "reliability_rating",
    },
    {
      label: " Security Rating",
      id: "security_rating",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Critical",
      id: "critical",
    },
    {
      label: "Blocker",
      id: "blocker",
    },
    {
      label: "Major",
      id: "major",
    },
    {
      label: "Minor",
      id: "minor",
    },
    {
      label: "Info",
      id: "info",
    },
    {
      label: "Remediation Effort (in minutes)",
      id: "effort",
    },
  ],
  newObjectFields: {},
};

export default SonarPipelineTableMetadata;