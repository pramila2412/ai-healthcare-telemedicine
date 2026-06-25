import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { registrationConfig } from "../../data/registrationConfig";
import {
  STEP_INDEXES,
  profileProgressByStep,
  registrationSteps,
} from "../../data/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

const RegistrationSidebar = ({ currentStep }) => {
  const progress = profileProgressByStep[currentStep] || 0;

  const visibleSteps = registrationConfig.showReviewStepInSidebar
    ? registrationSteps
    : registrationSteps.filter((step) => step.id !== STEP_INDEXES.REVIEW_COMPLETE);

  const mobileStepperClass =
    registrationConfig.mobileStepperVariant === "horizontal-scroll"
      ? "flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0 md:gap-5"
      : "grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-5";

  return (
    <aside className="w-full border-b border-slate-100 bg-[#F8FBFA] px-4 py-5 md:min-h-screen md:w-[250px] md:border-b-0 md:border-r md:px-5 md:py-7">
      <div className="mb-5 flex items-center gap-2.5 md:mb-11">
        <img
          src="/images/logo.png"
          alt="MediConnect logo"
          className="h-9 w-9 object-contain"
        />

        <div>
          <h3 className="m-0 text-sm font-bold text-emerald-700">MediConnect</h3>
          <p className="m-0 text-[10px] text-slate-500">AI Healthcare Platform</p>
        </div>
      </div>

      <div className={mobileStepperClass}>
        {visibleSteps.map((step) => {
          const StepIcon = step.icon;
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={`flex min-w-0 items-center gap-2 rounded-xl px-2 py-2 text-[11px] transition md:gap-3 md:px-2.5 md:py-2.5 md:text-xs ${
                isActive
                  ? "bg-emerald-50 font-bold text-emerald-700"
                  : isCompleted
                  ? "font-medium text-emerald-600"
                  : "font-medium text-slate-400"
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                  isActive || isCompleted
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <CheckCircleIcon sx={{ fontSize: 15 }} />
                ) : (
                  <StepIcon sx={{ fontSize: 15 }} />
                )}
              </div>

              <span className="leading-4">{step.label}</span>
            </div>
          );
        })}
      </div>

      <ProfileProgressCard progress={progress} />
    </aside>
  );
};

export default RegistrationSidebar;
