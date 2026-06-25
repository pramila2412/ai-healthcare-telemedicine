import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ActionButtons from "../components/common/ActionButtons";
import InfoChip from "../components/common/InfoChip";
import SectionHeader from "../components/common/SectionHeader";
import FilePreviewCard from "../components/upload/FilePreviewCard";
import UploadBox from "../components/upload/UploadBox";
import { documentTypes, healthRecordTypes } from "../data/registrationOptions";
import { createFileRecord, validateFiles } from "../utils/fileUtils";

const HealthRecordsUpload = ({ data = [], setFormData, onBack, onSubmit, onSkip }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFilesUpload = (files) => {
    const { validFiles, invalidFiles } = validateFiles(files);

    if (invalidFiles.length > 0) {
      setErrorMessage("Some files were skipped. Please upload only PDF, JPG, or PNG files below 5MB.");
    } else {
      setErrorMessage("");
    }

    const formattedFiles = validFiles.map((file) => createFileRecord(file, "Medical Record"));

    if (!formattedFiles.length) return;

    setFormData((previousData) => ({
      ...previousData,
      healthRecords: [...previousData.healthRecords, ...formattedFiles],
    }));
  };

  const removeFile = (fileId) => {
    setFormData((previousData) => ({
      ...previousData,
      healthRecords: previousData.healthRecords.filter((item) => item.id !== fileId),
    }));
  };

  const updateDocumentType = (fileId, documentType) => {
    setFormData((previousData) => ({
      ...previousData,
      healthRecords: previousData.healthRecords.map((item) =>
        item.id === fileId ? { ...item, documentType } : item
      ),
    }));
  };

  const getSupportIcon = (type) => {
    if (type === "Lab Reports") return <AssignmentIcon sx={{ fontSize: 14 }} />;
    if (type === "X-rays / Scans") return <FolderOpenIcon sx={{ fontSize: 14 }} />;
    return <DescriptionIcon sx={{ fontSize: 14 }} />;
  };

  return (
    <section className="max-w-[930px]">
      <SectionHeader
        title="Upload Health Records"
        description="Upload your prescriptions, lab reports, scans, or discharge summaries."
      />

      {errorMessage && (
        <Alert severity="warning" className="mb-5">
          {errorMessage}
        </Alert>
      )}

      <UploadBox
        title="Drag and drop files here or click to browse"
        description="Upload your health records securely"
        multiple
        onFilesSelect={handleFilesUpload}
      />

      <div className="my-4 flex flex-wrap items-center gap-5">
        {healthRecordTypes.map((type) => (
          <InfoChip key={type} icon={getSupportIcon(type)} label={type} />
        ))}
      </div>

      {data.length > 0 ? (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Uploaded Documents</h3>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((item) => (
              <FilePreviewCard
                key={item.id}
                file={item.file}
                documentType={item.documentType}
                documentTypes={documentTypes}
                showDocumentType
                progress={item.progress}
                onDocumentTypeChange={(value) => updateDocumentType(item.id, value)}
                onRemove={() => removeFile(item.id)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-xs text-slate-400">
          No health records uploaded yet.
        </div>
      )}

      <ActionButtons onSkip={onSkip} onBack={onBack} onNext={onSubmit} nextLabel="Create Unique ID" />
    </section>
  );
};

export default HealthRecordsUpload;
