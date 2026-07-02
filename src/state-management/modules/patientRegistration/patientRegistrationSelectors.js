// ── Base Selector ─────────────────────────────────────────────────────────────
const selectRoot = (state) => state.patientRegistration;

// ── Step data selectors ───────────────────────────────────────────────────────
export const selectActiveStep = (state) => selectRoot(state).activeStep;
export const selectPersonalInfo = (state) => selectRoot(state).personalInformation;
export const selectAdditionalInfo = (state) => selectRoot(state).additionalInformation;
export const selectMedicalHistory = (state) => selectRoot(state).medicalHistory;
export const selectInsuranceInfo = (state) => selectRoot(state).insuranceInformation;
export const selectHealthRecords = (state) => selectRoot(state).healthRecords;
export const selectReviewComplete = (state) => selectRoot(state).reviewComplete;

// ── Step completion booleans ──────────────────────────────────────────────────
export const selectIsPersonalDone = (state) => !!selectPersonalInfo(state);
export const selectIsAdditionalDone = (state) => !!selectAdditionalInfo(state);
export const selectIsMedicalDone = (state) => !!selectMedicalHistory(state);
export const selectIsInsuranceDone = (state) => !!selectInsuranceInfo(state);
export const selectIsHealthRecordsDone = (state) => !!selectHealthRecords(state);
export const selectIsReviewDone = (state) => !!selectReviewComplete(state);

// ── Progress percentage ───────────────────────────────────────────────────────
/**
 * Computes the registration completion percentage (10% base + up to 90% across steps).
 * Used by Sidebar, PatientRegistration header, and any progress indicators.
 *
 * Breakdown:
 *   Base               10%
 *   Personal Info   +  20%
 *   Additional Info +  10%
 *   Medical History +  20%
 *   Insurance Info  +  10%
 *   Health Records  +  15%
 *   Review & Done   +  15%
 *   ─────────────────────
 *   Total             100%
 */
export const selectProgress = (state) => {
  const reg = selectRoot(state);
  let progress = 10;

  const personal = reg.personalInformation;
  if (
    personal?.fullName?.trim() &&
    personal?.dob &&
    personal?.gender &&
    personal?.bloodGroup &&
    personal?.state &&
    personal?.city
  ) {
    progress += 20;
  }

  if (
    reg.additionalInformation &&
    Object.values(reg.additionalInformation).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 10;
  }

  if (
    reg.medicalHistory &&
    Object.values(reg.medicalHistory).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 20;
  }

  if (
    reg.insuranceInformation &&
    Object.values(reg.insuranceInformation).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 10;
  }

  if (
    reg.healthRecords &&
    Object.values(reg.healthRecords).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 15;
  }

  if (
    reg.reviewComplete &&
    Object.values(reg.reviewComplete).every(
      (v) => v !== "" && v !== null && v !== undefined,
    )
  ) {
    progress += 15;
  }

  return progress;
};
const selectRoot = (state) => state.patientRegistration;

const hasValue = (value) => {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(hasValue);
  }

  return value !== null && value !== undefined && value !== false;
};

const isPersonalComplete = (personal) =>
  !!(
    personal?.fullName?.trim() &&
    personal?.dob &&
    personal?.gender &&
    personal?.bloodGroup &&
    personal?.state &&
    personal?.city
  );

const isAdditionalComplete = (additional) =>
  !!(
    additional?.emergencyRelationship?.trim() &&
    additional?.emergencyContact?.trim()
  );

const isMedicalComplete = (medical) => {
  if (!medical) return false;

  return (
    hasValue(medical.allergies) ||
    hasValue(medical.allergyTags) ||
    hasValue(medical.currentMedications) ||
    hasValue(medical.existingConditions) ||
    hasValue(medical.conditionTags) ||
    hasValue(medical.previousSurgeries)
  );
};

const isInsuranceComplete = (insurance) => {
  if (!insurance) return false;

  return (
    hasValue(insurance.insuranceType) ||
    hasValue(insurance.policyNumber) ||
    hasValue(insurance.insuranceCards) ||
    hasValue(insurance.insuranceCard)
  );
};

const isHealthRecordsComplete = (records) => {
  if (!Array.isArray(records)) return false;
  return records.length > 0;
};

const isReviewComplete = (review) => hasValue(review);

// ── Base Selectors ────────────────────────────────────────────────────────────
export const selectActiveStep = (state) => selectRoot(state).activeStep;
export const selectPersonalInfo = (state) => selectRoot(state).personalInformation;
export const selectAdditionalInfo = (state) => selectRoot(state).additionalInformation;
export const selectMedicalHistory = (state) => selectRoot(state).medicalHistory;
export const selectInsuranceInfo = (state) => selectRoot(state).insuranceInformation;
export const selectHealthRecords = (state) => selectRoot(state).healthRecords;
export const selectReviewComplete = (state) => selectRoot(state).reviewComplete;

// ── Completion Selectors ──────────────────────────────────────────────────────
export const selectIsPersonalDone = (state) =>
  isPersonalComplete(selectPersonalInfo(state));

export const selectIsAdditionalDone = (state) =>
  isAdditionalComplete(selectAdditionalInfo(state));

export const selectIsMedicalDone = (state) =>
  isMedicalComplete(selectMedicalHistory(state));

export const selectIsInsuranceDone = (state) =>
  isInsuranceComplete(selectInsuranceInfo(state));

export const selectIsHealthRecordsDone = (state) =>
  isHealthRecordsComplete(selectHealthRecords(state));

export const selectIsReviewDone = (state) =>
  isReviewComplete(selectReviewComplete(state));

// ── Progress Selector ─────────────────────────────────────────────────────────
export const selectProgress = (state) => {
  const reg = selectRoot(state);

  let progress = 0;

  if (isPersonalComplete(reg.personalInformation)) {
    progress += 25;
  }

  if (isAdditionalComplete(reg.additionalInformation)) {
    progress += 15;
  }

  if (isMedicalComplete(reg.medicalHistory)) {
    progress += 20;
  }

  if (isInsuranceComplete(reg.insuranceInformation)) {
    progress += 15;
  }

  if (isHealthRecordsComplete(reg.healthRecords)) {
    progress += 15;
  }

  if (isReviewComplete(reg.reviewComplete)) {
    progress += 10;
  }

  return progress;
};