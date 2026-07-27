import React, { useState, useEffect } from 'react';
import { 
  User, Calendar, Activity, Phone, MapPin, 
  Droplet, Users, Ruler, Scale, HeartPulse, 
  Coffee, Wind, Wine, Pill, Plus,
  FileText, Shield, Map, Mail
} from 'lucide-react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  selectPersonalInfo, 
  selectMedicalHistory, 
  selectInsuranceInfo, 
  selectHealthRecords 
} from '@/state-management/modules/Registrations/patientRegistration/patientRegistrationSelectors';
import { setActiveSection } from "@/state-management/modules/Registrations/SidebarRegistration/registrationActions";

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
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <FieldIcon size={18} strokeWidth={1.5} />
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
      <FileText size={18} strokeWidth={1.5} className="text-teal-600" />
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
            <div className="p-2 bg-gray-50 rounded-lg">
              <CardIcon size={18} className="text-gray-600" strokeWidth={1.5} />
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
  const basicDetailsFields = [
    { label: "Full Name", value: basic.fullName, icon: User },
    { label: "Date of Birth", value: basic.dob, icon: Calendar },
    { label: "Gender", value: basic.gender, icon: Users },
    { label: "Blood Group", value: basic.bloodGroup, icon: Droplet },
    { label: "Marital Status", value: basic.maritalStatus, icon: Users },
    { label: "Occupation", value: basic.occupation, icon: Users },
    { label: "Phone Number", value: phoneNumber, icon: Phone },
    { label: "Email Address", value: basic.email, icon: Mail }
  ].filter(f => !!f.value);

  const locationFields = [
    { label: "Nationality", value: contact.nationality || "Indian", icon: Map },
    { label: "State", value: contact.state, icon: MapPin },
    { label: "City", value: contact.city, icon: MapPin }
  ].filter(f => !!f.value);

  const emergencyFields = [
    { label: "Emergency Contact Relationship", value: contact.emergencyContacts || contact.EmRelationship, icon: User },
    { label: "Emergency Contact Name", value: contact.contactName, icon: User },
    { label: "Emergency Contact Phone Number", value: contact.phoneNumber || contact.EmContactNumber, icon: Phone }
  ].filter(f => !!f.value);

  const physicalFields = [
    { label: "Height", value: health.height ? `${health.height} ${health.heightUnit || "cm"}` : '', icon: Ruler },
    { label: "Weight", value: health.weight ? `${health.weight} ${health.weightUnit || "kg"}` : '', icon: Scale }
  ].filter(f => !!f.value);

  const healthFields = [
    { label: "Blood Pressure", value: health.bloodPressure, icon: HeartPulse },
    { label: "Blood Sugar", value: health.bloodSugar, icon: Droplet },
    { label: "Physical Activity Level", value: health.physicalActivityLevel || health.activityLevel, icon: Activity },
    { label: "Dietary Preference", value: health.dietaryPreference || health.dietPreference, icon: Coffee },
    { label: "Smoking Status", value: health.smokingStatus, icon: Wind },
    { label: "Alcohol Consumption", value: health.alcoholConsumption, icon: Wine }
  ].filter(f => !!f.value);

  const medicalRecordFields = [
    { label: "Allergies", value: (medical.allergyTags?.length ? medical.allergyTags.join(', ') : null) || medical.allergies, icon: Wind },
    { label: "Existing Conditions", value: (medical.conditionTags?.length ? medical.conditionTags.join(', ') : null) || medical.conditions || medical.existingConditions, icon: HeartPulse },
    { label: "Previous Surgeries", value: (medical.surgeryTags?.length ? medical.surgeryTags.join(', ') : null) || medical.surgeries || medical.previousSurgeries, icon: Activity },
    { label: "Current Medications", value: (medical.medicationTags?.length ? medical.medicationTags.join(', ') : null) || medical.medications || medical.currentMedications, icon: Pill }
  ].filter(f => !!f.value);

  const insuranceFields = [
    { label: "Insurance Type", value: insurance.insuranceType, icon: Shield },
    { label: "Insurance Provider", value: insurance.provider || insurance.insuranceProvider, icon: Shield },
    { label: "Insured Member Name", value: insurance.holderName || insurance.insuredMemberName, icon: User },
    { label: "Customer ID/Policy Number", value: insurance.policyNumber, icon: FileText }
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
          <DynamicSectionCard title="Basic Details" icon={User} actionLabel="Edit" actionIcon="tabler:edit" fields={basicDetailsFields} onAction={() => handleEdit('basic')} />
          <DynamicSectionCard title="Location" icon={MapPin} actionLabel="Edit" actionIcon="tabler:edit" fields={locationFields} onAction={() => handleEdit('contact')} />
          <DynamicSectionCard title="Emergency Contact" icon={Phone} actionLabel="Edit" actionIcon="tabler:edit" fields={emergencyFields} onAction={() => handleEdit('contact')} />
          <DynamicSectionCard title="Physical Profile" icon={Ruler} actionLabel="Edit" actionIcon="tabler:edit" fields={physicalFields} onAction={() => handleEdit('health')} />
          <DynamicSectionCard 
            title="Health Overview" 
            icon={Activity} 
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
          <DynamicSectionCard title="Medical Records" icon={Activity} actionLabel="Edit" actionIcon="tabler:edit" fields={medicalRecordFields} onAction={() => handleEdit('medical')} />
          <DynamicSectionCard title="Uploaded Documents" icon={FileText} actionLabel="Upload" actionIcon={Plus} documents={medicalDocuments} onAction={() => handleEdit('medical')} />
        </AccordionSection>
      )}

      {hasInsurance && (
        <AccordionSection 
          title="Insurance" 
          expanded={expandedSections.insurance} 
          onToggle={() => toggleSection('insurance')}
        >
          <DynamicSectionCard title="Insurance" icon={Shield} actionLabel="Edit" actionIcon="tabler:edit" fields={insuranceFields} onAction={() => handleEdit('insurance')} />
          <DynamicSectionCard title="Uploaded Documents" icon={FileText} actionLabel="Upload" actionIcon={Plus} documents={insuranceDocuments} onAction={() => handleEdit('insurance')} />
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
