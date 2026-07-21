import React from 'react';
import { roles } from '@/shared/constants/RoleRegistration/roles'; 
export default function SignUpRoleGrid({ selectedRole, setSelectedRole, onSubmit }) {
  const activeRoleObj = roles.find((r) => r.id === selectedRole) || roles[0];

  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 flex flex-col justify-between p-8 lg:p-5 bg-white min-h-[600px] lg:min-h-auto">
      <div className="hidden lg:block h-6"></div>
      
      <div className="max-w-md w-full mx-auto my-auto py-4">
        <div className="mb-6 text-center">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">
            Welcome to MediConnect
          </h2>
          <p className="login-form-desc text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Choose your account type to continue.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {roles.map((role) => {
            const isActive = selectedRole === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`role-grid-card p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${isActive
                  ? "bg-[#eef4f3]/20 border-emerald-600 shadow-sm ring-1 ring-emerald-600"
                  : "bg-white border-gray-300 hover:border-gray-200 hover:bg-gray-50/50"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 transition-colors duration-200 ${isActive
                    ? "bg-emerald-800 text-white"
                    : "bg-slate-50 text-gray-400"
                  }`}
                >
                  {role.icon}
                </div>
                {/* Label */}
                <h3 className="role-grid-card-title font-extrabold text-sm text-gray-900 leading-tight mb-0.5">
                  {role.name}
                </h3>
                <p className="role-grid-card-desc text-[11px] text-gray-400 leading-tight">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="role-grid-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 text-sm cursor-pointer"
        >
          Continue as {activeRoleObj.name}
        </button>
      </div>

      
    </div>
  );
}
