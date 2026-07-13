// ── Field-level validators ─────────────────────────────────────────────────────

export const validators = {
  fullName: (v) =>
    !v?.trim() ? "Please enter your full name!" : "",

  dob: (v) => {
    if (!v) return "Please select your date of birth.";

    const dob = new Date(v);
    const today = new Date();

    dob.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dob >= today) {
      return "Date of birth must be before today.";
    }

    return "";
  },

  gender: (v) =>
    !v ? "Please select your gender!" : "",

  bloodGroup: (v) =>
    !v ? "Please select your blood group!" : "",

  state: (v) =>
    !v ? "Please select your state!" : "",

  city: (v) =>
    !v ? "Please select your current city!" : "",

  email: (v) => {
    if (!v?.trim()) return "";

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(v.trim())
      ? ""
      : "Please enter a valid email address.";
  },

  emergencyRelationship: (v) =>
    !v
      ? "Please select your relationship with the emergency contact."
      : "",

  emergencyContact: (v) => {
    if (!v?.trim()) return "";

    return /^\d{10}$/.test(v)
      ? ""
      : "Emergency contact number must be exactly 10 digits.";
  },

  height: (v, data = {}) => {
    if (v === "" || v === undefined || v === null) return "";

    const num = parseFloat(v);

    if (isNaN(num)) {
      return "Please enter a valid height.";
    }

    if (data.heightUnit === "cm" && (num < 50 || num > 250)) {
      return "Height should be between 50 cm and 250 cm.";
    }

    if (data.heightUnit === "ft" && (num < 1 || num > 9)) {
      return "Height should be between 1 ft and 9 ft.";
    }

    return "";
  },

  weight: (v, data = {}) => {
    if (v === "" || v === undefined || v === null) return "";

    const num = parseFloat(v);

    if (isNaN(num)) {
      return "Please enter a valid weight.";
    }

    if (data.weightUnit === "kg" && (num < 2 || num > 500)) {
      return "Weight should be between 2 kg and 500 kg.";
    }

    if (data.weightUnit === "lb" && (num < 5 || num > 1100)) {
      return "Weight should be between 5 lb and 1100 lb.";
    }

    return "";
  },

  bloodPressure: (v) => {
    if (!v) return "";

    return /^\d{2,3}\/\d{2,3}$/.test(v)
      ? ""
      : "Enter blood pressure in the format: 120/80 mmHg.";
  },

  bloodSugar: (v) => {
    if (!v) return "";

    const num = parseFloat(v);

    if (isNaN(num) || num < 0) {
      return "Blood sugar cannot be negative.";
    }

    return "";
  },
};

// ── Form-level helpers ─────────────────────────────────────────────────────────

export const validatePersonalInfo = (formData) => ({
  fullName: validators.fullName(formData.fullName),
  dob: validators.dob(formData.dob),
  gender: validators.gender(formData.gender),
  bloodGroup: validators.bloodGroup(formData.bloodGroup),
  state: validators.state(formData.state),
  city: validators.city(formData.city),
  email: validators.email(formData.email),
});

export const validateAdditionalInfo = (formData) => ({
/*   emergencyRelationship: validators.emergencyRelationship(
    formData.emergencyRelationship
  ),
  emergencyContact: validators.emergencyContact(
    formData.emergencyContact
  ), */
  height: validators.height(formData.height, formData),
  weight: validators.weight(formData.weight, formData),
  bloodPressure: validators.bloodPressure(formData.bloodPressure),
  bloodSugar: validators.bloodSugar(formData.bloodSugar),
});
export const isValid = (errorMap) =>
  Object.values(errorMap).every((msg) => msg === "");