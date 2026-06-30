export const PATIENT_REGISTRATION_ACTION_TYPES = {
  UPDATE_FORM_SECTION: "PATIENT_REGISTRATION/UPDATE_FORM_SECTION",
  SET_FORM_DATA: "PATIENT_REGISTRATION/SET_FORM_DATA",
  SET_CURRENT_STEP: "PATIENT_REGISTRATION/SET_CURRENT_STEP",
  GO_TO_NEXT_STEP: "PATIENT_REGISTRATION/GO_TO_NEXT_STEP",
  GO_TO_PREVIOUS_STEP: "PATIENT_REGISTRATION/GO_TO_PREVIOUS_STEP",
  OPEN_NOTIFICATION: "PATIENT_REGISTRATION/OPEN_NOTIFICATION",
  CLOSE_NOTIFICATION: "PATIENT_REGISTRATION/CLOSE_NOTIFICATION",
  RESET_REGISTRATION: "PATIENT_REGISTRATION/RESET_REGISTRATION",
};

export const updatePatientRegistrationFormSection = (section, sectionData) => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.UPDATE_FORM_SECTION,
  payload: {
    section,
    sectionData,
  },
});

export const setPatientRegistrationFormData = (formData) => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.SET_FORM_DATA,
  payload: formData,
});

export const setPatientRegistrationCurrentStep = (stepIndex) => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.SET_CURRENT_STEP,
  payload: stepIndex,
});

export const goToNextPatientRegistrationStep = () => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.GO_TO_NEXT_STEP,
});

export const goToPreviousPatientRegistrationStep = () => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.GO_TO_PREVIOUS_STEP,
});

export const openPatientRegistrationNotification = () => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.OPEN_NOTIFICATION,
});

export const closePatientRegistrationNotification = () => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.CLOSE_NOTIFICATION,
});

export const resetPatientRegistration = () => ({
  type: PATIENT_REGISTRATION_ACTION_TYPES.RESET_REGISTRATION,
});