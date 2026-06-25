import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import {
    profileProgressByStep,
    registrationSteps,
} from "../constants/registrationSteps";
import ProfileProgressCard from "./ProfileProgressCard";

const RegistrationSidebar = ({ currentStep }) => {
  const progress = profileProgressByStep[currentStep] || 0;

  return (
    <aside className="flex min-h-screen w-[250px] flex-col border-r border-slate-100 bg-[#F8FBFA] px-5 py-7 max-md:min-h-0 max-md:w-full max-md:border-b max-md:border-r-0">
      <div className="mb-11 flex items-center gap-2.5 max-md:mb-6">
        <img
          src="/images/logo.png"
          alt="MediConnect logo"
          className="h-9 w-9 object-contain"
        />

        <div>
          <h3 className="m-0 text-sm font-bold text-emerald-700">
            MediConnect
          </h3>
          <p className="m-0 text-[10px] text-slate-500">
            AI Healthcare Platform
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 max-md:gap-2.5">
        {registrationSteps.map((step) => {
          const StepIcon = step.icon;
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-xs transition ${
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

              <span>{step.label}</span>
            </div>
          );
        })}
      </div>

      <ProfileProgressCard progress={progress} />
    </aside>
  );
};

export default RegistrationSidebar;