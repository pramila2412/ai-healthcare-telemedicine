import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FormInput from "@/shared/components/PatientRegistration/form/FormInput";
import FormSelect from "@/shared/components/PatientRegistration/form/FormSelect";
import FilePreviewCard from "@/shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "@/shared/components/PatientRegistration/upload/UploadBox";

import {
  insuranceProviders,
  insuranceTypes,
} from "@/shared/constants/PatientRegistration/registrationConfig";

import {
  formatFileSize,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";

import {
  setActiveStep,
  setInsuranceInfo,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectInsuranceInfo } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

import insurInfor from "@assets/patientRegistration/insurInfor.svg";

const defaultInsuranceInfo = {
  insuranceType: "",
  provider: "",
  policyNumber: "",
  insuranceCard: null,
};

const InsuranceInformation = () => {
  const dispatch = useDispatch();
  const savedInsuranceInfo = useSelector(selectInsuranceInfo);

  const [formData, setFormData] = useState(
    savedInsuranceInfo || defaultInsuranceInfo
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSelectChange = (name, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleFilesSelected = (files) => {
    const selectedFile = files?.[0];

    if (!selectedFile) return;

    if (!isAllowedFileType(selectedFile.name, ["pdf", "jpg", "jpeg", "png"])) {
      setErrorMessage("Only PDF, JPG, JPEG, and PNG files are allowed.");
      return;
    }

    if (!isWithinMaxSize(selectedFile, 5)) {
      setErrorMessage("Insurance card file size should be below 5MB.");
      return;
    }

    const fileDetails = {
      id: `${Date.now()}-${selectedFile.name}`,
      name: selectedFile.name,
      size: selectedFile.size,
      type: selectedFile.type,
      uploadedAt: new Date().toISOString(),
    };

    setFormData((previousData) => ({
      ...previousData,
      insuranceCard: fileDetails,
    }));

    setErrorMessage("");
  };

  const removeInsuranceCard = () => {
    setFormData((previousData) => ({
      ...previousData,
      insuranceCard: null,
    }));
  };

  const saveInsuranceInfo = () => {
    dispatch(setInsuranceInfo(formData));
  };

  const handleNext = () => {
    saveInsuranceInfo();
    dispatch(setActiveStep("records"));
  };

  const handleBack = () => {
    saveInsuranceInfo();
    dispatch(setActiveStep("medical"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("records"));
  };

  const handleSelectBlur = () => {};

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        {errorMessage && (
          <div className="rounded-lg border border-[#FCA5A5] bg-[#FEF2F2] px-4 py-3 text-xs font-normal text-[#B91C1C]">
            {errorMessage}
          </div>
        )}

        <div>
          <label className={labelClass}>Insurance Type</label>
          <FormSelect
            name="insuranceType"
            value={formData.insuranceType}
            options={insuranceTypes}
            placeholder="Select insurance type (Optional)"
            searchPlaceholder="Search insurance type"
            icon={insurInfor}
            iconAlt="insurance type"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
          />
        </div>

        <div>
          <label className={labelClass}>Insurance Provider</label>
          <FormSelect
            name="provider"
            value={formData.provider}
            options={insuranceProviders}
            placeholder="Select insurance provider (Optional)"
            searchPlaceholder="Search insurance provider"
            icon={insurInfor}
            iconAlt="insurance provider"
            onSelect={handleSelectChange}
            onBlur={handleSelectBlur}
          />
        </div>

        <div>
          <label className={labelClass}>Customer ID / Policy Number</label>
          <FormInput
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            placeholder="Enter Customer ID or Policy Number (Optional)"
            icon={insurInfor}
            iconAlt="policy number"
          />
        </div>

        <div>
          <label className={labelClass}>Upload Insurance Card (Optional)</label>

          <UploadBox
            multiple={false}
            accept=".pdf,.jpg,.jpeg,.png"
            label="Drag and drop your insurance card here, or browse"
            hint="JPG, PNG or PDF (Max. 5MB)"
            onFilesSelected={handleFilesSelected}
          />

          <div className="mt-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[11px] font-normal text-[#666666]">
            Make sure the card is clear and all details are visible.
          </div>

          {formData.insuranceCard && (
            <div className="mt-4 max-w-[360px]">
              <FilePreviewCard
                fileName={formData.insuranceCard.name}
                fileSize={formatFileSize(formData.insuranceCard.size)}
                onRemove={removeInsuranceCard}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 md:mt-28 flex items-center justify-between pb-10 md:pb-0">
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
            label: "Upload Health Records",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default InsuranceInformation;