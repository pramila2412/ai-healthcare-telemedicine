import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VerifiedBadge from "../../../../assets/patientRegistration/images/verified_check_icon.png";
import { Icon } from "@iconify/react";
import { sideBarRegistrationSelectors } from "@/state-management/modules/rootSelectors";

const SuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const activeSectionData = useSelector((state) => 
    sideBarRegistrationSelectors.getSectionData(state, 'basic')
  );
  
  const phoneNumber = useSelector((state) => state.security?.phoneNumber || "");
  const { email = "" } = activeSectionData || {};

  const maskEmail = (em) => {
    if (!em) return "";
    const [name, domain] = em.split("@");
    if (!domain) return em;
    if (name.length <= 2) return `${name[0]}***@${domain}`;
    return `${name[0]}***${name[name.length - 1]}@${domain}`;
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(-10);
    }
    if (cleanPhone.length < 5) return cleanPhone;
    const last4 = cleanPhone.slice(-4);
    const prefix = cleanPhone.slice(0, -4).replace(/\d/g, '*');
    return prefix + last4;
  };

  useEffect(() => {
    // Kept empty in case of future logic, or we can just remove the timer
  }, [isOpen]);

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40  secure-modal">
      {/* Main Container */}
      <div className="bg-white secure-modal rounded-[2.5rem] shadow-2xl max-w-lg w-full p-8 md:p-10 relative overflow-hidden">
        {/* 1. Success Icon Section */}
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <img
              src={VerifiedBadge}
              alt="Verified"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* 2. Header Content */}
        <div className="text-center mb-4">
          <h1 className="text-2xl secure-modal-heading mb-2">Thank you!</h1>
          <p className="secure-modal-placeholder text-[15px] leading-relaxed px-4">
            Account created successfully your account details has been shared to
            registered phone number and email
          </p>
        </div>

        {/* 3. Confirmation Details */}
        <div className="space-y-5 mb-4">
          <div>
            <h3 className="secure-modal-heading font-semibold mb-1 text-base">
              Mobile Confirmation
            </h3>
            <p className="insurance-modal-caption text-sm">
              Your registered mobile number{" "}
              <span className="font-medium secure-modal-heading">
                {maskPhone(phoneNumber)}
              </span>{" "}
              has been verified.
            </p>
          </div>
          <div>
            <h3 className="secure-modal-heading font-semibold mb-1 text-base">
              Email Confirmation
            </h3>
            <p className="insurance-modal-caption text-sm">
              Confirmation email sent to:{" "}
              <span className="font-medium secure-modal-heading">
                {maskEmail(email) || "a**d123@gmail.com"}
              </span>
            </p>
          </div>
        </div>

        {/* 4. Support Journey Box */}
        <div className="bg-white border verified-modal-border rounded-2xl p-4 flex gap-4 mb-10 items-start">
          <div className="mt-1 verified-modal-btn flex-shrink-0">
            <Icon icon="tabler:heart-plus" width="18" height="18" />
          </div>
          <p className="secure-modal-heading text-sm leading-snug">
            We're here to support your health journey every step of this way.
          </p>
        </div>

        {/* 5. Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 verified-modal-btn border-1 border-[--color-primary] font-bold py-3.5 px-4 rounded-md transition-all hover:bg-[--color-secondary] active:scale-[0.98]">
            Download Application
          </button>
          <button 
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="flex-1 bg-primary verified-modal-btn-solid font-bold py-3.5 px-4  transition-all shadow-md rounded-md  active:scale-[0.98] hover:bg-[--color-primary-hover]">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;