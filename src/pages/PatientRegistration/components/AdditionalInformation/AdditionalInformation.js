import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FormInput from "@/shared/components/PatientRegistration/form/FormInput";
import FormSelect from "@/shared/components/PatientRegistration/form/FormSelect";
import UnitToggle from "@/shared/components/PatientRegistration/form/UnitToggle";
import {
  activityLevels,
  alcoholOptions,
  dietaryPreferences,
  heightUnits,
  relationships,
  smokingStatuses,
  weightUnits,
} from "@/shared/constants/PatientRegistration/registrationConfig.js";

import {
  setActiveStep,
  setAdditionalInfo,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectAdditionalInfo } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import phone from "@assets/patientRegistration/phone.svg";

// ── Validation ────────────────────────────────────────────────────────────────
const validateField = (name, value, data = {}) => {
  switch (name) {
    case "height": {
      if (!value && value !== 0) return "";
      const num = parseFloat(value);
      if (isNaN(num)) return "Please enter a valid height.";
      if (data.heightUnit === "cm" && (num < 50 || num > 250))
        return "Height should be between 50 cm and 250 cm.";
      if (data.heightUnit === "ft" && (num < 1 || num > 9))
        return "Height should be between 1 ft and 9 ft.";
      return "";
    }
    case "weight": {
      if (!value && value !== 0) return "";
      const num = parseFloat(value);
      if (isNaN(num)) return "Please enter a valid weight.";
      if (data.weightUnit === "kg" && (num < 2 || num > 500))
        return "Weight should be between 2 kg and 500 kg.";
      if (data.weightUnit === "lb" && (num < 5 || num > 1100))
        return "Weight should be between 5 lb and 1100 lb.";
      return "";
    }
    case "bloodPressure":
      if (!value) return "";
      if (!/^\d{2,3}\/\d{2,3}$/.test(value))
        return "Enter blood pressure in the format: 120/80 mmHg.";
      return "";
    case "bloodSugar": {
      if (!value) return "";
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) return "Blood sugar cannot be negative.";
      return "";
    }
    case "emergencyRelationship":
      return !value ? "Please select your relationship with the emergency contact." : "";
    case "emergencyContact":
      if (!value?.trim()) return "Please enter an emergency contact number.";
      if (!/^[+]?[\d\s\-()]{7,15}$/.test(value.trim())) return "Enter a valid contact number.";
      return "";
    default:
      return "";
  }
};

const VALIDATED_FIELDS = [
  "height", "weight", "bloodPressure", "bloodSugar",
  "emergencyRelationship", "emergencyContact",
];

// ── AdditionalInformation ──────────────────────────────────────────────────────
const AdditionalInformation = () => {
  const dispatch = useDispatch();
  const saved = useSelector(selectAdditionalInfo);

  const [formData, setFormData] = useState(
    saved || {
      height: "",
      heightUnit: "cm",
      weight: "",
      weightUnit: "kg",
      bloodPressure: "",
      bloodSugar: "",
      activityLevel: "",
      dietaryPreference: "",
      smokingStatus: "",
      alcoholConsumption: "",
      emergencyRelationship: "",
      emergencyContact: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const heightInputRef = useRef(null);
  const weightInputRef = useRef(null);

  const showError = (name) => !!touched[name];

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value, updated) }));
    }
  };

  const handleBlur = (name, value) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, formData) }));
  };

  const handleSelectChange = (name, value) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value, updated) }));
  };

  const handleSelectBlur = (name) => {
    if (!formData[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateField(name, formData[name], formData) }));
    }
  };

  const handleUnitChange = (unitField, unit) => {
    const updated = { ...formData, [unitField]: unit };
    setFormData(updated);
    const valueField = unitField === "heightUnit" ? "height" : "weight";
    if (touched[valueField]) {
      setErrors((prev) => ({
        ...prev,
        [valueField]: validateField(valueField, formData[valueField], updated),
      }));
    }
  };

  // ── Submit / Navigation ───────────────────────────────────────────────────────
  const handleNext = () => {
    const newErrors = {};
    VALIDATED_FIELDS.forEach((f) => { newErrors[f] = validateField(f, formData[f], formData); });
    if (Object.values(newErrors).some((e) => e !== "")) return;

    dispatch(setAdditionalInfo(formData));
    dispatch(setActiveStep("medical"));
  };

  const handleSkip = () => dispatch(setActiveStep("review"));
  const handleGoBack = () => dispatch(setActiveStep("personal"));

  const isFormValid =
    formData.emergencyRelationship?.trim() && formData.emergencyContact?.trim();

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 overflow-visible">

        {/* Height */}
        <div>
          <label className={labelClass}>Height</label>
          <div className="relative" ref={heightInputRef}>
            <FormInput
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              onBlur={(e) => handleBlur("height", e.target.value)}
              placeholder="Enter your height"
              error={errors.height}
              showError={showError("height")}
              suffix={
                <UnitToggle
                  value={formData.heightUnit}
                  options={heightUnits}
                  onChange={(unit) => handleUnitChange("heightUnit", unit)}
                />
              }
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className={labelClass}>Weight</label>
          <div className="relative" ref={weightInputRef}>
            <FormInput
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              onBlur={(e) => handleBlur("weight", e.target.value)}
              placeholder="Enter your weight"
              error={errors.weight}
              showError={showError("weight")}
              suffix={
                <UnitToggle
                  value={formData.weightUnit}
                  options={weightUnits}
                  onChange={(unit) => handleUnitChange("weightUnit", unit)}
                />
              }
            />
          </div>
        </div>

        {/* Blood Pressure */}
        <div>
          <label className={labelClass}>Blood Pressure (If Known)</label>
          <FormInput
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            onBlur={(e) => handleBlur("bloodPressure", e.target.value)}
            placeholder="120 / 80"
            error={errors.bloodPressure}
            showError={showError("bloodPressure")}
            suffix={<span className="text-xs text-[#666666] pointer-events-none">mmHg</span>}
          />
        </div>

        {/* Blood Sugar */}
        <div>
          <label className={labelClass}>Blood Sugar (If Known)</label>
          <FormInput
            name="bloodSugar"
            type="number"
            value={formData.bloodSugar}
            onChange={handleChange}
            onBlur={(e) => handleBlur("bloodSugar", e.target.value)}
            placeholder="95"
            error={errors.bloodSugar}
            showError={showError("bloodSugar")}
            suffix={<span className="text-xs text-[#666666] pointer-events-none">mg/dL</span>}
          />
        </div>

        {/* Physical Activity Level */}
        <div>
          <label className={labelClass}>Physical Activity Level</label>
          <FormSelect
            name="activityLevel"
            value={formData.activityLevel}
            options={activityLevels}
            placeholder="Select activity level"
            searchPlaceholder="Search activity level"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.activityLevel}
            showError={showError("activityLevel")}
          />
        </div>

        {/* Dietary Preference */}
        <div>
          <label className={labelClass}>Dietary Preference</label>
          <FormSelect
            name="dietaryPreference"
            value={formData.dietaryPreference}
            options={dietaryPreferences}
            placeholder="Select dietary preference"
            searchPlaceholder="Search preference"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.dietaryPreference}
            showError={showError("dietaryPreference")}
          />
        </div>

        {/* Smoking Status */}
        <div>
          <label className={labelClass}>Smoking Status</label>
          <FormSelect
            name="smokingStatus"
            value={formData.smokingStatus}
            options={smokingStatuses}
            placeholder="Select smoking status"
            searchPlaceholder="Search status"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.smokingStatus}
            showError={showError("smokingStatus")}
          />
        </div>

        {/* Alcohol Consumption */}
        <div>
          <label className={labelClass}>Alcohol Consumption</label>
          <FormSelect
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            options={alcoholOptions}
            placeholder="Select alcohol consumption"
            searchPlaceholder="Search option"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.alcoholConsumption}
            showError={showError("alcoholConsumption")}
          />
        </div>

        {/* Emergency Contact Relationship */}
        <div>
          <label className={labelClass}>
            Emergency Contact Relationship <span className="text-[#EF4444]">*</span>
          </label>
          <FormSelect
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            options={relationships}
            placeholder="Select relationship"
            searchPlaceholder="Search relationship"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
            error={errors.emergencyRelationship}
            showError={showError("emergencyRelationship")}
          />
        </div>

        {/* Emergency Contact Number */}
        <div>
          <label className={labelClass}>
            Emergency Contact Number <span className="text-[#EF4444]">*</span>
          </label>
          <FormInput
            name="emergencyContact"
            type="tel"
            value={formData.emergencyContact}
            onChange={handleChange}
            onBlur={(e) => handleBlur("emergencyContact", e.target.value)}
            placeholder="+91 98765 43210"
            icon={phone}
            iconAlt="phone"
            error={errors.emergencyContact}
            showError={showError("emergencyContact")}
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-16 md:mt-30.5 flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between pb-10 md:pb-0">
        <ActionButtons
          skip={{ label: "Skip for now", onClick: handleSkip }}
          back={{ label: "Go Back", onClick: handleGoBack }}
          next={{
            label: "Add Medical History",
            onClick: handleNext,
            disabled: !isFormValid,
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
