import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import React from "react";

import TagAutocomplete from "@/shared/components/Registration/form/TagAutocomplete";
import DocumentDropzone from "@/shared/components/Registration/upload/DocumentDropzone";
import {
  DEFAULT_MEDICAL_CONDITIONS,
  DOCUMENT_UPLOAD_RULES,
  MEDICAL_CONDITION_FIELDS,
} from "@/shared/constants/RoleRegistration/medicalRecords";

const FIELD_ICONS = Object.freeze({
  allergies: WbSunnyOutlinedIcon,
  conditions: MedicalServicesOutlinedIcon,
  surgeries: LocalHospitalOutlinedIcon,
  medications: MedicationOutlinedIcon,
});

const normalizeMedicalConditions = (data = {}) => ({
  ...DEFAULT_MEDICAL_CONDITIONS,
  ...data,
  allergyTags: Array.isArray(data.allergyTags) ? data.allergyTags : [],
  conditionTags: Array.isArray(data.conditionTags) ? data.conditionTags : [],
  surgeryTags: Array.isArray(data.surgeryTags) ? data.surgeryTags : [],
  medicationTags: Array.isArray(data.medicationTags)
    ? data.medicationTags
    : [],
  supportingRecords: Array.isArray(data.supportingRecords)
    ? data.supportingRecords
    : [],
});

const MedicalConditions = ({ data, onChange, stepConfig }) => {
  const formData = normalizeMedicalConditions(data);

  const updateField = (fieldName, value) => {
    onChange?.({
      ...formData,
      [fieldName]: value,
    });
  };

  const updateSelectedValues = (field, selectedValues) => {
    const normalizedValues = [
      ...new Set(
        selectedValues
          .map((value) => String(value).trim())
          .filter(Boolean),
      ),
    ];

    onChange?.({
      ...formData,
      [field.key]: "",
      [field.selectedKey]: normalizedValues,
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <div className="mb-7">
        <h2 className="text-[16px] font-semibold leading-6 text-[#141414]">
          {stepConfig?.title || "Medical Conditions"}
        </h2>
        <p className="mt-1 max-w-[390px] text-[12px] leading-[18px] text-[#7A8496]">
          {stepConfig?.subtitle ||
            "Add your basic health information to help healthcare providers serve you better."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-7 lg:grid-cols-2 lg:gap-y-10">
        {MEDICAL_CONDITION_FIELDS.map((field) => {
          const IconComponent = FIELD_ICONS[field.iconKey];

          return (
            <div key={field.key} className="min-w-0">
              <label className="mb-2 block text-[14px] font-medium leading-5 text-[#141414]">
                {field.label}
              </label>
              <TagAutocomplete
                value={formData[field.selectedKey]}
                inputValue={formData[field.key]}
                options={field.suggestions}
                placeholder={field.placeholder}
                IconComponent={IconComponent}
                onChange={(selectedValues) =>
                  updateSelectedValues(field, selectedValues)
                }
                onInputChange={(inputValue) =>
                  updateField(field.key, inputValue)
                }
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 lg:mt-10">
        <DocumentDropzone
          label="Upload Files"
          instruction="Drag and drop your medical records here, or"
          infoTooltip="Upload prescriptions, laboratory reports, discharge summaries, or diagnostic reports."
          value={formData.supportingRecords}
          onChange={(supportingRecords) =>
            updateField("supportingRecords", supportingRecords)
          }
          rules={DOCUMENT_UPLOAD_RULES.medicalRecords}
        />
      </div>

      <div className="mt-8 flex max-w-[852px] items-start gap-3 rounded-lg bg-[#F1F9F7] px-4 py-3 text-[13px] leading-5 text-[#236C68] lg:mt-10">
        <LockOutlinedIcon sx={{ mt: 0.15, fontSize: 18, color: "#0D8B72" }} />
        <p>
          Your medical records are securely stored and used to provide better
          healthcare, faster diagnosis, and more personalized treatment.
        </p>
      </div>
    </section>
  );
};

export default MedicalConditions;
