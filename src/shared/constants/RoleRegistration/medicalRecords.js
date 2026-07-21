export const MEDICAL_CONDITION_FIELDS = Object.freeze([
  {
    key: "allergies",
    selectedKey: "allergyTags",
    label: "Allergies",
    placeholder: "Enter your allergies",
    iconKey: "allergies",
    suggestions: [
      "Peanuts",
      "Dust",
      "Penicillin",
      "Seafood",
      "Eggs",
      "Pet Dander",
      "Pollen",
      "Latex",
    ],
  },
  {
    key: "existingConditions",
    selectedKey: "conditionTags",
    label: "Existing Conditions",
    placeholder: "Enter your existing conditions",
    iconKey: "conditions",
    suggestions: [
      "Diabetes",
      "Hypertension",
      "Asthma",
      "Thyroid Disorder",
      "Heart Disease",
      "Arthritis",
    ],
  },
  {
    key: "previousSurgeries",
    selectedKey: "surgeryTags",
    label: "Previous Surgeries",
    placeholder: "Enter your previous surgeries",
    iconKey: "surgeries",
    suggestions: [
      "Appendectomy",
      "C-section",
      "Gallbladder Surgery",
      "Cataract Surgery",
      "Knee Replacement",
    ],
  },
  {
    key: "currentMedications",
    selectedKey: "medicationTags",
    label: "Current Medications",
    placeholder: "Enter your current medications",
    iconKey: "medications",
    suggestions: [
      "Metformin",
      "Amlodipine",
      "Atorvastatin",
      "Levothyroxine",
      "Paracetamol",
    ],
  },
]);

export const DEFAULT_MEDICAL_CONDITIONS = Object.freeze({
  allergies: "",
  allergyTags: [],
  existingConditions: "",
  conditionTags: [],
  previousSurgeries: "",
  surgeryTags: [],
  currentMedications: "",
  medicationTags: [],
  supportingRecords: [],
});

export const DOCUMENT_UPLOAD_RULES = Object.freeze({
  medicalRecords: {
    accept: ".jpeg,.jpg,.png,.pdf",
    allowedExtensions: ["jpeg", "jpg", "png", "pdf"],
    supportedLabel: "JPEG, PNG, PDF",
    maxSizeMB: 5,
    maxFiles: Number.POSITIVE_INFINITY,
  },
  insuranceDocuments: {
    accept: ".jpeg,.jpg,.png,.pdf",
    allowedExtensions: ["jpeg", "jpg", "png", "pdf"],
    supportedLabel: "JPEG, PNG, PDF",
    maxSizeMB: 5,
    maxFiles: 2,
  },
});

export const INSURANCE_TYPES = Object.freeze([
  "Private",
  "Government",
  "Employer Sponsored",
]);

export const INSURANCE_PROVIDER_CONFIG = Object.freeze({
  Private: {
    label: "Insurance Provider",
    placeholder: "Select your insurance provider",
    options: [
      "Star Health Insurance",
      "LIC Health",
      "HDFC ERGO",
      "ICICI Lombard",
      "Bajaj Allianz",
      "Niva Bupa",
      "Care Health Insurance",
      "New India Assurance",
      "United India Insurance",
      "Oriental Insurance",
    ],
  },
  Government: {
    label: "Scheme Provider",
    placeholder: "Select your government scheme",
    options: [
      "Ayushman Bharat PM-JAY",
      "Employees' State Insurance Scheme",
      "Central Government Health Scheme",
      "Aarogyasri Health Care Trust",
    ],
  },
  "Employer Sponsored": {
    label: "Insurance Provider",
    placeholder: "Select your employer insurance provider",
    options: [
      "Star Health Insurance",
      "LIC Health",
      "HDFC ERGO",
      "ICICI Lombard",
      "Bajaj Allianz",
      "Niva Bupa",
      "Care Health Insurance",
      "New India Assurance",
      "United India Insurance",
      "Oriental Insurance",
    ],
  },
});

export const DEFAULT_INSURANCE_INFORMATION = Object.freeze({
  insuranceType: "",
  provider: "",
  holderName: "",
  policyNumber: "",
  documents: [],
  confirmation: false,
});

export const isInsuranceInformationComplete = (data = {}) =>
  Boolean(
    data.insuranceType &&
      data.provider &&
      data.holderName?.trim() &&
      data.policyNumber?.trim() &&
      data.confirmation,
  );
