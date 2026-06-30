import React from "react";
import RegistrationSidebar from "./RegistrationSidebar";
import SupportLink from "./SupportLink";

const RegistrationShell = ({ currentStep, onStepChange, children }) => {
  return (
    <div className="pr-registration-page">
      <RegistrationSidebar
        currentStep={currentStep}
        onStepChange={onStepChange}
      />

      <main className="pr-registration-main">
        <SupportLink />
        {children}
      </main>
    </div>
  );
};

export default RegistrationShell;