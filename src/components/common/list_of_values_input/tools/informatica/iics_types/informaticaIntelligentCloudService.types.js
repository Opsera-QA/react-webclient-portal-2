export const INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES = {
  BUSINESS_SERVICE_DEFINITION: "BSERVICE",
  CONNECTION: "CONNECTION",
  DATA_MASKING_TASK: "DMASK",
  FIXED_WIDTH_CONFIGURATION: "FWCONFIG",
  HIERARCHICAL_SCHEMA: "HSCHEMA",
  LINEAR_TASKFLOW: "WORKFLOW",
  MAPPING: "DTEMPLATE",
  MAPPING_TASK: "MTT",
  MAPPLET: "MAPPLET",
  MASS_INGESTION_TASK: "MI_TASK",
  POWER_CENTER_TASK: "PCS",
  REPLICATION_TASK: "DRS",
  RUNTIME_ENVIRONMENT: "AGENTGROUP",
  SAVED_QUERY: "CUSTOMSOURCE",
  SCHEDULE: "SCHEDULE",
  SCHEDULE_BLACKOUT: "SCHEDULE_BLACKOUT",
  SCHEDULE_JOB: "SCHEDULE_JOB",
  SERVICE_AGENT: "AGENT",
  SYNCHRONIZATION_TASK: "DSS",
  TASKFLOW: "TASKFLOW",
  VISIO_TEMPLATE: "VISIOTEMPLATE",
};

export const INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS = {
  BUSINESS_SERVICE_DEFINITION: "Business Service Definition",
  CONNECTION: "Connection",
  DATA_MASKING_TASK: "Masking Task",
  FIXED_WIDTH_CONFIGURATION: "Fixed Width Configuration",
  HIERARCHICAL_SCHEMA: "Hierarchical Schema",
  LINEAR_TASKFLOW: "Linear Taskflow",
  MAPPING: "Mapping",
  MAPPING_TASK: "Mapping Task",
  MAPPLET: "Mapplet",
  MASS_INGESTION_TASK: "Mass Ingestion Task",
  POWER_CENTER_TASK: "PowerCenter Task",
  REPLICATION_TASK: "Replication Task",
  RUNTIME_ENVIRONMENT: "Runtime Environment",
  SAVED_QUERY: "Saved Query",
  SCHEDULE: "Schedule",
  SCHEDULE_BLACKOUT: "Schedule Blackout Period",
  SCHEDULE_JOB: "Schedule Job",
  SERVICE_AGENT: "Service Agent",
  SYNCHRONIZATION_TASK: "Synchronization Task",
  TASKFLOW: "Taskflow",
  VISIO_TEMPLATE: "Visio Template",
};

export const getInformaticaIntelligentCloudServiceTypeLabel = (iicsType) => {
  switch (iicsType) {
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.BUSINESS_SERVICE_DEFINITION:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.BUSINESS_SERVICE_DEFINITION;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.CONNECTION:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.CONNECTION;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.DATA_MASKING_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.DATA_MASKING_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.FIXED_WIDTH_CONFIGURATION:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.FIXED_WIDTH_CONFIGURATION;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.HIERARCHICAL_SCHEMA:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.HIERARCHICAL_SCHEMA;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.LINEAR_TASKFLOW:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.LINEAR_TASKFLOW;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPING:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPING;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPING_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPING_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPLET:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPLET;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MASS_INGESTION_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MASS_INGESTION_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.POWER_CENTER_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.POWER_CENTER_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.REPLICATION_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.REPLICATION_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.RUNTIME_ENVIRONMENT:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.RUNTIME_ENVIRONMENT;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SAVED_QUERY:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SAVED_QUERY;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE_BLACKOUT:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE_BLACKOUT;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE_JOB:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE_JOB;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SERVICE_AGENT:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SERVICE_AGENT;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SYNCHRONIZATION_TASK:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SYNCHRONIZATION_TASK;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.TASKFLOW:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.TASKFLOW;
    case INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.VISIO_TEMPLATE:
      return INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.VISIO_TEMPLATE;
    default:
      return iicsType;
  }
};

export const INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_SELECT_OPTIONS = [
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.BUSINESS_SERVICE_DEFINITION,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.BUSINESS_SERVICE_DEFINITION,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.CONNECTION,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.CONNECTION,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.DATA_MASKING_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.DATA_MASKING_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.FIXED_WIDTH_CONFIGURATION,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.FIXED_WIDTH_CONFIGURATION,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.HIERARCHICAL_SCHEMA,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.HIERARCHICAL_SCHEMA,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.LINEAR_TASKFLOW,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.LINEAR_TASKFLOW,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPING,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPING,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPING_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPING_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MAPPLET,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MAPPLET,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.MASS_INGESTION_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.MASS_INGESTION_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.POWER_CENTER_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.POWER_CENTER_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.REPLICATION_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.REPLICATION_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.RUNTIME_ENVIRONMENT,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.RUNTIME_ENVIRONMENT,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SAVED_QUERY,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SAVED_QUERY,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE_BLACKOUT,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE_BLACKOUT,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SCHEDULE_JOB,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SCHEDULE_JOB,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SERVICE_AGENT,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SERVICE_AGENT,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.SYNCHRONIZATION_TASK,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.SYNCHRONIZATION_TASK,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.TASKFLOW,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.TASKFLOW,
  },
  {
    text: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPE_LABELS.VISIO_TEMPLATE,
    value: INFORMATICA_INTELLIGENT_CLOUD_SERVICE_TYPES.VISIO_TEMPLATE,
  },
];