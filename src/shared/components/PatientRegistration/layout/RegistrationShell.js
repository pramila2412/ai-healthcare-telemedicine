import React from "react";
import RegistrationSidebar from "./RegistrationSidebar";
import SupportLink from "./SupportLink";

const RegistrationShell = ({ currentStep, children }) => {
  return (
    <div className="pr-layout">
      <RegistrationSidebar currentStep={currentStep} />

      <main className="pr-main">
        <SupportLink />
        {children}
      </main>
    </div>
  );
};

export default RegistrationShell;