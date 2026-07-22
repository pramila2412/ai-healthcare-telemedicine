import React, { useState, useEffect } from 'react';
import { RefreshCw, Lock, Loader2, XCircle } from 'lucide-react';
import { Icon } from '@iconify/react';
import { AVAILABLE_IDS, TAKEN_IDS } from '@/shared/constants/mockLoginIds';

const CreateLoginId = ({ data = {}, onChange }) => {
  const [idValue, setIdValue] = useState('AB1234');
  const [status, setStatus] = useState('available'); // 'idle', 'checking', 'available', 'unavailable'
  const [isTyping, setIsTyping] = useState(false);
  const [isManualEntry, setIsManualEntry] = useState(false);
  
  const [suggestions, setSuggestions] = useState(AVAILABLE_IDS.slice(0, 5).map(id => `PAT-${id}`));

  const generateMore = () => {
    // Pick 5 random IDs from AVAILABLE_IDS that aren't currently shown
    const currentVals = suggestions.map(s => s.replace('PAT-', ''));
    const availablePool = AVAILABLE_IDS.filter(id => !currentVals.includes(id) && id !== idValue);
    
    const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);
    
    setSuggestions(selected.map(id => `PAT-${id}`));
  };

  useEffect(() => {
    if (onChange) {
      onChange({ ...data, loginId: idValue, isValid: status === 'available' });
    }
  }, [idValue, status]); // Sync with parent layout

  useEffect(() => {
    if (!isTyping) return;

    if (idValue.length === 6) {
      setStatus('checking');
      const timer = setTimeout(() => {
        if (TAKEN_IDS.includes(idValue)) {
          setStatus('unavailable');
        } else {
          setStatus('available');
        }
        setIsTyping(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setStatus('idle');
    }
  }, [idValue, isTyping]);

  let borderClass = 'border-gray-200 focus-within:ring-gray-300';
  let patBoxClass = 'bg-gray-200 text-gray-700';
  let message = null;
  let icon = null;

  if (status === 'checking') {
    message = <p className="text-[13px] font-medium text-gray-500 mt-1">Checking availability...</p>;
    icon = <Loader2 size={20} className="text-gray-400 animate-spin shrink-0" />;
  } else if (status === 'available') {
    borderClass = 'border-primary focus-within:ring-primary/10';
    patBoxClass = 'bg-primary text-white';
    
    const successMessage = isManualEntry 
      ? 'Great choice! This ID is available and ready to use for your account.' 
      : `PAT-${idValue} is available`;
      
    message = <p className="text-[13px] font-medium text-primary mt-1">{successMessage}</p>;
    icon = <Icon icon="tabler:circle-check-filled" className="text-primary shrink-0" width="22" height="22" />;
  } else if (status === 'unavailable') {
    borderClass = 'border-red-500 focus-within:ring-red-100';
    patBoxClass = 'bg-red-500 text-white';
    message = <p className="text-[13px] font-medium text-red-500 mt-1">This ID is already in use. Try another ID or choose one of the suggestions below.</p>;
    icon = <XCircle size={20} className="text-red-500 shrink-0" strokeWidth={2.5} />;
  }

  return (
    <div className="w-full max-w-4xl pb-24 mt-2">
      
      {/* Input Section */}
      <div className="flex flex-col gap-1.5 mb-10">
        <label className="text-[14px] font-semibold text-gray-800">MediConnect ID</label>
        <div className={`flex w-full sm:w-[380px] h-[48px] border rounded-xl overflow-hidden focus-within:ring-4 transition-all duration-300 ${borderClass}`}>
          <div className={`w-[60px] flex items-center justify-center font-medium text-[14px] tracking-wide transition-colors duration-300 ${patBoxClass}`}>
            PAT
          </div>
          <div className="flex-1 flex items-center bg-white pr-4">
            <input 
              type="text" 
              value={idValue} 
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                if (val.length <= 6) {
                  setIdValue(val);
                  setIsTyping(true);
                  setIsManualEntry(true);
                }
              }}
              className="flex-1 h-full px-4 text-gray-800 text-[14px] tracking-wide font-medium outline-none uppercase bg-transparent"
              placeholder="Enter ID"
              maxLength={6}
            />
            {icon}
          </div>
        </div>
        
        {/* Availability Message */}
        <div className="mt-0.5 h-5">
          {message}
        </div>
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
            onClick={generateMore}
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
                onClick={() => {
                  setIdValue(val);
                  setIsTyping(false);
                  setIsManualEntry(false);
                  setStatus('available');
                }}
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