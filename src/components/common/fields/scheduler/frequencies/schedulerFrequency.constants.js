export const SCHEDULER_FREQUENCIES = {
  ONCE: "NONE",
  DAILY: "DAY",
  WEEKLY: "WEEK",
  MONTHLY: "MONTH"
};

export const SCHEDULER_FREQUENCY_LABELS = {
  ONCE: "Once",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly"
};

export const SCHEDULER_FREQUENCY_SELECT_OPTIONS = [
  {
    value: SCHEDULER_FREQUENCIES.ONCE,
    text: SCHEDULER_FREQUENCY_LABELS.ONCE
  },
  {
    value: SCHEDULER_FREQUENCIES.DAILY,
    text: SCHEDULER_FREQUENCY_LABELS.DAILY
  },
  {
    value: SCHEDULER_FREQUENCIES.WEEKLY,
    text: SCHEDULER_FREQUENCY_LABELS.WEEKLY
  },
  {
    value: SCHEDULER_FREQUENCIES.MONTHLY,
    text: SCHEDULER_FREQUENCY_LABELS.MONTHLY
  },
];

export const getSchedulerFrequencyLabel = (frequency) => {
  switch (frequency) {
    case SCHEDULER_FREQUENCIES.ONCE:
      return SCHEDULER_FREQUENCY_LABELS.ONCE;
    case SCHEDULER_FREQUENCIES.DAILY:
      return SCHEDULER_FREQUENCY_LABELS.DAILY;
    case SCHEDULER_FREQUENCIES.WEEKLY:
      return SCHEDULER_FREQUENCY_LABELS.WEEKLY;
    case SCHEDULER_FREQUENCIES.MONTHLY:
      return SCHEDULER_FREQUENCY_LABELS.MONTHLY;
    default:
      return frequency;
  }
};