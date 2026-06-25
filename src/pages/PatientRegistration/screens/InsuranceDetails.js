import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ActionButtons from "../components/common/ActionButtons";
import SectionHeader from "../components/common/SectionHeader";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import FilePreviewCard from "../components/upload/FilePreviewCard";
import UploadBox from "../components/upload/UploadBox";
import { insuranceProviders } from "../data/registrationOptions";
import { isValidFileSize, isValidFileType } from "../utils/fileUtils";

const InsuranceDetails = ({ data, updateData, onNext, onBack, onSkip }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setErrorMessage("");
    updateData({ [name]: type === "checkbox" ? checked : value });
  };

  const handleInsuranceCardUpload = (files) => {
    const selectedFile = files[0];

    if (!selectedFile) return;

    if (!isValidFileType(selectedFile)) {
      setErrorMessage("Only PDF, JPG, and PNG files are allowed.");
      return;
    }

    if (!isValidFileSize(selectedFile)) {
      setErrorMessage("File size should be below 5MB.");
      return;
    }

    updateData({ insuranceCard: selectedFile });
  };

  const handleNext = () => {
    if (data.provider && !data.policyNumber?.trim()) {
      setErrorMessage("Please enter policy/customer number.");
      return;
    }

    onNext();
  };

  return (
    <section className="max-w-[930px]">
      <SectionHeader
        title="Insurance Information"
        description="Add your insurance details to make claim processing faster and easier."
      />

      {errorMessage && (
        <Alert severity="error" className="mb-5">
          {errorMessage}
        </Alert>
      )}

      <FormSelect
        label="Insurance Provider"
        name="provider"
        value={data.provider}
        onChange={handleChange}
        options={insuranceProviders}
        placeholder="Select insurance provider"
        icon={<VerifiedUserIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <FormInput
        label="Policy / Customer Number"
        name="policyNumber"
        value={data.policyNumber}
        onChange={handleChange}
        placeholder="Enter policy or customer number"
        icon={<DescriptionIcon sx={{ fontSize: 14, color: "#00856F" }} />}
        error={Boolean(data.provider && !data.policyNumber)}
        helperText={
          data.provider && !data.policyNumber
            ? "Policy number is required when insurance provider is selected."
            : ""
        }
      />

      <div className="mb-6">
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          <DescriptionIcon sx={{ fontSize: 14, color: "#00856F" }} />
          Upload Insurance Card
        </label>

        <UploadBox
          title="Upload Insurance Card"
          description="Drag and drop your file here or click to browse"
          multiple={false}
          onFilesSelect={handleInsuranceCardUpload}
        />

        {data.insuranceCard && (
          <div className="mt-4 max-w-[220px]">
            <FilePreviewCard file={data.insuranceCard} onRemove={() => updateData({ insuranceCard: null })} />
          </div>
        )}
      </div>

      <label className="mb-6 flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-[11px] text-slate-500">
        <Checkbox
          size="small"
          name="confirmation"
          checked={data.confirmation || false}
          onChange={handleChange}
          sx={{ color: "#00856F", "&.Mui-checked": { color: "#00856F" } }}
        />

        <CheckCircleIcon sx={{ fontSize: 15, color: "#00856F" }} />
        <span>I confirm that the insurance information provided is correct.</span>
      </label>

      <ActionButtons
        onSkip={onSkip}
        onBack={onBack}
        onNext={handleNext}
        nextLabel="Upload Health Records"
      />
    </section>
  );
};

export default InsuranceDetails;
