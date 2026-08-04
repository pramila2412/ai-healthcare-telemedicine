import { Icon } from "@iconify/react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useMemo, useState } from "react";

import FormInput from "@/shared/components/Registration/form/FormInput";
import FormSelect from "@/shared/components/Registration/form/FormSelect";
import {
  CheckboxCheckedIcon,
  CheckboxUncheckedIcon,
} from "@/shared/components/Registration/form/IconifyCheckboxIcons";
import DocumentDropzone from "@/shared/components/Registration/upload/DocumentDropzone";
import UploadSuccessSnackbar from "@/shared/components/Registration/upload/UploadSuccessSnackbar";
import InsuranceInformationPopup from "@/shared/components/Popup/InsuranceInformationPopup";
import {
  DEFAULT_INSURANCE_INFORMATION,
  DOCUMENT_UPLOAD_RULES,
  INSURANCE_PROVIDER_CONFIG,
  INSURANCE_TYPES,
} from "@/shared/constants/RoleRegistration/medicalRecords";

const normalizeInsuranceType = (insuranceType = "") => {
  const normalizedValue = insuranceType.toLowerCase();
  if (normalizedValue.includes("government")) return "Government";
  if (normalizedValue.includes("no insurance")) return "No insurance";
  if (
    normalizedValue.includes("private") ||
    normalizedValue.includes("personal")
  ) {
    return "Private";
  }
  return insuranceType;
};

const normalizeInsuranceInformation = (data = {}) => ({
  ...DEFAULT_INSURANCE_INFORMATION,
  ...data,
  insuranceType: normalizeInsuranceType(data.insuranceType),
  provider: data.provider || data.insuranceProvider || "",
  holderName: data.holderName || data.insuranceHolderName || "",
  documents: Array.isArray(data.documents)
    ? data.documents
    : Array.isArray(data.insuranceCards)
      ? data.insuranceCards
      : [],
  confirmation: Boolean(data.confirmation),
});

const Insurance = ({
  data,
  onChange,
  stepConfig,
  errors = {},
  touched = {},
  onFieldBlur,
}) => {
  const [isInformationPopupOpen, setIsInformationPopupOpen] = useState(false);
  const [isUploadSnackbarOpen, setIsUploadSnackbarOpen] = useState(false);
  const formData = normalizeInsuranceInformation(data);

  const providerConfig = useMemo(
    () =>
      INSURANCE_PROVIDER_CONFIG[formData.insuranceType] || {
        label: "Insurance Provider",
        placeholder: "Select your insurance provider",
        options: [],
      },
    [formData.insuranceType],
  );

  const updateField = (fieldName, value) => {
    onChange?.({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleInsuranceTypeChange = (insuranceType) => {
    onChange?.({
      ...DEFAULT_INSURANCE_INFORMATION,
      insuranceType,
    });
  };

  const requiresInsuranceDetails =
    Boolean(formData.insuranceType) &&
    formData.insuranceType !== "No insurance";
  const getValidationProps = (fieldName) => ({
    error: errors[fieldName] || "",
    showError: Boolean(touched[fieldName]),
    onBlur: () => onFieldBlur?.(fieldName),
  });

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      <div className="mb-7">
        <h2 className="text-[16px] font-semibold leading-6 text-[#141414]">
          {stepConfig?.title || "Insurance"}
        </h2>
        <p className="mt-1 max-w-[390px] text-[12px] leading-[18px] text-[#7A8496]">
          {stepConfig?.subtitle ||
            "Add your insurance information for seamless coverage and claims processing."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-7 lg:grid-cols-2 lg:gap-y-10">
        <div className="min-w-0">
          <label className="mb-2 block text-[14px] font-medium text-[#141414]">
            Insurance Type
          </label>
          <FormSelect
            name="insuranceType"
            value={formData.insuranceType}
            options={INSURANCE_TYPES}
            placeholder="Select your insurance type"
            searchPlaceholder="Search insurance type"
            className="!h-14 !text-sm"
            icon="tabler:building-bank"
            onSelect={(_name, value) => handleInsuranceTypeChange(value)}
          />
        </div>

        {requiresInsuranceDetails && (
          <div className="min-w-0">
            <label className="mb-2 block text-[14px] font-medium text-[#141414]">
              {providerConfig.label} <span className="required-asterisk">*</span>
            </label>
            <FormSelect
              name="provider"
              value={formData.provider}
              options={providerConfig.options}
              placeholder={providerConfig.placeholder}
              searchPlaceholder="Search provider"
              className="!h-14 !text-sm"
              icon="tabler:shield-plus"
              onSelect={(_name, value) => updateField("provider", value)}
              {...getValidationProps("provider")}
            />
          </div>
        )}

        {requiresInsuranceDetails && (
          <>
            <div className="min-w-0">
              <label className="mb-2 block text-[14px] font-medium text-[#141414]">
                Insurance Holder name <span className="required-asterisk">*</span>
              </label>
              <FormInput
                name="holderName"
                value={formData.holderName}
                placeholder="Enter insurance holder name"
                className="!h-14 !text-sm"
                icon="tabler:user"
                onChange={(event) =>
                  updateField("holderName", event.target.value)
                }
                {...getValidationProps("holderName")}
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-[14px] font-medium text-[#141414]">
                Customer ID / Policy Number{" "}
                <span className="required-asterisk">*</span>
              </label>
              <FormInput
                name="policyNumber"
                value={formData.policyNumber}
                placeholder="Enter Customer ID or Policy Number"
                className="!h-14 !text-sm"
                icon="tabler:credit-card"
                onChange={(event) =>
                  updateField("policyNumber", event.target.value)
                }
                {...getValidationProps("policyNumber")}
              />
            </div>
          </>
        )}
      </div>

      {requiresInsuranceDetails && (
        <>
          <div className="mt-8 lg:mt-10">
            <DocumentDropzone
              name="documents"
              label="Upload Insurance Documents"
              required
              instruction="Drag and drop your insurance card or policy document here, or"
              infoTooltip="View insurance card upload guidance"
              infoLabel="What to upload?"
              onInfoClick={() => setIsInformationPopupOpen(true)}
              value={formData.documents}
              onChange={(documents) => updateField("documents", documents)}
              onUploadSuccess={() => setIsUploadSnackbarOpen(true)}
              rules={DOCUMENT_UPLOAD_RULES.insuranceDocuments}
              {...getValidationProps("documents")}
            />
          </div>

          <FormControlLabel
            className="mt-5 items-start"
            control={
              <Checkbox
                name="confirmation"
                checked={formData.confirmation}
                onChange={(event) =>
                  updateField("confirmation", event.target.checked)
                }
                onBlur={() => onFieldBlur?.("confirmation")}
                icon={<CheckboxUncheckedIcon />}
                checkedIcon={<CheckboxCheckedIcon />}
                sx={{
                  mt: -0.75,
                  color: "#98A2B3",
                  "&.Mui-checked": { color: "#228E90" },
                }}
              />
            }
            label={
              <span className="text-[13px] leading-5 text-[#475467]">
                I confirm that the insurance information provided is accurate
                and I authorize it to be used for updating my health records.
              </span>
            }
          />
          {touched.confirmation && errors.confirmation && (
            <p
              id="confirmation-error"
              className="-mt-1 ml-3 text-xs leading-4 text-danger"
            >
              {errors.confirmation}
            </p>
          )}

          <div className="mt-8 flex max-w-[640px] items-start gap-3 rounded-lg bg-[#F1F9F7] px-4 py-3 text-[13px] leading-5 text-[#236C68]">
            <Icon
              icon="tabler:lock"
              width={18}
              height={18}
              className="mt-px shrink-0 text-[#0D8B72]"
            />
            <p>
              Your insurance information will only be used to verify coverage
              and support healthcare services.
            </p>
          </div>
        </>
      )}

      <InsuranceInformationPopup
        open={isInformationPopupOpen}
        onClose={() => setIsInformationPopupOpen(false)}
      />

      <UploadSuccessSnackbar
        open={isUploadSnackbarOpen}
        onClose={() => setIsUploadSnackbarOpen(false)}
      />
    </section>
  );
};

export default Insurance;

