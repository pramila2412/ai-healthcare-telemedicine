import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Login/components/LoginHeader";
import LoginBranding from "../Login/components/LoginBranding";
import LoginFooter from "../Login/components/LoginFooter";

// Import modular sub-components for the 3 steps
import SignUpRoleGrid from "./components/SignUpRoleGrid";
import SignUpPhoneForm from "./components/SignUpPhoneForm";
import SignUpOtpForm from "./components/SignUpOtpForm";

import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUserRole } from "@/state-management/modules/auth/authActions";
// pages/SignUp/SignUp.js
import { resetRegistration } from "@/state-management/modules/registration/registrationActions";  

const SignUp = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Signup State Flow
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("patient");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);

  // Resend OTP countdown effect
  useEffect(() => {
    if (step !== 3 || timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  // Role Selection Continue Handler (Step 1 -> Step 2)
  const handleRoleSubmit = (e) => {
  e.preventDefault();
  dispatch(setUserRole(selectedRole));   // 🔑 persist role to Redux now
  setStep(2);
};

  // Phone Number Submission Handler (Step 2 -> Step 3)
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setTimer(30);
    setStep(3);
  };

  // OTP Verification Submission Handler (Step 3 Submit)
  const handleOtpVerify = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter all 6 digits of the OTP.",
        confirmButtonColor: "#065f46",
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Signup Successful!",
      text: "Redirecting...",
      timer: 2000,
      showConfirmButton: false,
    });

    dispatch(resetRegistration());
    navigate("/registration");
  };
 /* navigate(`/${selectedRole}-registration`); */
  // Handler for resending code
  const handleResendOtp = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between p-4 md:p-6 lg:p-8 font-TypeFace">
      {/* Header */}
      <LoginHeader onLogoClick={() => navigate("/")} />

      <main className="flex-1 flex items-center justify-center py-6">
        <div className="login-card-container max-w-300 w-full bg-white rounded-4xl shadow-xl border border-gray-100/80 flex flex-col md:flex-row min-h-160 md:min-h-175 overflow-hidden">
          {/* Left Split: Shared Green Branding */}
          <LoginBranding />

          {/* Right Split: Modular Signup Wizard Steps */}
          {step === 1 && (
            <SignUpRoleGrid
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
              onSubmit={handleRoleSubmit}
            />
          )}

          {step === 2 && (
            <SignUpPhoneForm
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              onSubmit={handlePhoneSubmit}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <SignUpOtpForm
              phoneNumber={phoneNumber}
              otp={otp}
              setOtp={setOtp}
              timer={timer}
              setTimer={setTimer}
              onSubmit={handleOtpVerify}
              onBack={() => setStep(2)}
              handleResendOtp={handleResendOtp}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
};

export default SignUp;
