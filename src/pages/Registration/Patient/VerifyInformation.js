import React, { useState } from 'react';
import { 
  User, Calendar, Activity, Phone, MapPin, 
  Droplet, Users, Ruler, Scale, HeartPulse, 
  Coffee, Wind, Wine, Pill, Plus,
  FileText, Shield, Map, ArrowUp
} from 'lucide-react';
import { Icon } from '@iconify/react';

const AccordionSection = ({ title, children, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <div className="mb-10">
      <button 
        type="button"
        onClick={() => setExpanded(!expanded)}
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
  <div className={`flex flex-col gap-1 ${fullWidth ? 'col-span-2' : ''}`}>
    <div className="flex items-center gap-1.5 text-gray-400">
      {FieldIcon && <FieldIcon size={13} strokeWidth={2} />}
      <span className="text-[11px] font-medium text-gray-400">{label}</span>
    </div>
    <span className="text-[13px] font-semibold text-gray-800">{value}</span>
  </div>
);

const DocumentItem = ({ filename, type, size }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">
      <FileText size={18} strokeWidth={1.5} className="text-teal-600" />
    </div>
    <div className="flex flex-col">
      <span className="text-[13px] font-semibold text-gray-800 break-all">{filename}</span>
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
  fieldsGridClass = "grid grid-cols-2 gap-y-6 gap-x-4" 
}) => {
  return (
    <div className={`p-5 rounded-2xl border border-gray-100 shadow-sm bg-white flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {CardIcon && <CardIcon size={18} className="text-gray-500" strokeWidth={1.5} />}
          <h4 className="text-[13px] font-semibold text-gray-800">{title}</h4>
        </div>
        <button 
          type="button"
          className="flex items-center gap-1.5 text-[13px] font-semibold bg-secondary text-primary px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
        >
          {ActionIcon && (
            typeof ActionIcon === 'string' ? 
              <Icon icon={ActionIcon} width="16" height="16" /> :
              <ActionIcon size={14} strokeWidth={2.5} />
          )}
          {actionLabel}
        </button>
      </div>
      
      {(fields.length > 0 || documents.length > 0 || children) && (
        <div className={fieldsGridClass}>
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

const VerifyInformation = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const basicDetailsFields = [
    { label: "Full Name", value: "Deepika K", icon: User },
    { label: "Date of Birth", value: "1 February 1960", icon: Calendar },
    { label: "Gender", value: "F", icon: Users },
    { label: "Blood Group", value: "AB +ve", icon: Droplet },
    { label: "Marital Status", value: "Single", icon: Users },
    { label: "Phone Number", value: "+91 9876 543 210", icon: Phone }
  ];

  const locationFields = [
    { label: "Nationality", value: "India", icon: Map },
    { label: "State", value: "Hyderabad", icon: MapPin },
    { label: "City", value: "Jadcherla", icon: MapPin }
  ];

  const emergencyFields = [
    { label: "Emergency Contact Relationship", value: "Spouse", icon: User },
    { label: "Emergency Contact Phone Number", value: "+91 912 222 4567", icon: Phone }
  ];

  const physicalFields = [
    { label: "Height", value: "162 cm", icon: Ruler },
    { label: "Weight", value: "165 kg", icon: Scale }
  ];

  const healthFields = [
    { label: "Blood Pressure", value: "120/80 mmHg", icon: HeartPulse },
    { label: "Blood Sugar", value: "70/100 mg/dl", icon: Droplet },
    { label: "Physical Activity Level", value: "Lightly Active", icon: Activity },
    { label: "Dietary Preference", value: "Non-Vegetarian", icon: Coffee },
    { label: "Smoking Status", value: "Regular Smoker", icon: Wind },
    { label: "Alcohol Consumption", value: "Weekly", icon: Wine }
  ];

  const medicalRecordFields = [
    { label: "Allergies", value: "Peanuts, Seafood", icon: Wind },
    { label: "Existing Conditions", value: "Asthma, Diabetes (Type 2)", icon: HeartPulse },
    { label: "Previous Surgeries", value: "Appendectomy, Cataract Surgery", icon: Activity },
    { label: "Current Medications", value: "Metformin 500 mg, Insulin Glargine", icon: Pill }
  ];

  const insuranceFields = [
    { label: "Insurance Type", value: "Private", icon: Shield },
    { label: "Insurance Provider", value: "Star Health Insurance", icon: Shield },
    { label: "Insured Member Name", value: "Deepika K", icon: User },
    { label: "Customer ID/Policy Number", value: "12239082-0", icon: FileText }
  ];

  const medicalDocuments = [
    { filename: "Blood_Test_Report.pdf", type: "pdf", size: "15 kb" },
    { filename: "Liver_Function_Test.pdf", type: "pdf", size: "12 kb" },
    { filename: "Blood_Test_Report.pdf", type: "pdf", size: "15 kb" },
    { filename: "Doctor_Prescription.pdf", type: "pdf", size: "15 kb" }
  ];

  const insuranceDocuments = [
    { filename: "Insurance_Card_Front.pdf", type: "pdf", size: "12 kb" },
    { filename: "Insurance_Card_Back.pdf", type: "pdf", size: "12 kb" }
  ];

  return (
    <div className="w-full max-w-4xl pb-24 relative">
      <AccordionSection title="Personal Information">
        <DynamicSectionCard title="Basic Details" icon={User} actionLabel="Edit" actionIcon="tabler:edit" fields={basicDetailsFields} />
        <DynamicSectionCard title="Location" icon={MapPin} actionLabel="Edit" actionIcon="tabler:edit" fields={locationFields} />
        <DynamicSectionCard title="Emergency Contact" icon={Phone} actionLabel="Edit" actionIcon="tabler:edit" fields={emergencyFields} />
        <DynamicSectionCard title="Physical Profile" icon={Ruler} actionLabel="Edit" actionIcon="tabler:edit" fields={physicalFields} />
        <DynamicSectionCard 
          title="Health Overview" 
          icon={Activity} 
          actionLabel="Edit" 
          actionIcon="tabler:edit" 
          fields={healthFields}
          className="col-span-1 lg:col-span-2"
          fieldsGridClass="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 w-full"
        />
      </AccordionSection>

      <AccordionSection title="Medical Records">
        <DynamicSectionCard title="Medical Records" icon={Activity} actionLabel="Edit" actionIcon="tabler:edit" fields={medicalRecordFields} />
        <DynamicSectionCard title="Uploaded Documents" icon={FileText} actionLabel="Upload" actionIcon={Plus} documents={medicalDocuments} />
      </AccordionSection>

      <AccordionSection title="Insurance">
        <DynamicSectionCard title="Insurance" icon={Shield} actionLabel="Edit" actionIcon="tabler:edit" fields={insuranceFields} />
        <DynamicSectionCard title="Uploaded Documents" icon={FileText} actionLabel="Upload" actionIcon={Plus} documents={insuranceDocuments} />
      </AccordionSection>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center mt-0.5">
            <input type="checkbox" className="peer w-5 h-5 border-2 border-gray-300 rounded appearance-none checked:bg-teal-600 checked:border-teal-600 transition-colors cursor-pointer" />
            <svg className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-[90%]">
            I confirm that all the information and documents provided are accurate to the best of my knowledge. I agree to the <a href="#" className="text-teal-600 font-medium hover:underline">Terms & Conditions</a> and <a href="#" className="text-teal-600 font-medium hover:underline">Privacy Policy</a>, and I authorize MediConnect to securely use my information for healthcare services in accordance with applicable regulations.
          </p>
        </label>
      </div>

      <button 
        onClick={scrollToTop}
        className="fixed bottom-24 right-8 w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-teal-700 transition-colors z-50 cursor-pointer hidden md:flex"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  )
}

export default VerifyInformation