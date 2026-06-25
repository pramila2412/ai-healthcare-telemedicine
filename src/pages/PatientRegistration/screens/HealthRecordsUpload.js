import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import ActionButtons from "../components/ActionButtons";
import FilePreviewCard from "../components/FilePreviewCard";
import UploadBox from "../components/UploadBox";
import { documentTypes, healthRecordTypes } from "../constants/options";
import { createFileRecord, validateFiles } from "../utils/fileUtils";

const HealthRecordsUpload = ({
  data = [],
  setFormData,
  onBack,
  onSubmit,
  onSkip,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFilesUpload = (files) => {
    const { validFiles, invalidFiles } = validateFiles(files);

    if (invalidFiles.length > 0) {
      setErrorMessage(
        "Some files were skipped. Please upload only PDF, JPG, or PNG files below 5MB."
      );
    } else {
      setErrorMessage("");
    }

    const formattedFiles = validFiles.map((file) =>
      createFileRecord(file, "Medical Record")
    );

    if (!formattedFiles.length) return;

    setFormData((previousData) => ({
      ...previousData,
      healthRecords: [...previousData.healthRecords, ...formattedFiles],
    }));
  };

  const removeFile = (fileId) => {
    setFormData((previousData) => ({
      ...previousData,
      healthRecords: previousData.healthRecords.filter(
        (item) => item.id !== fileId
      ),
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
    switch (type) {
      case "Prescriptions":
        return <DescriptionOutlinedIcon sx={{ fontSize: 14 }} />;
      case "Lab Reports":
        return <BiotechOutlinedIcon sx={{ fontSize: 14 }} />;
      case "X-rays / Scans":
        return <DocumentScannerOutlinedIcon sx={{ fontSize: 14 }} />;
      case "Discharge Summary":
        return <AssignmentOutlinedIcon sx={{ fontSize: 14 }} />;
      default:
        return <UploadFileOutlinedIcon sx={{ fontSize: 14 }} />;
    }
  };

  return (
    <section className="max-w-[930px]">
      <div className="mb-7">
        <h1 className="m-0 text-[22px] font-bold text-slate-900">
          Upload Health Records
        </h1>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Upload your prescriptions, lab reports, scans, or discharge summaries.
        </p>
      </div>

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
          <span
            key={type}
            className="flex items-center gap-1.5 text-[11px] text-slate-500"
          >
            <span className="text-emerald-700">{getSupportIcon(type)}</span>
            {type}
          </span>
        ))}
      </div>

      {data.length > 0 ? (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Uploaded Documents
          </h3>

          <div className="grid grid-cols-4 gap-3.5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {data.map((item) => (
              <FilePreviewCard
                key={item.id}
                file={item.file}
                documentType={item.documentType}
                documentTypes={documentTypes}
                showDocumentType
                progress={item.progress}
                onDocumentTypeChange={(value) =>
                  updateDocumentType(item.id, value)
                }
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

      <ActionButtons
        onSkip={onSkip}
        onBack={onBack}
        onNext={onSubmit}
        nextLabel="Create Unique ID"
      />
    </section>
  );
};

export default HealthRecordsUpload;