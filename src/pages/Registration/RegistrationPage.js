import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Footer from "@/shared/components/Registration/layout/Footer";
import Header from "@/shared/components/Registration/layout/Header";
import Sidebar from "@/shared/components/Registration/layout/Sidebar";
import UploadSuccessSnackbar from "@/shared/components/Registration/upload/UploadSuccessSnackbar";
import sidebarByRole, { getStepComponent } from "@/shared/constants/RoleRegistration";

import {
  markSectionComplete,
  saveSectionData,
  setActiveSection,
} from "@/state-management/modules/Registrations/SidebarRegistration/registrationActions";
import {
  authSelectors,
  sideBarRegistrationSelectors,
} from "@/state-management/modules/rootSelectors";
import { isInsuranceInformationComplete } from "@/shared/constants/RoleRegistration/medicalRecords";

const findActiveSection = (sections, activeKey) => {
  for (const section of sections) {
    if (section.key === activeKey) return section;
    if (section.children?.some((c) => c.key === activeKey)) {
      return section.children.find((c) => c.key === activeKey);
    }
  }
  return null;
};

const getOrderedSteps = (sections = []) =>
  sections.flatMap((section) =>
    section.children?.length ? section.children : [section],
  );

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMedicalUploadSuccessOpen, setIsMedicalUploadSuccessOpen] =
    useState(false);

  const role = useSelector(authSelectors.getUserRole);
  const activeSectionKey = useSelector(sideBarRegistrationSelectors.getActiveSectionKey);
  const sectionData = useSelector(sideBarRegistrationSelectors.getSectionData); // { [stepKey]: data }

  if (!role) return <Navigate to="/signup" />;

  const sidebar = sidebarByRole[role] || [];
  const activeSection = findActiveSection(sidebar, activeSectionKey);

  // Look up the child form component for this role + active step key
  const StepComponent = getStepComponent(role, activeSectionKey);

  const handleSectionSelect = (key) => {
    dispatch(setActiveSection(key));
  };

  const moveToNextSection = () => {
    const orderedSteps = getOrderedSteps(sidebar);
    const activeIndex = orderedSteps.findIndex(
      (section) => section.key === activeSectionKey,
    );
    const nextSection = orderedSteps[activeIndex + 1];

    if (nextSection) dispatch(setActiveSection(nextSection.key));
  };

  const handleContinue = () => {
    if (
      activeSectionKey === "medical" &&
      activeSectionData.supportingRecords?.length > 0
    ) {
      setIsMedicalUploadSuccessOpen(true);
    }
    dispatch(markSectionComplete(activeSectionKey));
    moveToNextSection();
  };

  const isContinueDisabled =
    activeSectionKey === "insurance" &&
    !isInsuranceInformationComplete(activeSectionData);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sections={sidebar}
        activeKey={activeSectionKey}
        onSelect={handleSectionSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header
          sections={sidebar}
          activeKey={activeSectionKey}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6">
          {StepComponent ? (
            <StepComponent
              data={activeSectionData}
              stepConfig={activeSection}
              onChange={(data) =>
                dispatch(saveSectionData(activeSectionKey, data))
              }
            />
          ) : (
            <p className="text-sm text-slate-400">
              No form defined for this step yet.
            </p>
          )}
        </div>

        <div className="shrink-0">
          <Footer
            onSkip={moveToNextSection}
            onContinue={handleContinue}
            showSkip={activeSection?.showSkip ?? true}
            continueLabel={activeSection?.continueLabel ?? "Save & Continue"}
            isContinueDisabled={isContinueDisabled}
          />
        </div>

        <UploadSuccessSnackbar
          open={isMedicalUploadSuccessOpen}
          onClose={() => setIsMedicalUploadSuccessOpen(false)}
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
