import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RegistrationShell from "@/shared/components/PatientRegistration/layout/RegistrationShell";
import { getStepMeta } from "@/shared/constants/PatientRegistration/registrationSteps";

import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import AdditionalInformation from "./components/AdditionalInformation/AdditionalInformation";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import InsuranceInformation from "./components/InsuranceInformation/InsuranceInformation";
import HealthRecord from "./components/HealthRecord/HealthRecord";
import ReviewAndComplete from "./components/ReviewAndComplete/ReviewAndComplete";

import {
  setActiveStep,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import {
  selectActiveStep,
  selectProgress,
} from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import "./PatientRegistration.css";


const PatientRegistration = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectActiveStep);
  const progress = useSelector(selectProgress);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  // Close drawer whenever the active step changes (user tapped a step in drawer)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeStep]);

  const handleSetActiveStep = (step) => dispatch(setActiveStep(step));

  const renderStep = () => {
    switch (activeStep) {
      case "personal":   return <PersonalInformation />;
      case "additional": return <AdditionalInformation />;
      case "medical":    return <MedicalHistory setActiveStep={handleSetActiveStep} />;
      case "insurance":  return <InsuranceInformation setActiveStep={handleSetActiveStep} />;
      case "records":    return <HealthRecord setActiveStep={handleSetActiveStep} />;
      case "review":     return <ReviewAndComplete setActiveStep={handleSetActiveStep} />;
      default:           return <PersonalInformation />;
    }
  };

  const { title, description } = getStepMeta(activeStep);

  return (
    <RegistrationShell
      activeStep={activeStep}
      setActiveStep={handleSetActiveStep}
      isSidebarOpen={isSidebarOpen}
      onOpenSidebar={() => setIsSidebarOpen(true)}
      onCloseSidebar={() => setIsSidebarOpen(false)}
      progress={progress}
      title={title}
      description={description}
    >
      {renderStep()}
    </RegistrationShell>
  );
};

export default PatientRegistration;
