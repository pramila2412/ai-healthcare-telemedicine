import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FormTextArea from "@/shared/components/PatientRegistration/form/FormTextArea";

import {
  setActiveStep,
  setMedicalHistory,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectMedicalHistory } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const MedicalHistory = () => {
  const dispatch = useDispatch();
  const saved = useSelector(selectMedicalHistory);

  const [formData, setFormData] = useState(
    saved || {
      allergies: "",
      currentMedications: "",
      existingConditions: "",
      previousSurgeries: "",
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const saveData = () => {
    dispatch(setMedicalHistory(formData));
  };

  const handleNext = () => {
    saveData();
    dispatch(setActiveStep("insurance"));
  };

  const handleBack = () => {
    saveData();
    dispatch(setActiveStep("additional"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("insurance"));
  };

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        <div>
          <label className={labelClass}>Allergies</label>
          <FormTextArea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="List any allergies you have (if any)"
            rows={4}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className={labelClass}>Current Medications</label>
          <FormTextArea
            name="currentMedications"
            value={formData.currentMedications}
            onChange={handleChange}
            placeholder="List your current medications with dosage"
            rows={4}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className={labelClass}>Existing Conditions</label>
          <FormTextArea
            name="existingConditions"
            value={formData.existingConditions}
            onChange={handleChange}
            placeholder="Enter any Conditions (e.g., diabetes, hypertension, asthma, etc.)"
            rows={4}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <label className={labelClass}>Previous Surgeries</label>
          <FormTextArea
            name="previousSurgeries"
            value={formData.previousSurgeries}
            onChange={handleChange}
            placeholder="Enter details of any past surgeries (if any)"
            rows={4}
            className="min-h-[120px]"
          />
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between">
        <ActionButtons
          skip={{
            label: "Skip for now",
            onClick: handleSkip,
          }}
          back={{
            label: "Go Back",
            onClick: handleBack,
          }}
          next={{
            label: "Add Insurance Information",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default MedicalHistory;