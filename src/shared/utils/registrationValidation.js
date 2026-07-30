import { parseFeetAndInches } from "@/shared/utils/measurement";

const isEmpty = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const compactErrors = (errors) =>
  Object.fromEntries(
    Object.entries(errors).filter(([, message]) => Boolean(message)),
  );

const validateRequiredText = (value, message) =>
  isEmpty(value) ? message : "";

// Order matters here: each branch returns the first message that applies,
// matching the distinct copy shown in the "Full Name" mockup (numbers ->
// special characters -> extra spaces -> length checks).
const validatePersonName = (value, label) => {
  const rawValue = String(value ?? "");
  const normalizedValue = rawValue.trim();
  const lowerLabel = label.toLowerCase();

  if (!normalizedValue) return `${label} is required`;

  if (/\d/.test(normalizedValue)) {
    return `Numbers are not allowed in the ${lowerLabel}.`;
  }

  if (/[^\p{L}\s.'-]/u.test(normalizedValue)) {
    return `Special characters are not allowed in the ${lowerLabel}`;
  }

  if (rawValue !== normalizedValue || /\s{2,}/.test(normalizedValue)) {
    return `Please remove extra spaces from your ${lowerLabel}.`;
  }

  if (normalizedValue.length < 2) {
    return `${label} must contain at least 2 characters.`;
  }
  if (normalizedValue.length > 100) {
    return `${label} cannot exceed 100 characters.`;
  }

  return "";
};

const validateRequiredNumber = ({ value, label, minimum, maximum, unit }) => {
  if (isEmpty(value)) return `${label} is required`;

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue))
    return `Enter a valid ${label.toLowerCase()}`;
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
    return dateOfBirth > today ? "Date of birth cannot be in the future" : "";
  },

  gender: (value) => validateRequiredText(value, "Gender is required"),

  bloodGroup: (value) => validateRequiredText(value, "Blood group is required"),

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

  contactName: (value) => validatePersonName(value, "Emergency contact name"),

  phoneNumber: (value, ownPhoneNumber) => {
    const normalizedValue = String(value ?? "").trim();

    if (!normalizedValue) return "Emergency contact phone number is required!";
    if (!/^\d+$/.test(normalizedValue)) return "Only numbers are allowed!";
    if (normalizedValue.length < 10) {
      return "Phone number must be at least 10 digits!";
    }
    if (!/^[6-9]\d{9}$/.test(normalizedValue)) {
      return "Enter a valid 10-digit Indian phone number";
    }

    const ownDigitsOnly = String(ownPhoneNumber ?? "").replace(/\D/g, "");
    const ownLast10 = ownDigitsOnly.slice(-10);

    if (ownLast10 && normalizedValue === ownLast10) {
      return "Emergency contact number cannot be the same as your phone number!";
    }

    return "";
  },

  nationality: (value) =>
    validateRequiredText(value, "Nationality is required"),

  state: (value) => validateRequiredText(value, "State is required"),

  city: (value) => validateRequiredText(value, "City is required"),

  height: (value, unit = "cm") => {
    if (unit === "ft/in") {
      if (isEmpty(value)) return "Please enter your height";

      const measurement = parseFeetAndInches(value);
      if (!measurement) return `Enter height in feet and inches, e.g., 5' 10"`;

      const totalInches = measurement.feet * 12 + measurement.inches;
      // 50 cm ≈ 19.7 in, 250 cm ≈ 98.4 in
      return totalInches >= 19.7 && totalInches <= 98.4
        ? ""
        : "Height must be between 1 ft 8 in and 8 ft 2 in";
    }

    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) return "Please enter your height";
    if (!/^\d+(\.\d+)?$/.test(normalizedValue)) {
      return "Please enter a valid height using numbers only";
    }

    const numericValue = Number(normalizedValue);
    if (numericValue < 50) return "Height must be at least 50 cm";
    if (numericValue > 250) return "Height cannot exceed 250 cm";

    return "";
  },

  weight: (value, unit = "kg") => {
    const normalizedValue = String(value ?? "").trim();

    if (!normalizedValue) return "Please enter your weight";
    if (!/^\d+(\.\d+)?$/.test(normalizedValue)) {
      return "Please enter a valid weight using numbers only";
    }

    const numericValue = Number(normalizedValue);
    // 2 kg ≈ 4.4 lb, 300 kg ≈ 661 lb
    const minimum = unit === "lb" ? 4.4 : 2;
    const maximum = unit === "lb" ? 661 : 300;

    if (numericValue < minimum)
      return `Weight must be at least ${minimum} ${unit}`;
    if (numericValue > maximum)
      return `Weight cannot exceed ${maximum} ${unit}`;

    return "";
  },

  bloodPressure: (value) => {
    const rawValue = String(value ?? "");
    const normalizedValue = rawValue.trim();
    if (!normalizedValue) return "";

    if (rawValue !== normalizedValue || /\s{2,}/.test(normalizedValue)) {
      return "Please remove extra spaces.";
    }

    // No "/" at all → treat second half as missing
    const parts = normalizedValue.includes("/")
      ? normalizedValue.split("/")
      : [normalizedValue, ""];

    if (parts.length !== 2) {
      return "Please enter blood pressure in the format 120/80";
    }

    const [systolicPart, diastolicPart] = parts;

    if (!systolicPart || !diastolicPart) {
      return "Please enter both systolic and diastolic values";
    }

    if (!/^\d+$/.test(systolicPart) || !/^\d+$/.test(diastolicPart)) {
      return "Please enter blood pressure in the format 120/80";
    }

    if (systolicPart.length > 3 || diastolicPart.length > 3) {
      return "Blood pressure value is too long";
    }

    const systolic = Number(systolicPart);
    const diastolic = Number(diastolicPart);

    if (diastolic > systolic) {
      return "Diastolic pressure cannot be higher than systolic pressure";
    }

    const systolicOutOfRange = systolic < 40 || systolic > 260;
    const diastolicOutOfRange = diastolic < 20 || diastolic > 200;

    if (systolicOutOfRange || diastolicOutOfRange) {
      return "Please enter a valid BP between 40/20 and 260/200 mmHg";
    }

    return "";
  },

  bloodSugar: (value) => {
    const rawValue = String(value ?? "");
    const normalizedValue = rawValue.trim();

    if (!normalizedValue) return "";
    if (!/^\d+$/.test(normalizedValue)) {
      return "Please enter a valid blood sugar reading";
    }
    if (normalizedValue.length > 4) return "Blood sugar value is too long.";

    const numericValue = Number(normalizedValue);
    if (numericValue < 20 || numericValue > 600) {
      return "Please enter a blood sugar value between 20 and 600 mg/dL";
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

export const validateContactLocation = (formData = {}, context = {}) =>
  compactErrors({
    emergencyContacts: validators.emergencyContacts(formData.emergencyContacts),
    contactName: validators.contactName(formData.contactName),
    phoneNumber: validators.phoneNumber(
      formData.phoneNumber,
      context.ownPhoneNumber, // ✅ now reads from context, not formData
    ),
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
  if (!formData.insuranceType || formData.insuranceType === "No insurance") {
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

export const validateRegistrationStep = (
  stepKey,
  formData = {},
  context = {},
) => STEP_VALIDATORS[stepKey]?.(formData, context) || {};

export const hasValidationErrors = (errorMap = {}) =>
  Object.values(errorMap).some(Boolean);

export const isValid = (errorMap = {}) => !hasValidationErrors(errorMap);
