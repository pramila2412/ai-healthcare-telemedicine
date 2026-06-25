import React from "react";
import RegistrationSidebar from "./RegistrationSidebar";
import SupportLink from "./SupportLink";

const RegistrationShell = ({ currentStep, children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 md:flex">
      <RegistrationSidebar currentStep={currentStep} />

      <main className="w-full px-5 py-6 md:flex-1 md:px-8 md:py-8 lg:px-11">
        <SupportLink />
        {children}
      </main>
    </div>
  );
};

export default RegistrationShell;
