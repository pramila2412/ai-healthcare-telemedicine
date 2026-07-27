import { parseFeetAndInches } from "@/shared/utils/measurement";

const isEmpty = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const compactErrors = (errors) =>
  Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  );

const validateRequiredText = (value, message) =>
  isEmpty(value) ? message : "";

const validatePersonName = (value, label) => {
  const normalizedValue = String(value ?? "").trim();

  if (!normalizedValue) return `${label} is required`;
  if (normalizedValue.length < 2) return `Enter a valid ${label.toLowerCase()}`;
  if (normalizedValue.length > 100) {
    return `${label} must be 100 characters or fewer`;
  }
  if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(normalizedValue)) {
    return `Enter a valid ${label.toLowerCase()}`;
  }

  return "";
};

const validateRequiredNumber = ({
  value,
  label,
  minimum,
  maximum,
  unit,
}) => {
  if (isEmpty(value)) return `${label} is required`;

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return `Enter a valid ${label.toLowerCase()}`;
  if (numericValue < minimum || numericValue > maximum) {
    return `${label} must be between ${minimum} and ${maximum} ${unit}`;
  }

  return "";
};

export const validators = Object.freeze({
  fullName: (value) => validatePersonName(value, "Full name"),

  dob: (value) => {
    if (isEmpty(value)) return "Date of birth is required";

    const dateOfBirth = new Date(value);
    if (Number.isNaN(dateOfBirth.getTime())) {
      return "Enter a valid date of birth";
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return dateOfBirth > today
      ? "Date of birth cannot be in the future"
      : "";
  },

  gender: (value) =>
    validateRequiredText(value, "Gender is required"),

  bloodGroup: (value) =>
    validateRequiredText(value, "Blood group is required"),

  email: (value) => {
    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) return "";
    if (normalizedValue.length > 254) {
      return "Email address must be 254 characters or fewer";
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedValue)
      ? ""
      : "Enter a valid email address";
  },

  emergencyContacts: (value) =>
    validateRequiredText(value, "Relationship is required"),

  contactName: (value) =>
    validatePersonName(value, "Emergency contact name"),

  phoneNumber: (value) => {
    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) return "Emergency contact phone number is required";

    return /^[6-9]\d{9}$/.test(normalizedValue)
      ? ""
      : "Enter a valid 10-digit Indian phone number";
  },

  nationality: (value) =>
    validateRequiredText(value, "Nationality is required"),

  state: (value) =>
    validateRequiredText(value, "State is required"),

  city: (value) =>
    validateRequiredText(value, "City is required"),

  height: (value, unit = "cm") => {
    if (unit === "ft/in") {
      if (isEmpty(value)) return "Height is required";

      const measurement = parseFeetAndInches(value);
      if (!measurement) return `Enter height in feet and inches, e.g., 5' 10"`;

      const totalInches = measurement.feet * 12 + measurement.inches;
      return totalInches >= 12 && totalInches <= 118
        ? ""
        : "Height must be between 1 ft and 9 ft 10 in";
    }

    return validateRequiredNumber({
      value,
      label: "Height",
      minimum: 30,
      maximum: 300,
      unit: "cm",
    });
  },

  weight: (value, unit = "kg") =>
    validateRequiredNumber({
      value,
      label: "Weight",
      minimum: unit === "lb" ? 2.2 : 1,
      maximum: unit === "lb" ? 1102.3 : 500,
      unit,
    }),

  bloodPressure: (value) => {
    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) return "";

    const match = normalizedValue.match(/^(\d{2,3})\s*\/\s*(\d{2,3})$/);
    if (!match) return "Enter blood pressure in 120/80 format";

    const systolic = Number(match[1]);
    const diastolic = Number(match[2]);
    if (
      systolic < 50 ||
      systolic > 250 ||
      diastolic < 30 ||
      diastolic > 150 ||
      systolic <= diastolic
    ) {
      return "Enter a valid blood pressure reading";
    }

    return "";
  },

  bloodSugar: (value) => {
    if (isEmpty(value)) return "";

    const numericValue = Number(value);
    if (
      !Number.isFinite(numericValue) ||
      numericValue < 20 ||
      numericValue > 1000
    ) {
      return "Enter a valid blood sugar reading";
    }

    return "";
  },

  insuranceProvider: (value) =>
    validateRequiredText(value, "Insurance provider is required"),

  insuranceHolderName: (value) =>
    validatePersonName(value, "Insurance holder name"),

  policyNumber: (value) =>
    validateRequiredText(value, "Customer ID or policy number is required"),

  insuranceDocuments: (value) =>
    Array.isArray(value) && value.length > 0
      ? ""
      : "Upload at least one insurance document",

  insuranceConfirmation: (value) =>
    value ? "" : "Confirm that the insurance information is accurate",

  loginId: (data = {}) => {
    const loginId = String(data.loginId ?? "").trim();
    if (!loginId) return "MediConnect ID is required";
    if (!/^[A-Z0-9]{6}$/.test(loginId)) {
      return "MediConnect ID must contain exactly 6 letters or numbers";
    }
    return data.isValid ? "" : "Choose an available MediConnect ID";
  },
});

export const validateBasicDetails = (formData = {}) =>
  compactErrors({
    fullName: validators.fullName(formData.fullName),
    dob: validators.dob(formData.dob),
    gender: validators.gender(formData.gender),
    bloodGroup: validators.bloodGroup(formData.bloodGroup),
    email: validators.email(formData.email),
  });

export const validateContactLocation = (formData = {}) =>
  compactErrors({
    emergencyContacts: validators.emergencyContacts(
      formData.emergencyContacts,
    ),
    contactName: validators.contactName(formData.contactName),
    phoneNumber: validators.phoneNumber(formData.phoneNumber),
    nationality: validators.nationality(formData.nationality || "Indian"),
    state: validators.state(formData.state),
    city: validators.city(formData.city),
  });

export const validateHealthOverview = (formData = {}) =>
  compactErrors({
    height: validators.height(formData.height, formData.heightUnit || "cm"),
    weight: validators.weight(formData.weight, formData.weightUnit || "kg"),
    bloodPressure: validators.bloodPressure(formData.bloodPressure),
    bloodSugar: validators.bloodSugar(formData.bloodSugar),
  });

export const validateInsurance = (formData = {}) => {
  if (
    !formData.insuranceType ||
    formData.insuranceType === "No insurance"
  ) {
    return {};
  }

  return compactErrors({
    provider: validators.insuranceProvider(formData.provider),
    holderName: validators.insuranceHolderName(formData.holderName),
    policyNumber: validators.policyNumber(formData.policyNumber),
    documents: validators.insuranceDocuments(formData.documents),
    confirmation: validators.insuranceConfirmation(formData.confirmation),
  });
};

export const validateLoginId = (formData = {}) =>
  compactErrors({
    loginId: validators.loginId(formData),
  });

export const STEP_VALIDATORS = Object.freeze({
  basic: validateBasicDetails,
  contact: validateContactLocation,
  health: validateHealthOverview,
  insurance: validateInsurance,
  loginid: validateLoginId,
});

export const validateRegistrationStep = (stepKey, formData = {}) =>
  STEP_VALIDATORS[stepKey]?.(formData) || {};

export const hasValidationErrors = (errorMap = {}) =>
  Object.values(errorMap).some(Boolean);

export const isValid = (errorMap = {}) => !hasValidationErrors(errorMap);
