import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useReducer } from "react";
import RegistrationShell from "../../shared/components/PatientRegistration/layout/RegistrationShell";
import { STEP_INDEXES } from "../../shared/constants/PatientRegistration/registrationSteps";
import {
  closePatientRegistrationNotification,
  goToNextPatientRegistrationStep,
  goToPreviousPatientRegistrationStep,
  setPatientRegistrationCurrentStep,
  setPatientRegistrationFormData,
  updatePatientRegistrationFormSection,
} from "../../state-management/modules/patientRegistration/patientRegistrationActions";
import patientRegistrationReducer, {
  initialPatientRegistrationState,
} from "../../state-management/modules/patientRegistration/patientRegistrationReducer";
import {
  selectCurrentStep,
  selectFormData,
  selectNotificationOpen,
} from "../../state-management/modules/patientRegistration/patientRegistrationSelectors";
import HealthRecordsUpload from "./components/HealthRecordsUpload/HealthRecordsUpload";
import InsuranceDetails from "./components/InsuranceDetails/InsuranceDetails";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import "./PatientRegistration.css";

const navigablePatientRegistrationSteps = [
  STEP_INDEXES.MEDICAL_HISTORY,
  STEP_INDEXES.INSURANCE_INFORMATION,
  STEP_INDEXES.HEALTH_RECORDS,
];

const PatientRegistration = () => {
  const [patientRegistrationState, dispatch] = useReducer(
    patientRegistrationReducer,
    initialPatientRegistrationState
  );

  const currentStep = selectCurrentStep(patientRegistrationState);
  const formData = selectFormData(patientRegistrationState);
  const notificationOpen = selectNotificationOpen(patientRegistrationState);

  const scrollToPageTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateFormSection = (section, updatedData) => {
    dispatch(updatePatientRegistrationFormSection(section, updatedData));
  };

  const setFormData = (updatedFormData) => {
    dispatch(setPatientRegistrationFormData(updatedFormData));
  };

  const goToNextStep = () => {
    dispatch(goToNextPatientRegistrationStep());
    scrollToPageTop();
  };

  const goToPreviousStep = () => {
    if (currentStep > STEP_INDEXES.MEDICAL_HISTORY) {
      dispatch(goToPreviousPatientRegistrationStep());
      scrollToPageTop();
      return;
    }

    window.history.back();
  };

  const goToSelectedStep = (stepIndex) => {
    if (!navigablePatientRegistrationSteps.includes(stepIndex)) {
      return;
    }

    dispatch(setPatientRegistrationCurrentStep(stepIndex));
    scrollToPageTop();
  };

  const closeNotification = () => {
    dispatch(closePatientRegistrationNotification());
  };

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
      <RegistrationShell
        currentStep={currentStep}
        onStepChange={goToSelectedStep}
      >
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