import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import React, { useState } from "react";
import {
  profileProgressByStep,
  registrationSteps,
  STEP_INDEXES,
} from "../../../constants/PatientRegistration/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

const allowedClickableSteps = [
  STEP_INDEXES.MEDICAL_HISTORY,
  STEP_INDEXES.INSURANCE_INFORMATION,
  STEP_INDEXES.HEALTH_RECORDS,
];

const stepIcons = {
  [STEP_INDEXES.PERSONAL_DETAILS]: PersonOutlineOutlinedIcon,
  [STEP_INDEXES.ADDITIONAL_INFORMATION]: AssignmentOutlinedIcon,
  [STEP_INDEXES.MEDICAL_HISTORY]: HealthAndSafetyOutlinedIcon,
  [STEP_INDEXES.INSURANCE_INFORMATION]: AccountBalanceWalletOutlinedIcon,
  [STEP_INDEXES.HEALTH_RECORDS]: FolderOutlinedIcon,
  [STEP_INDEXES.REVIEW_COMPLETE]: DescriptionOutlinedIcon,
};

const RegistrationSidebar = ({ currentStep, onStepChange }) => {
  const [isMobileStepsOpen, setIsMobileStepsOpen] = useState(false);

  const progress =
    profileProgressByStep[currentStep] || profileProgressByStep.default;

  const currentStepDetails =
    registrationSteps.find((step) => step.id === currentStep) ||
    registrationSteps[0];

  const handleStepClick = (stepId) => {
    if (!allowedClickableSteps.includes(stepId)) {
      return;
    }

    if (typeof onStepChange === "function") {
      onStepChange(stepId);
    }

    setIsMobileStepsOpen(false);
  };

  const handleStepKeyDown = (event, stepId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleStepClick(stepId);
    }
  };

  const renderStepIcon = (stepId, isCompleted) => {
    if (isCompleted) {
      return <CheckIcon sx={{ fontSize: 13 }} />;
    }

    const IconComponent = stepIcons[stepId] || AssignmentOutlinedIcon;
    return <IconComponent sx={{ fontSize: 13 }} />;
  };

  const renderSteps = () => (
    <div className="pr-registration-steps">
      {registrationSteps.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;
        const isClickable = allowedClickableSteps.includes(step.id);

        return (
          <div
            key={step.id}
            role={isClickable ? "button" : "presentation"}
            tabIndex={isClickable ? 0 : -1}
            className={`pr-step-item ${isActive ? "pr-step-active" : ""} ${
              isCompleted ? "pr-step-completed" : ""
            } ${!isClickable ? "pr-step-disabled" : ""}`}
            onClick={() => handleStepClick(step.id)}
            onKeyDown={(event) => handleStepKeyDown(event, step.id)}
          >
            <span className="pr-step-number">
              {renderStepIcon(step.id, isCompleted)}
            </span>

            <span className="pr-step-title">{step.title}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <aside className="pr-registration-sidebar">
      <div className="pr-sidebar-mobile-top">
        <button
          type="button"
          className="pr-sidebar-menu-button"
          onClick={() => setIsMobileStepsOpen((previousValue) => !previousValue)}
          aria-label="Toggle registration steps"
        >
          {isMobileStepsOpen ? (
            <CloseIcon sx={{ fontSize: 22 }} />
          ) : (
            <MenuIcon sx={{ fontSize: 24 }} />
          )}
        </button>

        <div className="pr-sidebar-mobile-title">
          <span>Patient Registration</span>
          <strong>{currentStepDetails.title}</strong>
        </div>
      </div>

      {isMobileStepsOpen && (
        <div className="pr-sidebar-mobile-steps">{renderSteps()}</div>
      )}

      <div className="pr-sidebar-brand">
        <span className="pr-sidebar-logo">
          <HealthAndSafetyOutlinedIcon sx={{ fontSize: 19 }} />
        </span>

        <div>
          <h2>MediConnect</h2>
          <p>Healthcare Ecosystem</p>
        </div>
      </div>

      {renderSteps()}

      <ProfileProgressCard progress={progress} />
    </aside>
  );
};

export default RegistrationSidebar;