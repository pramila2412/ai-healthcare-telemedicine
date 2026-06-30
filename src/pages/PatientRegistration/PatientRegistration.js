import RegistrationShell from "../../shared/components/PatientRegistration/layout/RegistrationShell";
import { STEP_INDEXES } from "../../shared/constants/PatientRegistration/registrationSteps";
import HealthRecordsUpload from "./components/HealthRecordsUpload/HealthRecordsUpload";
import InsuranceDetails from "./components/InsuranceDetails/InsuranceDetails";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";

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