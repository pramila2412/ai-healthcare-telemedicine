import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";
import {
  profileProgressByStep,
  registrationSteps,
} from "../../../constants/PatientRegistration/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

const RegistrationSidebar = ({ currentStep }) => {
  const [showMobileSteps, setShowMobileSteps] = useState(false);

  const progress = profileProgressByStep[currentStep] || 0;

  const currentStepDetails = registrationSteps.find(
    (step) => step.id === currentStep
  );

  const toggleMobileSteps = () => {
    setShowMobileSteps((previousValue) => !previousValue);
  };

  return (
    <aside className="pr-sidebar">
      <div className="pr-sidebar-header">
        <div className="pr-brand">
          <img
            src="/images/logo.png"
            alt="MediConnect logo"
            className="pr-brand-logo"
          />

          <div>
            <h3 className="pr-brand-title">MediConnect</h3>
            <p className="pr-brand-subtitle">AI Healthcare Platform</p>
          </div>
        </div>

        <button
          type="button"
          className="pr-mobile-toggle"
          onClick={toggleMobileSteps}
        >
          {showMobileSteps ? "Hide Steps" : "Show Steps"}

          {showMobileSteps ? (
            <KeyboardArrowUpIcon sx={{ fontSize: 17 }} />
          ) : (
            <KeyboardArrowDownIcon sx={{ fontSize: 17 }} />
          )}
        </button>
      </div>

      <div className="pr-mobile-summary">
        <span>Current Step</span>
        <strong>{currentStepDetails?.label || "Patient Registration"}</strong>
      </div>

      <div
        className={`pr-sidebar-body ${
          showMobileSteps ? "pr-sidebar-body-open" : ""
        }`}
      >
        <div className="pr-step-list">
          {registrationSteps.map((step) => {
            const StepIcon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`pr-step ${
                  isActive
                    ? "pr-step-active"
                    : isCompleted
                    ? "pr-step-completed"
                    : "pr-step-pending"
                }`}
              >
                <div
                  className={`pr-step-icon ${
                    isActive || isCompleted
                      ? "pr-step-icon-filled"
                      : "pr-step-icon-empty"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircleIcon sx={{ fontSize: 15 }} />
                  ) : (
                    <StepIcon sx={{ fontSize: 15 }} />
                  )}
                </div>

                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        <ProfileProgressCard progress={progress} />
      </div>
    </aside>
  );
};

export default RegistrationSidebar;