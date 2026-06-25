import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import AdditionalInformation from "./components/AdditionalInformation/AdditionalInformation";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";

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
    description: "Review all information before completing registration.",
  },
};

const PatientRegistration = () => {
  const [activeStep, setActiveStep] = useState("personal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const renderPage = () => {
    switch (activeStep) {
      case "personal":
        return <PersonalInformation />;

      case "additional":
        return <AdditionalInformation />;

      case "medical":
        return <div>Medical History Page</div>;

      case "insurance":
        return <div>Insurance Information Page</div>;

      case "records":
        return <div>Health Records Page</div>;

      case "review":
        return <div>Review & Complete Page</div>;

      default:
        return <PersonalInformation />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white md:bg-[#F9FAFB]">
      <Sidebar
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col bg-white">
        <div className="flex h-[86px] items-center justify-between border-b border-[#E5E7EB] bg-white px-7 md:hidden">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open registration menu"
              className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#DDE5EF] text-[#2E6B5F]"
            >
              <Menu size={25} strokeWidth={1.8} />
            </button>

            <span className="text-[22px] font-semibold leading-none text-[#0D4B43]">
              MediConnect
            </span>
          </div>

          <div className="flex w-28 flex-col items-end gap-2">
            <span className="text-[14px] font-semibold leading-none text-[#667085]">
              10% Done
            </span>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
              <div className="h-full w-[10%] rounded-full bg-[#2E6B5F]" />
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
