import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  // State to manage which tab is active ('phone' or 'uniqueId')
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();

    if (loginMethod === 'phone') {
      navigate('/verify', { state: { phoneNumber: `+91 ${phoneNumber}` } });
    } else {
      navigate('/password', { state: { uniqueId } });
    }
  };

  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 p-8 lg:p-5 flex flex-col justify-between bg-white min-h-[600px] lg:min-h-auto">
      <div className="hidden lg:block h-6"></div>

      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">Welcome Back!</h2>
          <p className="login-form-desc text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Continue securely using your phone number or Unique ID.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6">
          <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Login with</label>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            {/* Phone Number Tab */}
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              className={`flex items-center justify-center gap-2 text-xs font-medium py-2.5 px-4 rounded-lg transition-all cursor-pointer ${loginMethod === 'phone'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9116 10.3735L11.5071 10.7732C11.5071 10.7732 10.5445 11.7226 7.91782 9.13024C5.29118 6.53787 6.25384 5.58845 6.25384 5.58845L6.50806 5.3361C7.1365 4.71668 7.19605 3.72138 6.64761 2.99431L5.52762 1.5093C4.84851 0.609293 3.53741 0.490174 2.75964 1.25783L1.36409 2.63431C0.979204 3.01549 0.721428 3.50785 0.752539 4.05491C0.832538 5.45521 1.47076 8.46671 5.02984 11.9803C8.80493 15.7056 12.3471 15.8538 13.7951 15.7197C14.2538 15.6774 14.652 15.4462 14.9729 15.1285L16.2351 13.8826C17.0884 13.0417 16.8484 11.5991 15.7569 11.0106L14.0591 10.0938C13.3427 9.70819 12.4716 9.82113 11.9116 10.3735Z" stroke="#096B58" stroke-width="1.5" />
              </svg>

              Phone Number
            </button>
            {/* Unique ID Tab */}
            <button
              type="button"
              onClick={() => setLoginMethod('uniqueId')}
              className={`flex items-center justify-center gap-2 text-xs font-medium py-2.5 px-4 rounded-lg transition-all cursor-pointer ${loginMethod === 'uniqueId'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-100/50 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
                }`}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.75 16.75V15.75C0.75 13.8935 1.4875 12.113 2.80025 10.8003C4.11301 9.4875 5.89348 8.75 7.75 8.75M7.75 8.75C9.60652 8.75 11.387 9.4875 12.6997 10.8003C14.0125 12.113 14.75 13.8935 14.75 15.75V16.75M7.75 8.75C8.81087 8.75 9.82828 8.32857 10.5784 7.57843C11.3286 6.82828 11.75 5.81087 11.75 4.75C11.75 3.68913 11.3286 2.67172 10.5784 1.92157C9.82828 1.17143 8.81087 0.75 7.75 0.75C6.68913 0.75 5.67172 1.17143 4.92157 1.92157C4.17143 2.67172 3.75 3.68913 3.75 4.75C3.75 5.81087 4.17143 6.82828 4.92157 7.57843C5.67172 8.32857 6.68913 8.75 7.75 8.75Z" stroke="#4D4D4D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              Unique ID
            </button>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleContinue}>

          {/* Dynamic Input Switching based on Tab Selection */}
          {loginMethod === 'phone' ? (
            <div className="animate-fade-in">
              <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Phone Number</label>
              <div className="flex border border-gray-200 rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-white">
                <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-gray-100 text-sm font-medium text-slate-700 cursor-pointer">
                  <span>🇮🇳</span> <span>+91</span> <span className="text-[10px] text-gray-400">▼</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="login-form-input w-full px-4 py-3 text-sm text-slate-800 placeholder-gray-400 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Unique ID</label>
              <div className="flex items-center border border-gray-200 rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-white px-4 py-3.5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10.2857H20M7.55556 14.5714H7.56444M11.1111 14.5714H12.8889M4 8.57143C4 7.88944 4.28095 7.23539 4.78105 6.75315C5.28115 6.27092 5.95942 6 6.66667 6H17.3333C18.0406 6 18.7189 6.27092 19.219 6.75315C19.719 7.23539 20 7.88944 20 8.57143V15.4286C20 16.1106 19.719 16.7646 19.219 17.2468C18.7189 17.7291 18.0406 18 17.3333 18H6.66667C5.95942 18 5.28115 17.7291 4.78105 17.2468C4.28095 16.7646 4 16.1106 4 15.4286V8.57143Z" stroke="#666666" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <input
                  type="text"
                  placeholder="Enter your unique ID"
                  required
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-gray-400 outline-none ml-2"
                />
              </div>
            </div>
          )}

          <button type="submit" className="login-form-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md transition-colors duration-200 mt-2 cursor-pointer">
            Continue
          </button>
        </form>

        {/* Footers */}
        <div className="text-center mt-5">
          <p className="login-form-footer-text text-xs text-gray-500">
            Don't have an account? <button type="button" className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer">Sign up</button>
          </p>
        </div>

        <p className="login-form-footer-text text-[10px] text-gray-400 text-center leading-relaxed mt-8 max-w-sm mx-auto font-medium">
          By continuing, you agree to receive updates from the MediConnect team and confirm that you have read, understood, and agree to MediConnect's <button type="button" className="text-slate-600 underline hover:text-emerald-700 cursor-pointer">Terms & Conditions</button> and <button type="button" className="text-slate-600 underline hover:text-emerald-700 cursor-pointer">Privacy Policy</button>.
        </p>
      </div>

      {/* Compliance Badge */}
      <div className="border border-gray-100 rounded-2xl p-4 bg-slate-50/50 flex items-start gap-3 max-w-md mx-auto w-full mt-4 lg:mt-0 shadow-xs">
        <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
        </div>
        <div>
          <h4 className="login-form-hipaa-badge-title text-xs font-bold text-slate-800 leading-tight">Secure & HIPAA Ready</h4>
          <p className="login-form-hipaa-badge-desc text-[11px] text-gray-500 leading-normal mt-0.5 font-medium">Your healthcare information is protected with enterprise grade encryption and secure authentication.</p>
        </div>
      </div>
    </div>
  );
}
