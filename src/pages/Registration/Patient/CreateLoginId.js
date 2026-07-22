import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, Lock } from 'lucide-react';

const CreateLoginId = () => {
  const [idValue, setIdValue] = useState('7G3H81');
  
  const suggestions = [
    'PAT-7G3H81',
    'PAT-6H2H81',
    'PAT-8G3M81',
    'PAT-6G3H81',
    'PAT-9G3H81'
  ];

  return (
    <div className="w-full max-w-4xl pb-24 mt-2">
      
      {/* Input Section */}
      <div className="flex flex-col gap-1.5 mb-10">
        <label className="text-[14px] font-semibold text-gray-800">MediConnect ID</label>
        <div className="flex w-full sm:w-[380px] h-[48px] border border-primary rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-primary/10 transition-shadow">
          <div className="w-[60px] bg-primary flex items-center justify-center text-white font-medium text-[14px] tracking-wide">
            PAT
          </div>
          <div className="flex-1 flex items-center bg-white pr-4">
            <input 
              type="text" 
              value={idValue} 
              onChange={(e) => setIdValue(e.target.value.toUpperCase())}
              className="flex-1 h-full px-4 text-gray-800 text-[14px] tracking-wide font-medium outline-none uppercase"
              placeholder="Enter ID"
            />
            {idValue.length >= 6 && (
              <CheckCircle2 size={20} className="text-primary shrink-0" strokeWidth={2.5} />
            )}
          </div>
        </div>
        
        {/* Availability Message */}
        {idValue.length >= 6 && (
          <p className="text-[13px] font-medium text-primary mt-1">
            PAT-{idValue} is available
          </p>
        )}
      </div>

      {/* Suggestions Section */}
      <div className="mb-12">
        <div className="flex justify-between items-start mb-5 sm:items-center flex-col sm:flex-row gap-4 sm:gap-0">
          <div className="flex flex-col">
            <h4 className="text-[14px] font-semibold text-gray-800">Suggested IDs</h4>
            <p className="text-[12px] text-gray-500 mt-0.5">Tap on any ID to use it</p>
          </div>
          <button 
            type="button"
            className="flex items-center justify-center gap-1.5 px-4 py-2 border border-primary/30 rounded-lg text-primary text-[13px] font-semibold hover:bg-secondary transition-colors cursor-pointer w-full sm:w-auto"
          >
            <RefreshCw size={15} strokeWidth={2.5} />
            Generate more
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {suggestions.map((suggestion) => {
            const val = suggestion.replace('PAT-', '');
            const isSelected = val === idValue;
            
            return (
              <button 
                key={suggestion}
                onClick={() => setIdValue(val)}
                className={`px-5 py-2.5 border rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${
                  isSelected 
                    ? 'border-primary bg-secondary text-primary' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                {suggestion}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-5 flex items-start gap-3 mt-12 w-full max-w-xl">
        <Lock size={18} className="text-gray-500 mt-0.5 shrink-0" strokeWidth={2} />
        <div className="flex flex-col">
          <h5 className="text-[13px] font-bold text-gray-800 mb-1.5">Important to know</h5>
          <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
            Your MediConnect ID is unique and cannot be changed after your account is created. 
            You can use your registered phone number or this ID to sign in.
          </p>
        </div>
      </div>

    </div>
  );
};

export default CreateLoginId;