import { ClipboardList, FileText, FlaskConical, ScanLine } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ActionButtons from "@/shared/components/PatientRegistration/common/ActionButtons";
import FilePreviewCard from "@/shared/components/PatientRegistration/upload/FilePreviewCard";
import UploadBox from "@/shared/components/PatientRegistration/upload/UploadBox";

import {
  formatFileSize,
  isAllowedFileType,
  isWithinMaxSize,
} from "@/shared/utils/PatientRegistration/fileUtils";

import {
  setActiveStep,
  setHealthRecords,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";

import { selectHealthRecords } from "@/state-management/modules/patientRegistration/patientRegistrationSelectors";

const supportedDocuments = [
  {
    label: "Prescription",
    icon: FileText,
  },
  {
    label: "Lab reports",
    icon: FlaskConical,
  },
  {
    label: "Scan",
    icon: ScanLine,
  },
  {
    label: "Discharge summary",
    icon: ClipboardList,
  },
];

const HealthRecord = () => {
  const dispatch = useDispatch();
  const savedHealthRecords = useSelector(selectHealthRecords);

  const [records, setRecords] = useState(savedHealthRecords || []);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFilesSelected = (files) => {
    const selectedFiles = Array.from(files || []);

    if (!selectedFiles.length) return;

    const validFiles = [];
    const invalidFiles = [];

    selectedFiles.forEach((file) => {
      const hasValidType = isAllowedFileType(file.name, [
        "pdf",
        "jpg",
        "jpeg",
        "png",
      ]);
      const hasValidSize = isWithinMaxSize(file, 20);

      if (hasValidType && hasValidSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setErrorMessage(
        "Some files were skipped. Please upload only PDF, JPG, JPEG, or PNG files below 20MB."
      );
    } else {
      setErrorMessage("");
    }

    if (!validFiles.length) return;

    const formattedFiles = validFiles.map((file, index) => ({
      id: `${Date.now()}-${index}-${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      documentType: index === 0 ? "Prescription" : "Health Record",
      uploadedAt: new Date().toISOString(),
    }));

    setRecords((previousRecords) => [...previousRecords, ...formattedFiles]);
  };

  const removeRecord = (recordId) => {
    setRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== recordId)
    );
  };

  const saveHealthRecords = () => {
    dispatch(setHealthRecords(records));
  };

  const handleNext = () => {
    saveHealthRecords();
    dispatch(setActiveStep("review"));
  };

  const handleBack = () => {
    saveHealthRecords();
    dispatch(setActiveStep("insurance"));
  };

  const handleSkip = () => {
    dispatch(setActiveStep("review"));
  };

  const labelClass = "block mb-2 text-[12px] font-normal text-[#202020]";

  return (
    <div className="px-7 md:px-10 mt-6 md:mt-12 pb-8">
      <div className="max-w-[880px] space-y-8">
        {errorMessage && (
          <div className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-xs font-normal text-[#92400E]">
            {errorMessage}
          </div>
        )}

        <div>
          <label className={labelClass}>Upload your health records</label>

          <UploadBox
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            label="Drag and drop your health records here, or browse"
            hint="JPG, PNG or PDF (Max. 20MB)"
            onFilesSelected={handleFilesSelected}
          />
        </div>

        <div>
          <h4 className="mb-3 text-[12px] font-semibold text-[#202020]">
            Supported Documents
          </h4>

          <div className="flex flex-wrap items-center gap-3 md:gap-5">
            {supportedDocuments.map((item) => {
              const IconComponent = item.icon;

              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-md bg-white text-[11px] font-normal text-[#666666]"
                >
                  <IconComponent size={15} strokeWidth={1.8} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>

        {records.length > 0 && (
          <div>
            <h4 className="mb-3 text-[12px] font-semibold text-[#202020]">
              Uploaded Records
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((record) => (
                <FilePreviewCard
                  key={record.id}
                  fileName={record.name}
                  fileSize={formatFileSize(record.size)}
                  onRemove={() => removeRecord(record.id)}
                />
              ))}
            </div>
          </div>
        )}
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
            label: "Create Unique ID",
            onClick: handleNext,
          }}
        />
      </div>
    </div>
  );
};

export default HealthRecord;