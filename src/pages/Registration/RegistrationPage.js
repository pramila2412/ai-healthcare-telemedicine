import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Footer from "@/shared/components/Registration/layout/Footer";
import Header from "@/shared/components/Registration/layout/Header";
import Sidebar from "@/shared/components/Registration/layout/Sidebar";
import MedicalRecordsIntroPopup from "@/shared/components/Popup/MedicalRecordsIntroPopup";
import UploadSuccessSnackbar from "@/shared/components/Registration/upload/UploadSuccessSnackbar";
import sidebarByRole, { getStepComponent } from "@/shared/constants/RoleRegistration";
import SecureAccountModal from "@/shared/components/Registration/layout/SecureAccountModal";
import SuccessModal from "@/shared/components/Registration/layout/SuccessModal";
import {
  markSectionComplete,
  saveSectionData,
  setActiveSection,
} from "@/state-management/modules/Registrations/SidebarRegistration/registrationActions";
import { 
  setPersonalInfo, 
  setMedicalHistory, 
  setInsuranceInfo, 
  setHealthRecords 
} from "@/state-management/modules/Registrations/patientRegistration/patientRegistrationActions";
import {
  authSelectors,
  sideBarRegistrationSelectors,
} from "@/state-management/modules/rootSelectors";
import {
  hasValidationErrors,
  validateRegistrationStep,
} from "@/shared/utils/registrationValidation";

const MEDICAL_RECORDS_INTRO_STORAGE_KEY =
  "mediconnect.hideMedicalRecordsIntro";
const PERSONAL_INFORMATION_STEP_KEYS = new Set([
  "basic",
  "contact",
  "health",
]);
const MEDICAL_RECORDS_STEP_KEYS = new Set(["medical", "insurance"]);

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
  const [isSecureModalOpen, setIsSecureModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isMedicalRecordsIntroOpen, setIsMedicalRecordsIntroOpen] =
    useState(false);
  const [
    dontShowMedicalRecordsIntroAgain,
    setDontShowMedicalRecordsIntroAgain,
  ] = useState(false);
  const [validationErrorsByStep, setValidationErrorsByStep] = useState({});
  const [touchedFieldsByStep, setTouchedFieldsByStep] = useState({});

  const role = useSelector(authSelectors.getUserRole);
  const activeSectionKey = useSelector(sideBarRegistrationSelectors.getActiveSectionKey);
  const activeSectionData = useSelector((state) =>
  sideBarRegistrationSelectors.getSectionData(state, activeSectionKey)
);
  const completedSectionKeys =
    useSelector(sideBarRegistrationSelectors.getCompletedSections) || [];

  if (!role) return <Navigate to="/signup" />;

  const sidebar = sidebarByRole[role] || [];
  const activeSection = findActiveSection(sidebar, activeSectionKey);

  // Look up the child form component for this role + active step key
  const StepComponent = getStepComponent(role, activeSectionKey);

  const isMedicalRecordsIntroSuppressed = () => {
    try {
      return (
        window.localStorage.getItem(MEDICAL_RECORDS_INTRO_STORAGE_KEY) ===
        "true"
      );
    } catch {
      return false;
    }
  };

  const navigateToSection = (key) => {
    const isEnteringMedicalRecords =
      PERSONAL_INFORMATION_STEP_KEYS.has(activeSectionKey) &&
      MEDICAL_RECORDS_STEP_KEYS.has(key);

    dispatch(setActiveSection(key));

    if (
      isEnteringMedicalRecords &&
      !isMedicalRecordsIntroSuppressed()
    ) {
      setDontShowMedicalRecordsIntroAgain(false);
      setIsMedicalRecordsIntroOpen(true);
    }
  };

  const handleSectionSelect = (key) => {
    navigateToSection(key);
  };

  const moveToNextSection = () => {
    const orderedSteps = getOrderedSteps(sidebar);
    const activeIndex = orderedSteps.findIndex(
      (section) => section.key === activeSectionKey,
    );
    const nextSection = orderedSteps[activeIndex + 1];

    if (nextSection) navigateToSection(nextSection.key);
  };

  const saveMedicalRecordsIntroPreference = () => {
    if (!dontShowMedicalRecordsIntroAgain) return;

    try {
      window.localStorage.setItem(
        MEDICAL_RECORDS_INTRO_STORAGE_KEY,
        "true",
      );
    } catch {
      // The preference is non-critical; continue when storage is unavailable.
    }
  };

  const handleMedicalRecordsIntroContinue = () => {
    saveMedicalRecordsIntroPreference();
    setIsMedicalRecordsIntroOpen(false);
  };

  const handleMedicalRecordsIntroSkip = () => {
    saveMedicalRecordsIntroPreference();
    setIsMedicalRecordsIntroOpen(false);
    dispatch(setActiveSection("information"));
  };

  const handleFieldBlur = (fieldName) => {
    const stepErrors = validateRegistrationStep(
      activeSectionKey,
      activeSectionData,
    );

    setTouchedFieldsByStep((currentTouchedFields) => ({
      ...currentTouchedFields,
      [activeSectionKey]: {
        ...currentTouchedFields[activeSectionKey],
        [fieldName]: true,
      },
    }));
    setValidationErrorsByStep((currentErrors) => ({
      ...currentErrors,
      [activeSectionKey]: stepErrors,
    }));
  };

  const handleStepDataChange = (data) => {
    dispatch(saveSectionData(activeSectionKey, data));

    if (activeSectionKey === "basic") {
      dispatch(setPersonalInfo({ basicDetails: data }));
    }
    if (activeSectionKey === "contact") {
      dispatch(setPersonalInfo({ contactLocation: data }));
    }
    if (activeSectionKey === "health") dispatch(setHealthRecords(data));
    if (activeSectionKey === "medical") dispatch(setMedicalHistory(data));
    if (activeSectionKey === "insurance") dispatch(setInsuranceInfo(data));

    const touchedFields = touchedFieldsByStep[activeSectionKey] || {};
    if (Object.keys(touchedFields).length > 0) {
      setValidationErrorsByStep((currentErrors) => ({
        ...currentErrors,
        [activeSectionKey]: validateRegistrationStep(activeSectionKey, data),
      }));
    }
  };

  const handleContinue = () => {
    const stepErrors = validateRegistrationStep(
      activeSectionKey,
      activeSectionData,
    );

    if (hasValidationErrors(stepErrors)) {
      const invalidFields = Object.keys(stepErrors);
      setValidationErrorsByStep((currentErrors) => ({
        ...currentErrors,
        [activeSectionKey]: stepErrors,
      }));
      setTouchedFieldsByStep((currentTouchedFields) => ({
        ...currentTouchedFields,
        [activeSectionKey]: invalidFields.reduce(
          (touchedFields, fieldName) => ({
            ...touchedFields,
            [fieldName]: true,
          }),
          currentTouchedFields[activeSectionKey] || {},
        ),
      }));

      requestAnimationFrame(() => {
        const firstInvalidField = document.querySelector(
          `[name="${invalidFields[0]}"], [data-validation-field="${invalidFields[0]}"]`,
        );
        firstInvalidField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        firstInvalidField?.focus();
      });
      return;
    }

    setValidationErrorsByStep((currentErrors) => ({
      ...currentErrors,
      [activeSectionKey]: {},
    }));

    if (activeSectionKey === "loginid") {
      setIsSecureModalOpen(true);
      return;
    }
    if (
      activeSectionKey === "medical" &&
      activeSectionData?.supportingRecords?.length > 0
    ) {
      setIsMedicalUploadSuccessOpen(true);
    }
    dispatch(markSectionComplete(activeSectionKey));
    moveToNextSection();
  };

  const handleSecureModalComplete = () => {
    setIsSecureModalOpen(false);
    dispatch(markSectionComplete(activeSectionKey));
    if (activeSectionKey === "loginid") {
      setIsSuccessModalOpen(true);
    } else {
      moveToNextSection();
    }
  };

  const isContinueDisabled =
    (activeSectionKey === "insurance" && !activeSectionData?.insuranceType) ||
    (activeSectionKey === "information" && !activeSectionData?.isConfirmed) ||
    (activeSectionKey === "loginid" && !activeSectionData?.isValid);

  const activeStepErrors = validationErrorsByStep[activeSectionKey] || {};
  const activeStepTouchedFields =
    touchedFieldsByStep[activeSectionKey] || {};

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sections={sidebar}
        activeKey={activeSectionKey}
        completedKeys={completedSectionKeys}
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

          <div id="step-scroll-container" className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6">
          {StepComponent ? (
            <StepComponent
              data={activeSectionData}
              stepConfig={activeSection}
              onChange={handleStepDataChange}
              errors={activeStepErrors}
              touched={activeStepTouchedFields}
              onFieldBlur={handleFieldBlur}
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

      <SecureAccountModal
        isOpen={isSecureModalOpen}
        onClose={() => setIsSecureModalOpen(false)}
        onComplete={handleSecureModalComplete}
      />
      <MedicalRecordsIntroPopup
        open={isMedicalRecordsIntroOpen}
        dontShowAgain={dontShowMedicalRecordsIntroAgain}
        onDontShowAgainChange={setDontShowMedicalRecordsIntroAgain}
        onSkip={handleMedicalRecordsIntroSkip}
        onContinue={handleMedicalRecordsIntroContinue}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default RegistrationPage;