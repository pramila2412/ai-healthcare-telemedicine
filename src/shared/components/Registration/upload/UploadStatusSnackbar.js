import { Icon } from "@iconify/react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const UploadStatusSnackbar = ({ open, status, onClose, onRetry }) => {
  const isError = status?.severity === "error";

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    onClose?.();
  };

  return (
    <Snackbar
      open={open && Boolean(status)}
      autoHideDuration={isError ? 6000 : 3500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        right: { xs: 16, sm: 24 },
        bottom: { xs: 88, sm: 96, lg: 160 },
      }}
    >
      <Alert
        severity={status?.severity || "error"}
        variant="outlined"
        icon={
          <Icon
            icon={isError ? "tabler:info-circle" : "tabler:check"}
            width={18}
            height={18}
          />
        }
        action={
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close upload notification"
            className="mt-0.5 inline-flex h-6 w-6 items-center justify-center text-[#667085] hover:text-[#344054]"
          >
            <Icon icon="tabler:letter-x" width={16} height={16} />
          </button>
        }
        sx={{
          width: { xs: "calc(100vw - 32px)", sm: 360 },
          alignItems: "flex-start",
          borderColor: isError ? "#F1B9B9" : "#9BD9D6",
          borderRadius: "4px",
          backgroundColor: isError ? "#FFF0F0" : "#F0FBFA",
          color: "#344054",
          boxShadow: "0 4px 14px rgba(16, 24, 40, 0.08)",
          "& .MuiAlert-icon": {
            mt: 0.25,
            color: isError ? "#C83D47" : "#248B8F",
            fontSize: 18,
          },
          "& .MuiAlert-message": { minWidth: 0, py: 0.25 },
        }}
      >
        <AlertTitle
          sx={{
            mb: 0.25,
            color: isError ? "#A72E38" : "#155E55",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {status?.title}
        </AlertTitle>
        <span className="block text-[10px] leading-[14px] text-[#667085]">
          {status?.message}
        </span>
        {status?.retryable && onRetry && (
          <Button
            color="inherit"
            size="small"
            onClick={onRetry}
            sx={{ mt: 0.5, minWidth: 0, p: 0, fontSize: 10, fontWeight: 600 }}
          >
            Retry
          </Button>
        )}
      </Alert>
    </Snackbar>
  );
};

export default UploadStatusSnackbar;
