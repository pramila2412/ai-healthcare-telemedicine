import React from "react";
import { X } from "lucide-react";

import logo from "@assets/assets/logo.svg";
import tick from "@assets/patientRegistration/tick.svg";

import { REGISTRATION_STEPS } from "@/shared/constants/PatientRegistration/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

/**
 * RegistrationSidebar — step navigation rail (desktop) + drawer (mobile).
 *
 * Props:
 *   activeStep    {string}
 *   setActiveStep {fn}      — (stepKey) => void
 *   isOpen        {boolean} — mobile drawer open state
 *   onClose       {fn}      — closes the mobile drawer
 *   progress      {number}  — completion percentage, from selectProgress
 */
const RegistrationSidebar = ({ activeStep, setActiveStep, isOpen, onClose, progress }) => {
  // Re-reads localStorage whenever activeStep changes, same as the original.
  const patientInfo =
    JSON.parse(localStorage.getItem("patientInformation")) || {};

  const isStepCompleted = (key) => {
    switch (key) {
      case "personal":
        return !!patientInfo.personalInformation;
      case "additional":
        return !!patientInfo.additionalInformation;
      case "medical":
        return !!patientInfo.medicalHistory;
      case "insurance":
        return !!patientInfo.insuranceInformation;
      case "records":
        return !!patientInfo.healthRecords;
      default:
        return false;
    }
  };

  // Resolves which icon to show for a step. Equivalent to the original's
  // special-cased "review" logic, just data-driven via `unlockedIcon`
  // (only the "review" step defines one): once "personal" is complete the
  // colored variant is shown instead of the default greyed-out icon.
  const resolveIcon = (step, isActive) => {
    if (isActive) return step.activeIcon;
    if (isStepCompleted(step.key)) return tick;
    if (step.unlockedIcon && isStepCompleted("personal")) return step.unlockedIcon;
    return step.icon;
  };

  return (
    <>
      {/* Desktop Sidebar (unchanged layout) */}
      <div className="hidden md:block relative w-85.5 min-h-screen bg-[#FBFBFB] border-r border-[#E6E6E6]">
        {/* Logo */}
        <div className="absolute top-10 left-10 flex items-center gap-1">
          <img
            src={logo}
            alt="MediConnect"
            className="w-12 h-11 object-contain"
          />

          <div className="flex flex-col">
            <h1 className="text-[16px] font-semibold leading-none text-[#096B58]">
              MediConnect
            </h1>

            <p className="text-[10px] font-normal leading-2.5 text-primary">
              Healthcare Ecosystem
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="absolute top-39 left-10 w-65.5 min-h-122">
          {REGISTRATION_STEPS.map((step, index) => {
            const isActive = activeStep === step.key;

            return (
              <div key={step.key}>
                <div
                  onClick={() => setActiveStep(step.key)}
                  className="flex items-center cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg ${
                      isActive
                        ? "w-8 h-8 bg-[#096B58]  border-white border-[3px]"
                        : "w-8 h-8"
                    }`}
                  >
                    <img
                      src={resolveIcon(step, isActive)}
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <div
                    className={` flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg  px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[13px] font-semibold leading-none ${
                        isActive
                          ? "text-[#096B58]"
                          : step.key === "review" && !isStepCompleted("personal")
                            ? "text-[#AAAAAA]" // gray until personal done
                            : "text-[#202020]" // normal color once personal done
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {index !== REGISTRATION_STEPS.length - 1 && (
                  <div
                    className={`ml-3.5 h-9 w-0.5 ${
                      isStepCompleted(step.key) ? "bg-[#14B392]" : "bg-[#E6E6E6]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Card */}
        <ProfileProgressCard variant="desktop" progress={progress} />
      </div>

      {/* Mobile/Tablet Sidebar Drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-[320px] max-w-[85vw] flex-col justify-between bg-[#FBFBFB] border-r border-[#E6E6E6] p-6 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="MediConnect"
              className="w-12 h-11 object-contain"
            />
            <div className="flex flex-col">
              <h1 className="text-[16px] font-semibold leading-none text-[#096B58] font-TypeFace">
                MediConnect
              </h1>
              <p className="text-[10px] font-normal leading-2.5 text-primary font-TypeFace">
                Healthcare Ecosystem
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#2E6B5F] hover:bg-[#E5E7EB] cursor-pointer"
            aria-label="Close menu"
          >
            <span className="sr-only">Close menu</span>
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Steps navigation */}
        <div className="flex flex-col gap-0 mt-6 overflow-y-auto flex-1 pr-1 py-1">
          {REGISTRATION_STEPS.map((step, index) => {
            const isActive = activeStep === step.key;

            return (
              <div key={step.key} className="flex flex-col">
                <div
                  onClick={() => {
                    setActiveStep(step.key);
                    onClose();
                  }}
                  className="flex items-center cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center rounded-lg shrink-0 ${
                      isActive
                        ? "w-9.5 h-9.5 bg-[#096B58] border-white border-[3px]"
                        : "w-9.5 h-9.5"
                    }`}
                  >
                    <img
                      src={resolveIcon(step, isActive)}
                      alt={step.title}
                      className="w-6 h-6"
                    />
                  </div>

                  {/* Title */}
                  <div
                    className={`flex-1 ${
                      isActive
                        ? "-ml-1 bg-[#EEF4F3] rounded-lg px-3 py-1.5"
                        : "px-3 py-1.5"
                    }`}
                  >
                    <span
                      className={`text-[12.5px] font-semibold leading-none ${
                        isActive
                          ? "text-[#096B58]"
                          : step.key === "review" && !isStepCompleted("personal")
                            ? "text-[#AAAAAA]"
                            : "text-[#202020]"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                {/* Connecting Line */}
                {index !== REGISTRATION_STEPS.length - 1 && (
                  <div
                    className={`ml-4.5 h-5 w-0.5 my-1 ${
                      isStepCompleted(step.key) ? "bg-[#14B392]" : "bg-[#E6E6E6]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Card at bottom of drawer */}
        <ProfileProgressCard variant="mobile" progress={progress} />
      </div>
    </>
  );
};

export default RegistrationSidebar;
