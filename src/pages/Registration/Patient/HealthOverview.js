import FormInput from "@/shared/components/Registration/form/FormInput";
import FormSelect from "@/shared/components/Registration/form/FormSelect";
import {
  activityLevels,
  alcoholOptions,
  dietaryPreferences,
  smokingStatuses,
} from "@/shared/constants/PatientRegistration/registrationConfig";
import React from "react";

const HealthOverview = ({ data = {}, onChange }) => {
  const updateField = (fieldName, value) => {
    onChange?.({
      ...data,
      [fieldName]: value,
    });
  };

  return (
    <div className="space-y-8">
      <div className="w-82">
        <h2 className="text-sm font-medium text-text-heading">
          Health Overview
        </h2>
        <p className="mt-1 text-xs font-TypeFace font-normal text-[#6B7280]">
          Add your basic health information to help us provide more personalized
          care and better health recommendation. You can skip any field if
          you're unsure
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-9 gap-y-8">
        {/* Height */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Height <span className="text-red-500">*</span>
          </label>
          <FormInput
            name="height"
            type="number"
            value={data.height || ""}
            placeholder="Enter your height"
            onChange={(event) => updateField("height", event.target.value)}
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                cm
              </span>
            }
            icon="tabler:ruler-measure-2"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Weight <span className="text-red-500">*</span>
          </label>
          <FormInput
            name="weight"
            type="number"
            value={data.weight || ""}
            placeholder="Enter your weight"
            onChange={(event) => updateField("weight", event.target.value)}
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                kg
              </span>
            }
            icon="tabler:scale-outline"
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
            placeholder="120 / 80"
            onChange={(event) =>
              updateField("bloodPressure", event.target.value)
            }
            suffix={
              <span className="text-xs text-[#666666] pointer-events-none">
                mmHg
              </span>
            }
            icon="tabler:heartbeat"
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
