import FormInput from "@/shared/components/Registration/form/FormInput";
import FormSelect from "@/shared/components/Registration/form/FormSelect";
import UnitToggle from "@/shared/components/Registration/form/UnitToggle";
import {
  activityLevels,
  alcoholOptions,
  dietaryPreferences,
  heightUnits,
  smokingStatuses,
  weightUnits,
} from "@/shared/constants/PatientRegistration/registrationConfig";
import {
  convertHeightValue,
  convertWeightValue,
} from "@/shared/utils/measurement";
import React from "react";

export const formatBloodPressureInput = (value, inputType = "") => {
  const normalizedValue = String(value ?? "").replace(/\s/g, "");

  if (normalizedValue.includes("/")) {
    const [systolic = "", diastolic = ""] = normalizedValue.split("/");
    return `${systolic.replace(/\D/g, "").slice(0, 3)}/${diastolic
      .replace(/\D/g, "")
      .slice(0, 3)}`;
  }

  const digits = normalizedValue.replace(/\D/g, "").slice(0, 6);
  if (inputType.startsWith("delete")) return digits;
  if (digits.length < 3) return digits;

  return `${digits.slice(0, 3)}/${digits.slice(3)}`;
};

const HealthOverview = ({
  data = {},
  onChange,
  errors = {},
  touched = {},
  onFieldBlur,
}) => {
  const updateField = (fieldName, value) => {
    onChange?.({
      ...data,
      [fieldName]: value,
    });
  };
  const updateFields = (updates) => {
    onChange?.({
      ...data,
      ...updates,
    });
  };
  const heightUnit = data.heightUnit || "cm";
  const weightUnit = data.weightUnit || "kg";
  const handleHeightUnitChange = (nextUnit) => {
    updateFields({
      height: convertHeightValue(data.height, heightUnit, nextUnit),
      heightUnit: nextUnit,
    });
  };
  const handleWeightUnitChange = (nextUnit) => {
    updateFields({
      weight: convertWeightValue(data.weight, weightUnit, nextUnit),
      weightUnit: nextUnit,
    });
  };
  const handleBloodPressureChange = (event) => {
    updateField(
      "bloodPressure",
      formatBloodPressureInput(
        event.target.value,
        event.nativeEvent?.inputType,
      ),
    );
  };
  const getValidationProps = (fieldName) => ({
    error: errors[fieldName] || "",
    showError: Boolean(touched[fieldName]),
    onBlur: () => onFieldBlur?.(fieldName),
  });

  return (
    <div className="space-y-8">
      <div className="w-82">
        <h2 className="text-sm font-medium text-text-heading">
          Health Overview
        </h2>
        <p className="mt-1 text-xs font-Satoshi font-normal text-[#6B7280]">
          Add your basic health information to help us provide more personalized
          care and better health recommendations. you can skip any fields if you're unsure.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-9 gap-y-8">
        {/* Height */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Height <span className="required-asterisk">*</span>
          </label>
          <FormInput
            name="height"
            type={heightUnit === "cm" ? "number" : "text"}
            inputMode={heightUnit === "cm" ? "decimal" : "text"}
            value={data.height || ""}
            placeholder={
              heightUnit === "cm" ? "Enter your height" : `e.g., 5' 10"`
            }
            onChange={(event) => updateField("height", event.target.value)}
            suffix={
              <UnitToggle
                value={heightUnit}
                options={heightUnits}
                onChange={handleHeightUnitChange}
              />
            }
            icon="tabler:ruler-measure-2"
            {...getValidationProps("height")}
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Weight <span className="required-asterisk">*</span>
          </label>
          <FormInput
            name="weight"
            type="number"
            value={data.weight || ""}
            placeholder="Enter your weight"
            onChange={(event) => updateField("weight", event.target.value)}
            suffix={
              <UnitToggle
                value={weightUnit}
                options={weightUnits}
                onChange={handleWeightUnitChange}
              />
            }
            icon="tabler:scale-outline"
            {...getValidationProps("weight")}
          />
        </div>

        {/* Blood Pressure */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Blood Pressure (If Known)
          </label>
          <FormInput
            name="bloodPressure"
            value={data.bloodPressure || ""}
            placeholder="120/80"
            inputMode="numeric"
            maxLength={7}
            onChange={handleBloodPressureChange}
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                mmHg
              </span>
            }
            icon="tabler:heartbeat"
            {...getValidationProps("bloodPressure")}
          />
        </div>

        {/* Blood Sugar */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Blood Sugar (If Known)
          </label>
          <FormInput
            name="bloodSugar"
            type="number"
            value={data.bloodSugar || ""}
            placeholder="95"
            onChange={(event) => updateField("bloodSugar", event.target.value)}
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                mg/dL
              </span>
            }
            icon="tabler:droplet"
            {...getValidationProps("bloodSugar")}
          />
        </div>

        {/* Physical Activity Level */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Physical Activity Level 
          </label>
          <FormSelect
            name="physicalActivityLevel"
            value={data.physicalActivityLevel || ""}
            options={activityLevels}
            placeholder="Select your physical activity level"
            icon="tabler:run"
            onSelect={updateField}
          />
        </div>

        {/* Dietary preference */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Dietary Preference 
          </label>
          <FormSelect
            name="dietaryPreference"
            value={data.dietaryPreference || ""}
            options={dietaryPreferences}
            placeholder="Select your dietary preference"
            icon="tabler:chef-hat"
            onSelect={updateField}
          />
        </div>

        {/* Smoking Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Smoking Status
          </label>
          <FormSelect
            name="smokingStatus"
            value={data.smokingStatus || ""}
            options={smokingStatuses}
            placeholder="Select your smoking status"
            icon="tabler:smoking"
            onSelect={updateField}
          />
        </div>

        {/* Alcohol consumption */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Alcohol consumption
          </label>
          <FormSelect
            name="alcoholConsumption"
            value={data.alcoholConsumption || ""}
            options={alcoholOptions}
            placeholder="Select your alcohol consumption"
            icon="tabler:glass-full"
            onSelect={updateField}
          />
        </div>
      </div>
    </div>
  );
};

export default HealthOverview;


