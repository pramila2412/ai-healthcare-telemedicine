export const STEP_INDEXES = {
  PERSONAL_DETAILS: 0,
  ADDITIONAL_INFORMATION: 1,
  MEDICAL_HISTORY: 2,
  INSURANCE_INFORMATION: 3,
  HEALTH_RECORDS: 4,
  REVIEW_COMPLETE: 5,
};

export const registrationSteps = [
  {
    id: STEP_INDEXES.PERSONAL_DETAILS,
    title: "Personal Details",
  },
  {
    id: STEP_INDEXES.ADDITIONAL_INFORMATION,
    title: "Additional Information",
  },
  {
    id: STEP_INDEXES.MEDICAL_HISTORY,
    title: "Medical History",
  },
  {
    id: STEP_INDEXES.INSURANCE_INFORMATION,
    title: "Insurance Information",
  },
  {
    id: STEP_INDEXES.HEALTH_RECORDS,
    title: "Health Records",
  },
  {
    id: STEP_INDEXES.REVIEW_COMPLETE,
    title: "Review & Complete",
  },
];

export const profileProgressByStep = {
  [STEP_INDEXES.MEDICAL_HISTORY]: 40,
  [STEP_INDEXES.INSURANCE_INFORMATION]: 60,
  [STEP_INDEXES.HEALTH_RECORDS]: 75,
  default: 40,
};