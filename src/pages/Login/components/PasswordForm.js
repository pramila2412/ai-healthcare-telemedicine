import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId || '';

  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter your password.');
      return;
    }
    // Simulate successful login
    alert(`Logging in...`);
    navigate('/');
  };

  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 p-8 lg:p-5 flex flex-col justify-between bg-white min-h-[600px] lg:min-h-auto">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/login')} 
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-xs font-semibold py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer self-start shadow-2xs"
      >
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">Secure Access</h2>
          <p className="login-form-desc text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Enter your password to continue securely to your healthcare workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Password</label>
            <div className="flex items-center border border-gray-200 rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-white px-4 py-3.5">
              <input 
                type="password" 
                placeholder="Enter your password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm text-slate-800 placeholder-gray-400 outline-none" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="login-form-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md transition-colors duration-200 mt-4 cursor-pointer"
          >
            Continue
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <p className="login-form-footer-text text-xs text-gray-500">
            Forgot your password? <button type="button" className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer">Reset here!</button>
          </p>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="border border-gray-100 rounded-2xl p-4 bg-slate-50/50 flex items-start gap-3 max-w-md mx-auto w-full mt-4 lg:mt-0 shadow-xs">
        <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h4 className="login-form-hipaa-badge-title text-xs font-bold text-slate-800 leading-tight">Secure & HIPAA Ready</h4>
          <p className="login-form-hipaa-badge-desc text-[11px] text-gray-500 leading-normal mt-0.5 font-medium">
            Your healthcare information is protected with enterprise grade encryption and secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
