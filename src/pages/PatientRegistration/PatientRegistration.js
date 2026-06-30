import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import RegistrationShell from "./components/layout/RegistrationShell";
import { STEP_INDEXES } from "./data/registrationSteps";
import usePatientRegistration from "./hooks/usePatientRegistration";
import "./PatientRegistration.css";
import HealthRecordsUpload from "./screens/HealthRecordsUpload";
import InsuranceDetails from "./screens/InsuranceDetails";
import MedicalHistory from "./screens/MedicalHistory";

const PatientRegistration = () => {
  const {
    currentStep,
    formData,
    notificationOpen,
    updateFormSection,
    setFormData,
    goToNextStep,
    goToPreviousStep,
    closeNotification,
  } = usePatientRegistration();

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case STEP_INDEXES.MEDICAL_HISTORY:
        return (
          <MedicalHistory
            data={formData.medicalHistory}
            updateData={(updatedData) =>
              updateFormSection("medicalHistory", updatedData)
            }
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            onSkip={goToNextStep}
          />
        );

      case STEP_INDEXES.INSURANCE_INFORMATION:
        return (
          <InsuranceDetails
            data={formData.insurance}
            updateData={(updatedData) =>
              updateFormSection("insurance", updatedData)
            }
            onNext={goToNextStep}
            onBack={goToPreviousStep}
            onSkip={goToNextStep}
          />
        );

      case STEP_INDEXES.HEALTH_RECORDS:
        return (
          <HealthRecordsUpload
            records={formData.healthRecords}
            setFormData={setFormData}
            onBack={goToPreviousStep}
            onSubmit={goToNextStep}
            onSkip={goToNextStep}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <RegistrationShell currentStep={currentStep}>
        {renderCurrentScreen()}
      </RegistrationShell>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={closeNotification}>
          Patient registration details saved successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PatientRegistration;