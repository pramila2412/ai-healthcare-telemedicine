import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from 'formik';
const SecureAccountModal = ({ isOpen, onClose, onComplete }) => {
  if (!isOpen) return null;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validateOnBlur: true,
    validateOnChange: true,
    validate: (values) => {
      const errors = {};
      
      if (!values.password) {
        errors.password = "Please enter your password.";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Add at least one uppercase letter.";
      } else if (!/[a-z]/.test(values.password)) {
        errors.password = "Add at least one lowercase letter.";
      } else if (!/[\d]/.test(values.password)) {
        errors.password = "Add at least one number.";
      } else if (!/[\d!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = "Please create a stronger password.";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm password is required.";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
      }
      
      return errors;
    },
    onSubmit: () => { onComplete ? onComplete(formik.values.password) : onClose(); },
  });

  const { password, confirmPassword } = formik.values;

  // Validation Logic
  const requirements = [
    { id: 1, label: "At least 8 Characters", test: (pw) => pw.length >= 8 },
    {
      id: 2,
      label: "At least one small letter",
      test: (pw) => /[a-z]/.test(pw),
    },
    {
      id: 3,
      label: "At least one capital letter",
      test: (pw) => /[A-Z]/.test(pw),
    },
    {
      id: 4,
      label: "At least one number or symbol",
      test: (pw) => /[\d!@#$%^&*(),.?":{}|<>]/.test(pw),
    },
  ];

  const metCount = requirements.filter((req) => req.test(password)).length;

  // Strength Configuration

  const getStrength = () => {
    if (password.length === 0) return { label: "", color: "var(--color-disabled-bg)", text: "", width: "0%" };
    if (metCount <= 1) return { label: "Poor",     color: "var(--color-danger)",   text: "text-[--color-danger]",   width: "25%" };
    if (metCount <= 3) return { label: "Moderate", color: "var(--color-warning)",  text: "text-[--color-warning]",  width: "50%" };
    return             { label: "Great",    color: "var(--color-primary)", text: "text-primary", width: "100%" };
  };

  const strength = getStrength();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40  secure-modal">
      <form onSubmit={formik.handleSubmit}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-10 animate-in fade-in zoom-in duration-300">
        {/* Close Button (positioned outside like the image) */}
        <button
          onClick={onClose}
          className="absolute -right-8 -top-4 md:-right-12 md:-top-[-2] bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <Icon
            icon="material-symbols-light:close-rounded"
            width="24"
            height="24"
            color="#4B5563"
          />
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="text-base font-medium  secure-modal-heading">
              Secure Your Account
            </h2>
            <p className="text-sm secure-modal-placeholder mt-1 max-w-sm">
              Create a strong password to protect your account and personal
              information.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 secure-modal-muted text-xs mb-2">
              <Icon
                icon="streamline:customer-support-1"
                width="18"
                height="18"
              />
              <span>Need Help?</span>
            </div>
            <button className="secure-modal-contact-btn px-4 py-1.5 rounded-md text-sm font-medium">
              Contact Support
            </button>
          </div>
        </div>

        {/* Sub-Header */}
        <div className="mb-6">
          <h3 className="text-base font-medium secure-modal-heading">
            Create a strong password
          </h3>
          <p className="text-xs secure-modal-placeholder mt-0.5">
            Create a strong password with a mix of letters, numbers and symbols
          </p>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium secure-modal-heading">
              Create New Password
            </label>
            <div className="relative group">
              <Icon
                icon="tabler:lock"
                width="18"
                height="18"
                className="absolute left-4 top-1/2 -translate-y-1/2 secure-modal-muted group-focus-within:text-primary"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your new password"
                className={`w-full pl-11 pr-11 py-3.5 bg-white border rounded-xl focus:ring-2 outline-none transition-all placeholder:secure-modal-placeholder text-slate-700 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-400"
                    : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon
                  icon={
                    showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"
                  }
                  width="20"
                  height="20"
                />
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium secure-modal-heading">
              Confirm Password
            </label>
            <div className="relative group">
              <Icon
                icon="tabler:lock"
                width="18"
                height="18"
                className="absolute left-4 top-1/2 -translate-y-1/2 secure-modal-muted group-focus-within:text-primary"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter password again"
                className={`w-full pl-11 pr-11 py-3.5 bg-white border rounded-xl focus:ring-2 outline-none transition-all placeholder:secure-modal-placeholder text-slate-700 ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-400 focus:ring-red-500/20 focus:border-red-400"
                    : "border-gray-200 focus:ring-primary/20 focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon
                  icon={
                    showConfirmPassword
                      ? "mdi:eye-outline"
                      : "mdi:eye-off-outline"
                  }
                  width="20"
                  height="20"
                />
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Strength Meter */}
        {password.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <div className="h-1.5 w-1/2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: strength.width, backgroundColor: strength.color }}
              />
            </div>
            <p className={`text-xs font-semibold ${strength.text}`}>
              {strength.label}
            </p>
          </div>
        )}

        {/* Checklist */}
        <div className="space-y-3 mb-10">
          <h4 className="text-sm font-bold secure-modal-heading">Should Contain:</h4>
          <div className="grid grid-cols-1 gap-y-2.5">
            {requirements.map((req) => {
              const isMet = req.test(password);
              const isStarted = password.length > 0;
              return (
                <div key={req.id} className="flex items-center gap-3">
                  <Icon
                    icon={isMet ? "mdi:tick-circle" : isStarted ? "mdi:close-circle" : "mdi:tick-circle"}
                    width="18"
                    height="18"
                    color={isMet ? "var(--color-primary)" : isStarted ? "var(--color-danger)" : "#D1D5DB"}
                  />
                  <span
                    className={`text-[13px] transition-colors ${
                      isMet ? "text-primary" : isStarted ? "text-[--color-danger]" : "secure-modal-placeholder"
                    }`}
                  >
                    {req.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!formik.isValid || !formik.dirty}
          className={`w-full py-4 rounded-xl font-medium transition-all shadow-lg 
            ${
              formik.isValid && formik.dirty
                ? "bg-primary text-white hover:bg-[--color-primary-hover] shadow-teal-900/10 active:scale-[0.98]"
                : "btn-disabled shadow-none"
            }`}
        >
          Create Profile
        </button>
      </div>
      </form>
    </div>
  );
};

export default SecureAccountModal;
