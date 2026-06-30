import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "lucide-react";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import AdditionalInformation from "./components/AdditionalInformation/AdditionalInformation";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import InsuranceInformation from "./components/InsuranceInformation/InsuranceInformation";
import HealthRecords from "./components/HealthRecord/HealthRecord";
import ReviewAndComplete from "./components/ReviewAndComplete/ReviewAndComplete";

import {
  setActiveStep,
} from "../../state-management/modules/patientRegistration/patientRegistrationActions";
import {
  selectActiveStep,
  selectProgress,
} from "../../state-management/modules/patientRegistration/patientRegistrationSelectors";



const stepConfig = {
  personal: {
    title: "Personal Information",
    description:
      "Add your basic information to complete your profile and personalize your healthcare journey.",
  },
  additional: {
    title: "Additional Information",
    description:
      "Enhance your profile with optional details for a more personalized healthcare journey.",
  },
  medical: {
    title: "Medical History",
    description: "Provide your previous medical history and conditions.",
  },
  insurance: {
    title: "Insurance Information",
    description: "Add your insurance information for seamless healthcare access.",
  },
  records: {
    title: "Health Records",
    description: "Upload and manage your health records.",
  },
  review: {
    title: "Review & Complete",
    description:
      "Configure your login credentials to securely manage your healthcare information.",
  },
};

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

  const renderPage = () => {
    switch (activeStep) {
      case "personal":   return <PersonalInformation />;
      case "additional": return <AdditionalInformation />;
      case "medical":    return <MedicalHistory setActiveStep={handleSetActiveStep} />;
      case "insurance":  return <InsuranceInformation setActiveStep={handleSetActiveStep} />;
      case "records":    return <HealthRecords setActiveStep={handleSetActiveStep} />;
      case "review":     return <ReviewAndComplete setActiveStep={handleSetActiveStep} />;
      default:           return <PersonalInformation />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white md:bg-[#F9FAFB]">
      <Sidebar
        activeStep={activeStep}
        setActiveStep={handleSetActiveStep}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        progress={progress}
      />

      <div className="flex-1 flex flex-col bg-white pt-16 md:pt-0">
        {/* Mobile header bar */}
        <div className="fixed top-0 left-0 right-0 z-45 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-7 md:hidden">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open registration menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE5EF] text-[#2E6B5F] cursor-pointer"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
            <span className="text-[20px] font-semibold leading-none text-[#0D4B43]">
              MediConnect
            </span>
          </div>

          <div className="flex w-24 flex-col items-end gap-1.5">
            <span className="text-[12px] font-semibold leading-none text-[#667085]">
              {progress}% Done
            </span>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
              <div
                className="h-full rounded-full bg-[#2E6B5F] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <Header
          title={stepConfig[activeStep].title}
          description={stepConfig[activeStep].description}
        />

        <main>{renderPage()}</main>
      </div>
    </div>
  );
};

export default PatientRegistration;
