const taskScheduleMetadata = {
  type: "Task Schedule",
  fields: [
    {
      label: "Execution Date",
      id: "executionDate",
      isRequired: true,
    },
    {
      label: "Frequency",
      id: "recurring",
      isRequired: true
    },
  ],
  newObjectFields: {
    recurring: "NONE",
    executionDate: new Date(),
    active: true,
  },
};

export default taskScheduleMetadata;