import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Login/components/LoginHeader";
import LoginBranding from "../Login/components/LoginBranding";
import RoleGrid from "./components/RoleGrid";
import LoginFooter from "../Login/components/LoginFooter";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("patient");

  const handleContinue = () => {
    // Save selected role into mock session storage
    sessionStorage.setItem("userRole", selectedRole);
    
    // Navigate to the Login / Sign-in page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 md:p-6 lg:p-8 font-TypeFace">
      <LoginHeader onLogoClick={() => navigate("/")} />

      <main className="flex-1 flex items-center justify-center py-6">
        <div className="login-card-container max-w-[1200px] w-full bg-white rounded-[32px] shadow-xl border border-gray-100/80 flex flex-col md:flex-row min-h-[640px] md:min-h-[700px] overflow-hidden">
          <LoginBranding />
          
          <RoleGrid
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onSubmit={handleContinue}
          />
        </div>
      </main>

      <LoginFooter />
    </div>
  );
};

export default RoleSelection;
