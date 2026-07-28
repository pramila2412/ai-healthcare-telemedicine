import React, { useState, useEffect } from 'react';

import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectPersonalInfo, 
  selectMedicalHistory, 
  selectInsuranceInfo, 
  selectHealthRecords 
} from '@/state-management/modules/Registrations/patientRegistration/patientRegistrationSelectors';
import { setActiveSection } from "@/state-management/modules/Registrations/SidebarRegistration/registrationActions";
import { FIELD_LABELS_AND_ICONS } from "@/shared/constants/PatientRegistration/formFieldsConfig";

const AccordionSection = ({ title, children, expanded, onToggle }) => {
  return (
    <div className="mb-10">
      <button 
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between pb-3 border-b border-gray-200/80 cursor-pointer group"
      >
        <h3 className="text-[15px] font-semibold text-gray-800">{title}</h3>
        <Icon 
          icon={expanded ? "tabler:circle-chevron-up" : "tabler:circle-chevron-down"} 
          className="text-gray-400 group-hover:text-gray-600 transition-colors"
          width="22" 
          height="22" 
        />
      </button>
      {expanded && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-fr">
          {children}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, icon: FieldIcon, fullWidth }) => (
  <div className={`flex items-start gap-3 ${fullWidth ? 'col-span-2' : ''}`}>
    {FieldIcon && (
      <div className="mt-0.5 text-gray-400">
        {typeof FieldIcon === 'string' ? (
          <Icon icon={FieldIcon} width="18" height="18" />
        ) : (
          <FieldIcon size={18} strokeWidth={1.5} style={{ fontSize: 18 }} />
        )}
      </div>
    )}
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium text-gray-400">{label}</span>
      <span className="text-[12px] font-medium text-gray-800">{value}</span>
    </div>
  </div>
);

const DocumentItem = ({ filename, type, size }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">
      <Icon icon="tabler:file-text" width="18" height="18" className="text-teal-600" />
    </div>
    <div className="flex flex-col">
      <span className="text-[12px] font-medium text-gray-800 break-all">{filename}</span>
      <span className="text-[11px] font-medium text-gray-400 mt-0.5">{type} • {size}</span>
    </div>
  </div>
);

const DynamicSectionCard = ({ 
  title, 
  icon: CardIcon, 
  actionLabel, 
  actionIcon: ActionIcon, 
  fields = [], 
  documents = [], 
  children, 
  className = "", 
  fieldsGridClass = "grid grid-cols-2 gap-y-8 gap-x-8",
  onAction
}) => {
  if (fields.length === 0 && documents.length === 0 && !children) {
    return null;
  }

  return (
    <div className={`rounded-2xl border border-gray-100 shadow-sm bg-white flex flex-col overflow-hidden h-full ${className}`}>
      <div className="flex justify-between items-center p-5 border-b border-gray-50">
        <div className="flex items-center gap-3">
          {CardIcon && (
            <div className="p-2 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600">
              {typeof CardIcon === 'string' ? (
                <Icon icon={CardIcon} width="18" height="18" />
              ) : (
                <CardIcon size={18} strokeWidth={1.5} />
              )}
            </div>
          )}
          <h4 className="text-[12px] font-medium text-gray-800">{title}</h4>
        </div>
        {actionLabel && (
          <button 
            type="button"
            onClick={onAction}
            className="flex items-center gap-1.5 text-[12px] font-medium bg-[#e6f4f1] text-teal-600 px-3 py-1.5 rounded-lg hover:bg-teal-50 transition-colors cursor-pointer"
          >
            {ActionIcon && (
              typeof ActionIcon === 'string' ? 
                <Icon icon={ActionIcon} width="16" height="16" /> :
                <ActionIcon size={14} strokeWidth={2} />
            )}
            {actionLabel}
          </button>
        )}
      </div>
      
      {(fields.length > 0 || documents.length > 0 || children) && (
        <div className={`p-6 ${fieldsGridClass}`}>
          {fields.map((field, idx) => (
            <Field key={idx} {...field} />
          ))}
          {documents.map((doc, idx) => (
            <DocumentItem key={idx} {...doc} />
          ))}
          {children}
        </div>
      )}
    </div>
  );
};

const VerifyInformation = ({ data = {}, onChange }) => {
  const dispatch = useDispatch();
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    medical: true,
    insurance: true
  });
  
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Redux Data
  const personalInfo = useSelector(selectPersonalInfo) || {};
  const basic = personalInfo.basicDetails || {};
  const contact = personalInfo.contactLocation || {};
  
  const medical = useSelector(selectMedicalHistory) || {};
  const insurance = useSelector(selectInsuranceInfo) || {};
  const health = useSelector(selectHealthRecords) || {};
  const phoneNumber = useSelector((state) => state.security?.phoneNumber);

  useEffect(() => {
    const container = document.getElementById('step-scroll-container') || window;
    const handleScroll = () => {
      let scrolledToBottom = false;
      if (container === window) {
        scrolledToBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
      } else {
        scrolledToBottom = Math.ceil(container.clientHeight + container.scrollTop) >= container.scrollHeight - 100;
      }
      setIsAtBottom(scrolledToBottom);
    };
    
    container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render/load
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFabClick = () => {
    const container = document.getElementById('step-scroll-container') || window;
    if (isAtBottom) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetScroll = container === window ? document.documentElement.scrollHeight : container.scrollHeight;
      container.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const isAllMinimized = !expandedSections.personal && !expandedSections.medical && !expandedSections.insurance;

  const handleEdit = (sectionKey) => {
    dispatch(setActiveSection(sectionKey));
  };

  // Filter out any fields where value is falsely or empty string
  const conf = FIELD_LABELS_AND_ICONS;
  
  const basicDetailsFields = [
    { ...conf.basicDetails.fullName, value: basic.fullName },
    { ...conf.basicDetails.dob, value: basic.dob },
    { ...conf.basicDetails.gender, value: basic.gender },
    { ...conf.basicDetails.bloodGroup, value: basic.bloodGroup },
    { ...conf.basicDetails.maritalStatus, value: basic.maritalStatus },
    { ...conf.basicDetails.occupation, value: basic.occupation },
    { ...conf.basicDetails.phone, value: phoneNumber },
    { ...conf.basicDetails.email, value: basic.email }
  ].filter(f => !!f.value);

  const locationFields = [
    { ...conf.contactLocation.nationality, value: contact.nationality || "Indian" },
    { ...conf.contactLocation.state, value: contact.state },
    { ...conf.contactLocation.city, value: contact.city }
  ].filter(f => !!f.value);

  const emergencyFields = [
    { ...conf.emergencyContact.relationship, value: contact.emergencyContacts || contact.EmRelationship },
    { ...conf.emergencyContact.name, value: contact.contactName },
    { ...conf.emergencyContact.phone, value: contact.phoneNumber || contact.EmContactNumber }
  ].filter(f => !!f.value);

  const physicalFields = [
    { ...conf.healthOverview.height, value: health.height ? `${health.height} ${health.heightUnit || "cm"}` : '' },
    { ...conf.healthOverview.weight, value: health.weight ? `${health.weight} ${health.weightUnit || "kg"}` : '' }
  ].filter(f => !!f.value);

  const healthFields = [
    { ...conf.healthOverview.bloodPressure, value: health.bloodPressure },
    { ...conf.healthOverview.bloodSugar, value: health.bloodSugar },
    { ...conf.healthOverview.physicalActivityLevel, value: health.physicalActivityLevel || health.activityLevel },
    { ...conf.healthOverview.dietaryPreference, value: health.dietaryPreference || health.dietPreference },
    { ...conf.healthOverview.smokingStatus, value: health.smokingStatus },
    { ...conf.healthOverview.alcoholConsumption, value: health.alcoholConsumption }
  ].filter(f => !!f.value);

  const medicalRecordFields = [
    { ...conf.medicalConditions.allergies, value: (medical.allergyTags?.length ? medical.allergyTags.join(', ') : null) || medical.allergies },
    { ...conf.medicalConditions.existingConditions, value: (medical.conditionTags?.length ? medical.conditionTags.join(', ') : null) || medical.conditions || medical.existingConditions },
    { ...conf.medicalConditions.previousSurgeries, value: (medical.surgeryTags?.length ? medical.surgeryTags.join(', ') : null) || medical.surgeries || medical.previousSurgeries },
    { ...conf.medicalConditions.currentMedications, value: (medical.medicationTags?.length ? medical.medicationTags.join(', ') : null) || medical.medications || medical.currentMedications }
  ].filter(f => !!f.value);

  const insuranceFields = [
    { ...conf.insuranceInformation.insuranceType, value: insurance.insuranceType },
    { ...conf.insuranceInformation.insuranceProvider, value: insurance.provider || insurance.insuranceProvider },
    { ...conf.insuranceInformation.insuredMemberName, value: insurance.holderName || insurance.insuredMemberName },
    { ...conf.insuranceInformation.policyNumber, value: insurance.policyNumber }
  ].filter(f => !!f.value);

  const medicalDocuments = (medical.supportingRecords || []).map(file => ({
    filename: file.name || "Document",
    type: file.type?.split('/')[1] || "pdf",
    size: file.size ? `${Math.round(file.size / 1024)} kb` : "unknown"
  }));

  const insuranceDocuments = (insurance.supportingRecords || []).map(file => ({
    filename: file.name || "Document",
    type: file.type?.split('/')[1] || "pdf",
    size: file.size ? `${Math.round(file.size / 1024)} kb` : "unknown"
  }));

  const hasPersonal = basicDetailsFields.length > 0 || locationFields.length > 0 || emergencyFields.length > 0 || physicalFields.length > 0 || healthFields.length > 0;
  const hasMedical = medicalRecordFields.length > 0 || medicalDocuments.length > 0;
  const hasInsurance = insuranceFields.length > 0 || insuranceDocuments.length > 0;

  return (
    <div className="w-full pb-24 relative">
      {hasPersonal && (
        <AccordionSection 
          title="Personal Information" 
          expanded={expandedSections.personal} 
          onToggle={() => toggleSection('personal')}
        >
          <DynamicSectionCard title="Basic Details" icon="tabler:user" actionLabel="Edit" actionIcon="tabler:edit" fields={basicDetailsFields} onAction={() => handleEdit('basic')} />
          <DynamicSectionCard title="Location" icon="tabler:map-pin" actionLabel="Edit" actionIcon="tabler:edit" fields={locationFields} onAction={() => handleEdit('contact')} />
          <DynamicSectionCard title="Emergency Contact" icon="tabler:phone" actionLabel="Edit" actionIcon="tabler:edit" fields={emergencyFields} onAction={() => handleEdit('contact')} />
          <DynamicSectionCard title="Physical Profile" icon="tabler:ruler-2" actionLabel="Edit" actionIcon="tabler:edit" fields={physicalFields} onAction={() => handleEdit('health')} />
          <DynamicSectionCard 
            title="Health Overview" 
            icon="tabler:activity-heartbeat" 
            actionLabel="Edit" 
            actionIcon="tabler:edit" 
            fields={healthFields}
            onAction={() => handleEdit('health')}
          />
        </AccordionSection>
      )}

      {hasMedical && (
        <AccordionSection 
          title="Medical Records" 
          expanded={expandedSections.medical} 
          onToggle={() => toggleSection('medical')}
        >
          <DynamicSectionCard title="Medical Records" icon="tabler:activity-heartbeat" actionLabel="Edit" actionIcon="tabler:edit" fields={medicalRecordFields} onAction={() => handleEdit('medical')} className="min-h-[320px]" />
          <DynamicSectionCard title="Uploaded Documents" icon="tabler:file-text" actionLabel="Upload" actionIcon="tabler:plus" documents={medicalDocuments} onAction={() => handleEdit('medical')} />
        </AccordionSection>
      )}

      {hasInsurance && (
        <AccordionSection 
          title="Insurance Information" 
          expanded={expandedSections.insurance} 
          onToggle={() => toggleSection('insurance')}
        >
          <DynamicSectionCard title="Insurance" icon="tabler:shield-plus" actionLabel="Edit" actionIcon="tabler:edit" fields={insuranceFields} onAction={() => handleEdit('insurance')} className="min-h-[320px]" />
          <DynamicSectionCard title="Uploaded Documents" icon="tabler:file-text" actionLabel="Upload" actionIcon="tabler:plus" documents={insuranceDocuments} onAction={() => handleEdit('insurance')} />
        </AccordionSection>
      )}

      <div className="mt-8 pt-8 border-t border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input 
              type="checkbox" 
              checked={data.isConfirmed || false}
              onChange={(e) => onChange && onChange({ ...data, isConfirmed: e.target.checked })}
              className="peer w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-primary checked:border-primary transition-colors cursor-pointer" 
            />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[90%]">
            I confirm that all the information and documents provided are accurate to the best of my knowledge. I agree to the <a href="#" className="text-primary font-medium underline">Terms & Conditions</a> and <a href="#" className="text-primary font-medium underline">Privacy Policy</a>, and I authorize MediConnect to securely use my information for healthcare services in accordance with applicable regulations.
          </p>
        </label>
      </div>

      {!isAllMinimized && (
        <button 
          onClick={handleFabClick}
          className="fixed bottom-24 lg:bottom-[160px] right-8 lg:right-12 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.2)] hover:opacity-95 transition-all duration-300 z-50 cursor-pointer hidden md:flex"
          aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          <Icon 
            icon={isAtBottom ? "tabler:chevron-up" : "tabler:chevron-down"} 
            width="28" 
            height="28" 
          />
        </button>
      )}
    </div>
  )
}

export default VerifyInformation
