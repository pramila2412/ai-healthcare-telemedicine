import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React, { useState } from "react";
import RegistrationSidebar from "./components/RegistrationSidebar";
import SupportLink from "./components/SupportLink";
import { STEP_INDEXES } from "./constants/registrationSteps";
import HealthRecordsUpload from "./screens/HealthRecordsUpload";
import InsuranceDetails from "./screens/InsuranceDetails";
import MedicalHistory from "./screens/MedicalHistory";

const PatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(
    STEP_INDEXES.MEDICAL_HISTORY
  );

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [formData, setFormData] = useState({
    medicalHistory: {
      allergies: "",
      currentMedications: "",
      existingConditions: "",
      previousSurgeries: "",
    },
    insurance: {
      provider: "",
      policyNumber: "",
      insuranceCard: null,
      confirmation: false,
    },
    healthRecords: [],
  });

  const updateFormSection = (section, sectionData) => {
    setFormData((previousData) => ({
      ...previousData,
      [section]: {
        ...previousData[section],
        ...sectionData,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < STEP_INDEXES.HEALTH_RECORDS) {
      setCurrentStep((previousStep) => previousStep + 1);
      return;
    }

    // This payload is ready for API integration once backend endpoint is available.
    console.log("Patient registration data:", formData);
    setNotificationOpen(true);
  };

  const handleBack = () => {
    if (currentStep > STEP_INDEXES.MEDICAL_HISTORY) {
      setCurrentStep((previousStep) => previousStep - 1);
      return;
    }

    window.history.back();
  };

  const handleSkip = () => {
    handleNext();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEP_INDEXES.MEDICAL_HISTORY:
        return (
          <MedicalHistory
            data={formData.medicalHistory}
            updateData={(data) => updateFormSection("medicalHistory", data)}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );

      case STEP_INDEXES.INSURANCE_INFORMATION:
        return (
          <InsuranceDetails
            data={formData.insurance}
            updateData={(data) => updateFormSection("insurance", data)}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        );

      case STEP_INDEXES.HEALTH_RECORDS:
        return (
          <HealthRecordsUpload
            data={formData.healthRecords}
            setFormData={setFormData}
            onBack={handleBack}
            onSubmit={handleNext}
            onSkip={handleSkip}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-slate-900 max-md:flex-col">
      <RegistrationSidebar currentStep={currentStep} />

      <main className="relative flex-1 px-11 py-8 max-lg:px-8 max-md:px-5 max-md:py-6">
        <SupportLink />
        {renderCurrentStep()}
      </main>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={3000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setNotificationOpen(false)}
        >
          Patient registration details saved successfully.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PatientRegistration;