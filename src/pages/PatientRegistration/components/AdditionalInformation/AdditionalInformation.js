import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FormInput from "@/shared/components/PatientRegistration/form/FormInput";
import FormSelect from "@/shared/components/PatientRegistration/form/FormSelect";
import UnitToggle from "@/shared/components/PatientRegistration/form/UnitToggle";
import { isValid, validateAdditionalInfo, validators } from "@/shared/constants/PatientRegistration/validation";
import { setActiveStep, setAdditionalInfo, } from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { selectAdditionalInfo } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activityLevels, alcoholOptions, dietaryPreferences, heightUnits, relationships, smokingStatuses,
  weightUnits,
} from "../../../../shared/constants/PatientRegistration/registrationConfig";

// ── AdditionalInformation ──────────────────────────────────────────────────────
const AdditionalInformation = () => {

  const dispatch = useDispatch();
  const savedAdditionalInformation = useSelector(selectAdditionalInfo);

  const normalizeAdditionalInformation = (data) => {
  const defaultData = {
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
  };

  if (!data) {
    return defaultData;
  }

  return {
    ...defaultData,
    ...data,
  };
};

const [formData, setFormData] = useState(() =>
  normalizeAdditionalInformation(savedAdditionalInformation)
);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const heightInputRef = useRef(null);
  const weightInputRef = useRef(null);

  const showError = (name) => !!touched[name];

  // ── Handlers ─────────────────────────────────────────────────────────────────
 const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedValue = value;

  if (name === "emergencyContact") {
    updatedValue = value.replace(/\D/g, "").slice(0, 10);
  }

  const updated = {
    ...formData,
    [name]: updatedValue,
  };

  setFormData(updated);

  if (touched[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "height" || name === "weight"
          ? validators[name](updatedValue, updated)
          : validators[name]?.(updatedValue) || "",
    }));
  }
};

const handleBlur = (name, value) => {
  setTouched((prev) => ({ ...prev, [name]: true }));

  setErrors((prev) => ({
    ...prev,
    [name]:
      name === "height" || name === "weight"
        ? validators[name](value, formData)
        : validators[name]?.(value) || "",
  }));
};

const handleSelectChange = (name, value) => {
  const updated = {
    ...formData,
    [name]: value,
  };

  setFormData(updated);
  setTouched((prev) => ({ ...prev, [name]: true }));

  setErrors((prev) => ({
    ...prev,
    [name]:
      name === "height" || name === "weight"
        ? validators[name](value, updated)
        : validators[name]?.(value) || "",
  }));
};

const handleSelectBlur = (name) => {
  setTouched((prev) => ({ ...prev, [name]: true }));

  setErrors((prev) => ({
    ...prev,
    [name]:
      name === "height" || name === "weight"
        ? validators[name](formData[name], formData)
        : validators[name]?.(formData[name]) || "",
  }));
};

const handleUnitChange = (unitField, unit) => {
  const updated = {
    ...formData,
    [unitField]: unit,
  };

  setFormData(updated);

  const valueField =
    unitField === "heightUnit" ? "height" : "weight";

  if (touched[valueField]) {
    setErrors((prev) => ({
      ...prev,
      [valueField]: validators[valueField](
        updated[valueField],
        updated
      ),
    }));
  }
};

  const saveAdditionalInformation = () => {
    dispatch(setAdditionalInfo(formData));
  };

  const handleNext = () => {
     const newErrors = validateAdditionalInfo(formData);
    
        setErrors(newErrors);
    
        // Mark all fields as touched
        setTouched(
          Object.keys(newErrors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        );
    
        if (!isValid(newErrors)) return;

       saveAdditionalInformation();
       dispatch(setActiveStep("medical"));
  };

  const handleGoBack = () => {
    saveAdditionalInformation();
    dispatch(setActiveStep("personal"));
  };

  const handleSkip = () => dispatch(setActiveStep("medical"));


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
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                mmHg
              </span>
            }
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
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                mg/dL
              </span>
            }
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
          <label className={labelClass}>Emergency Contact Relationship </label>
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
          <label className={labelClass}>Emergency Contact Number</label>

          <FormInput
            name="emergencyContact"
            type="tel"
            value={formData.emergencyContact}
            onChange={handleChange}
            onBlur={(e) => handleBlur("emergencyContact", e.target.value)}
            placeholder="9876543210"
            error={errors.emergencyContact}
            showError={showError("emergencyContact")}
            prefix={<span>+91</span>}
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-16 md:mt-28 flex flex-col-reverse sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between pb-10 md:pb-10">
        <ActionButtons
          skip={{
            label: "Skip for now",
            onClick: handleSkip,
          }}
          back={{
            label: "Go Back",
            onClick: handleGoBack,
          }}
          next={{
            label: "Add Medical History",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
