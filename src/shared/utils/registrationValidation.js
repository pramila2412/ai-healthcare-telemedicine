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

  // NOTE: `ownPhoneNumber` is the person's own contact number, used only to
  // check it doesn't match the emergency contact number. Wire this up to
  // whatever field actually stores the person's own phone number in your
  // form data (I've assumed `formData.mobileNumber` below in
  // validateContactLocation — rename if it's called something else).
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
    if (ownPhoneNumber && normalizedValue === String(ownPhoneNumber).trim()) {
      return "Emergency contact number cannot be the same as your phone number!";
    }

    return "";
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

    const normalizedValue = String(value ?? "").trim();
    if (!normalizedValue) return "Please enter your height!";
    if (/[a-zA-Z]/.test(normalizedValue)) {
      return "Height must contain only numbers!";
    }

    const numericValue = Number(normalizedValue);
    if (!Number.isFinite(numericValue)) return "Please enter a valid height!";
    if (numericValue < 0) return "Height cannot be a negative value!";
    if (numericValue === 0) return "Height must be greater than 0 cm!";
    if (numericValue > 300) return "Height must be 300 cm or less!";

    return "";
  },

  weight: (value, unit = "kg") => {
    const normalizedValue = String(value ?? "").trim();
    const unitLabel = unit === "lb" ? "pounds (lb)" : "kilograms (kg)";

    if (!normalizedValue) return "Please enter your weight!";
    if (/[a-zA-Z]/.test(normalizedValue)) return "Weight cannot contain letters!";

    const numericValue = Number(normalizedValue);
    if (!Number.isFinite(numericValue)) {
      return `Please enter your weight in ${unitLabel}!`;
    }
    if (numericValue < 0) return "Weight cannot be a negative value!";
    if (numericValue === 0) return `Weight must be greater than 0 ${unit}!`;

    const minimum = unit === "lb" ? 2.2 : 1;
    const maximum = unit === "lb" ? 1102.3 : 500;
    if (numericValue < minimum || numericValue > maximum) {
      return "Please enter a valid weight!";
    }

    return "";
  },

  bloodPressure: (value) => {
    const rawValue = String(value ?? "");
    const normalizedValue = rawValue.trim();
    if (!normalizedValue) return "";

    if (rawValue !== normalizedValue || /\s{2,}/.test(normalizedValue)) {
      return "Please remove extra spaces.";
    }

    if (/[a-zA-Z]/.test(normalizedValue)) {
      return "Blood pressure should contain numbers only";
    }

    if (/[^\d/]/.test(normalizedValue)) {
      if (normalizedValue.includes(".")) {
        return "Decimal values are not allowed.";
      }
      return "Remove special characters and enter a valid value.";
    }

    const parts = normalizedValue.split("/");
    if (parts.length !== 2) {
      return "Enter blood pressure in the format 120/80";
    }

    const [systolicPart, diastolicPart] = parts;
    if (!systolicPart || !diastolicPart) {
      return "Systolic and diastolic values are required.";
    }

    if (systolicPart.length > 3 || diastolicPart.length > 3) {
      return "Blood pressure value is too long";
    }

    const systolic = Number(systolicPart);
    const diastolic = Number(diastolicPart);

    const systolicOutOfRange = systolic < 50 || systolic > 250;
    const diastolicOutOfRange = diastolic < 30 || diastolic > 150;

    if (systolicOutOfRange && diastolicOutOfRange) {
      return "Both systolic and diastolic values are outside the acceptable range.";
    }

    if (systolicOutOfRange || diastolicOutOfRange || systolic <= diastolic) {
      return "Enter a valid blood pressure reading";
    }

    return "";
  },

  // NOTE: I've treated blood sugar as required now (empty -> "Enter blood
  // sugar in mg/dl."), since the mockup includes that message and no longer
  // shows an "optional" state. Revert to `if (isEmpty(value)) return "";`
  // if the field should stay optional.
  // Also, "Blood sugar should be between 70—90 mg/dL." from the mockup
  // reads like a normal-range hint rather than a distinct error condition,
  // so I haven't wired it up as its own branch — let me know the intended
  // trigger for it if it should be a real validation state.
  bloodSugar: (value) => {
    const rawValue = String(value ?? "");
    const normalizedValue = rawValue.trim();

    if (!normalizedValue) return "Enter blood sugar in mg/dl.";
    if (/[a-zA-Z]/.test(normalizedValue)) {
      return "Only numeric values are allowed.";
    }
    if (normalizedValue.includes(".")) return "Decimal values are not allowed.";
    if (normalizedValue.length > 4) return "Blood sugar value is too long.";

    const numericValue = Number(normalizedValue);
    if (!Number.isFinite(numericValue)) {
      return "Please enter a valid blood sugar value";
    }
    if (numericValue < 0) return "Blood sugar cannot be a negative value.";
    if (numericValue === 0) return "Blood sugar must be greater than 0 mg/dL.";
    if (numericValue < 20) return "Blood sugar value is below the acceptable range.";
    if (numericValue > 1000) return "Blood sugar value exceeds the acceptable range.";

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
    // Assumes the person's own phone number lives at `formData.mobileNumber`.
    // Update this key if your form data uses a different field name.
    phoneNumber: validators.phoneNumber(
      formData.phoneNumber,
      formData.mobileNumber,
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