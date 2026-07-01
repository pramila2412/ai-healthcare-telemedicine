// import React from 'react';
// import Doctor from '@assets/doctor.jpg'; 

// export default function LoginBranding() {
//   return (
//     <div className="md:w-1/2 lg:w-1/2 bg-[#096B58] text-white p-8 md:p-10 lg:p-14 flex flex-col relative overflow-hidden min-h-[550px] md:min-h-auto rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">

//       {/* Layer 1: Doctor Image (Pushed to back) - z-10 */}
//       <div className="absolute bottom-0 lg:top-[19%]  h-[100%] left-8 right-8 md:left-10 md:right-10 lg:left-14 lg:right-14 max-w-lg mx-auto z-10 pointer-events-none overflow-hidden flex justify-center items-end">
//         <img
//           src={Doctor}
//           alt="Healthcare Provider assisting Patient"
//           className="login-branding-doctor-img w-full h-full object-cover object-bottom"
//         />
//       </div>

//       {/* Layer 2: Gradient Overlay */}
//       <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-[#096B58] via-[#096B58]/95 to-transparent z-11 pointer-events-none"></div>

//       {/* Layer 3: Top Content (Brought to front) - z-20 */}
//       <div className="relative z-20 flex flex-col items-center text-center">
//         <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
//           <span className="text-white text-xs font-medium tracking-wide">AI-Powered Healthcare Ecosystem</span>
//         </div>

//         <h1 className="login-branding-title text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 tracking-tight">
//           One Secure Access for<br className="hidden lg:block" /> Every Healthcare User
//         </h1>

//         <p className="login-branding-desc text-sm text-white/80 leading-relaxed max-w-md font-light mb-8">
//           Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance providers connected through one intelligent healthcare ecosystem.
//         </p>
//       </div>

//       {/* Layer 4: Badges (Brought to front) - z-20 */}
//       <div className="relative z-20 grid grid-cols-3 gap-3 w-full max-w-lg mx-auto mt-auto pt-40">
        
//         {/* Badge 1 */}
//         <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
//           <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
//             <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
//             <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">24/7</span>
//           </div>
//           <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Healthcare Access</p>
//         </div>

//         {/* Badge 2 */}
//         <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
//           <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
//             <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
//             <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">100%</span>
//           </div>
//           <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Encrypted Login</p>
//         </div>

//         {/* Badge 3 */}
//         <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
//           <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
//             <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
//             <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">AI</span>
//           </div>
//           <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">AI Enabled Platform</p>
//         </div>

//       </div>
//     </div>
//   );
// }


import React from 'react';
import Doctor from '@assets/doctor.jpg'; 

export default function LoginBranding() {
  return (
    <div className="md:w-1/2 lg:w-1/2 bg-[#096B58] text-white p-8 md:p-10 lg:p-14 flex flex-col relative overflow-hidden min-h-[550px] md:min-h-auto rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">

      {/* Layer 1: Doctor Image (Pushed to back) - z-10 */}
      <div className="absolute bottom-0 top-[38%] h-[70%]  left-0 w-full flex justify-center items-end z-10 pointer-events-none">
        <img
          src={Doctor}
          alt="Healthcare Provider assisting Patient"
          className="login-branding-doctor-img max-w-[95%] lg:max-w-[90%] h-full max-h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Layer 2: Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#096B58] via-[#096B58]/95 to-transparent z-11 pointer-events-none"></div>

      {/* Layer 3: Top Content (Brought to front) - z-20 */}
      <div className="relative z-20">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
          <span className="text-white text-xs font-medium tracking-wide">AI-Powered Healthcare Ecosystem</span>
        </div>

        <h1 className="login-branding-title text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-4 tracking-tight">
          One Secure Access for<br className="hidden lg:block" /> Every Healthcare User
        </h1>

        <p className="login-branding-desc text-sm text-white/80 leading-relaxed max-w-md font-light mb-8">
          Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance providers connected through one intelligent healthcare ecosystem.
        </p>
      </div>

      {/* Layer 4: Badges (Brought to front) - z-20 */}
      <div className="relative z-20 grid grid-cols-3 gap-3 w-full max-w-lg mt-auto pt-40">
        
        {/* Badge 1 */}
        <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">24/7</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Healthcare Access</p>
        </div>

        {/* Badge 2 */}
        <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">100%</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Encrypted Login</p>
        </div>

        {/* Badge 3 */}
        <div className="bg-white/10 backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>
            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">AI</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">AI Enabled Platform</p>
        </div>

      </div>
    </div>
  );
}