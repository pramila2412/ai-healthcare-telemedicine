import { Icon } from "@iconify/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React, { useId } from "react";

const Popup = ({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscapeKeyDown = true,
  paperSx = {},
}) => {
  const generatedId = useId();
  const titleId = `popup-title-${generatedId}`;
  const descriptionId = description
    ? `popup-description-${generatedId}`
    : undefined;

  const handleClose = (_event, reason) => {
    if (!closeOnBackdropClick && reason === "backdropClick") return;
    if (!closeOnEscapeKeyDown && reason === "escapeKeyDown") return;
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      disableEscapeKeyDown={!closeOnEscapeKeyDown}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "8px",
            boxShadow: "0 12px 32px rgba(16, 24, 40, 0.22)",
            overflow: "hidden",
            ...paperSx,
          },
        },
        backdrop: {
          sx: { backgroundColor: "rgba(11, 17, 23, 0.38)" },
        },
      }}
    >
      <DialogTitle id={titleId} sx={{ px: 3, pt: 3, pb: 0.5 }}>
        <span className="block pr-10 text-[16px] font-semibold leading-6 text-[#141414]">
          {title}
        </span>
        {showCloseButton && (
          <IconButton
            onClick={onClose}
            aria-label="Close dialog"
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 24,
              height: 24,
              color: "#667085",
            }}
          >
            <Icon icon="tabler:letter-x" width={16} height={16} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: "0 !important", pb: 2.5 }}>
        {description && (
          <p
            id={descriptionId}
            className="mb-5 text-[12px] leading-[18px] text-[#475467]"
          >
            {description}
          </p>
        )}
        {children}
      </DialogContent>

      {actions && (
        <DialogActions sx={{ px: 3, pt: 0, pb: 3 }}>{actions}</DialogActions>
      )}
    </Dialog>
  );
};

export default Popup;
