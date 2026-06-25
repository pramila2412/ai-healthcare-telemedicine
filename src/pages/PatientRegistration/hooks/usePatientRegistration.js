import { useState } from "react";
import { STEP_INDEXES } from "../data/registrationSteps";

const initialFormData = {
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
};

const scrollToTop = () => {
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

const usePatientRegistration = () => {
  const [currentStep, setCurrentStep] = useState(STEP_INDEXES.MEDICAL_HISTORY);
  const [formData, setFormData] = useState(initialFormData);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const updateFormSection = (section, sectionData) => {
    setFormData((previousData) => ({
      ...previousData,
      [section]: {
        ...previousData[section],
        ...sectionData,
      },
    }));
  };

  const goNext = () => {
    if (currentStep < STEP_INDEXES.HEALTH_RECORDS) {
      setCurrentStep((previousStep) => previousStep + 1);
      scrollToTop();
      return;
    }

    // TODO: Replace this with API integration once backend endpoint is available.
    setNotificationOpen(true);
  };

  const goBack = () => {
    if (currentStep > STEP_INDEXES.MEDICAL_HISTORY) {
      setCurrentStep((previousStep) => previousStep - 1);
      scrollToTop();
      return;
    }

    window.history.back();
  };

  return {
    currentStep,
    formData,
    setFormData,
    updateFormSection,
    goNext,
    goBack,
    skipStep: goNext,
    notificationOpen,
    setNotificationOpen,
  };
};

export default usePatientRegistration;
