import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import VerifyOtp from "./pages/Login/VerifyOtp";
import LoginPassword from "./pages/Login/LoginPassword";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import SignUp from "./pages/SignUp/SignUp";
import LandingPage from "./pages/LandingPage/LandingPage";
import GlobalConfigView from "./shared/components/GlobalConfigView/GlobalConfigView.js";
import LoadingOverlay from "./shared/components/LoadingOverlay/LoadingOverlay";
import NotificationView from "./shared/components/Notification/NotificationView.jsx";
import withSecurity from "./shared/components/WithSecurity/WithSecurity.js";
import ScrollToTop from "./shared/ScrollToTop/ScrollToTop.jsx";
import PatientRegistration from "./pages/PatientRegistration/PatientRegistration";


function App() {
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <LoadingOverlay />
        <NotificationView />
        <GlobalConfigView>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/password" element={<LoginPassword />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </GlobalConfigView>
      </div>
    </BrowserRouter>
  );
}

export default withSecurity(App);
