export const selectPatientRegistrationState = (state) => state;

export const selectCurrentStep = (state) => state.currentStep;

export const selectFormData = (state) => state.formData;

export const selectMedicalHistory = (state) => state.formData.medicalHistory;

export const selectInsurance = (state) => state.formData.insurance;

export const selectHealthRecords = (state) => state.formData.healthRecords;

export const selectNotificationOpen = (state) => state.notificationOpen;