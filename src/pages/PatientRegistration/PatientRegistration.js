import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import RegistrationShell from "./components/layout/RegistrationShell";
import { STEP_INDEXES } from "./data/registrationSteps";
import usePatientRegistration from "./hooks/usePatientRegistration";
import HealthRecordsUpload from "./screens/HealthRecordsUpload";
import InsuranceDetails from "./screens/InsuranceDetails";
import MedicalHistory from "./screens/MedicalHistory";

const PatientRegistration = () => {
  const {
    currentStep,
    formData,
    setFormData,
    updateFormSection,
    goNext,
    goBack,
    skipStep,
    notificationOpen,
    setNotificationOpen,
  } = usePatientRegistration();

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case STEP_INDEXES.MEDICAL_HISTORY:
        return (
          <MedicalHistory
            data={formData.medicalHistory}
            updateData={(data) => updateFormSection("medicalHistory", data)}
            onNext={goNext}
            onBack={goBack}
            onSkip={skipStep}
          />
        );

      case STEP_INDEXES.INSURANCE_INFORMATION:
        return (
          <InsuranceDetails
            data={formData.insurance}
            updateData={(data) => updateFormSection("insurance", data)}
            onNext={goNext}
            onBack={goBack}
            onSkip={skipStep}
          />
        );

      case STEP_INDEXES.HEALTH_RECORDS:
        return (
          <HealthRecordsUpload
            data={formData.healthRecords}
            setFormData={setFormData}
            onBack={goBack}
            onSubmit={goNext}
            onSkip={skipStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <RegistrationShell currentStep={currentStep}>{renderCurrentScreen()}</RegistrationShell>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setNotificationOpen(false)}>
          Patient registration details saved successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PatientRegistration;
