import React from "react";

import { createUploadStatus, UPLOAD_STATUS_CODE } from "@/shared/constants/uploadStatus";

import UploadStatusSnackbar from "./UploadStatusSnackbar";

const UploadSuccessSnackbar = ({
  open,
  onClose,
  title = "File Uploaded Successfully",
  message = "Your document has been uploaded successfully and added to your health records.",
}) => {
  const status = createUploadStatus(UPLOAD_STATUS_CODE.SUCCESS, {
    title,
    message,
  });

  return (
    <UploadStatusSnackbar
      open={open}
      status={status}
      onClose={onClose}
    />
  );
};

export default UploadSuccessSnackbar;
