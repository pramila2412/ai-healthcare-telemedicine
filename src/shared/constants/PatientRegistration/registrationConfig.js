export const registrationConfig = {
  // Review screen is owned by another teammate, but we keep the step visible
  // to match the Figma stepper.
  showReviewStepInSidebar: true,

  // Mobile/sidebar compact mode is enabled when the viewport is reduced.
  enableMobileStepToggle: true,

  // Future options: "compact-grid", "horizontal-scroll".
  mobileStepperVariant: "compact-grid",
};
export const insuranceProviders = registrationConfig.insuranceProviders;
export const documentTypes = registrationConfig.documentTypes;
export const healthRecordTypes = registrationConfig.healthRecordTypes;