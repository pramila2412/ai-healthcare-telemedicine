import TextField from "@mui/material/TextField";
import React from "react";

const FormTextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  icon,
  maxLength = 500,
}) => {
  return (
    <div className="pr-form-group">
      <label className="pr-form-label">
        {icon}
        {label}
      </label>

      <TextField
        fullWidth
        multiline
        minRows={4}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        slotProps={{
          htmlInput: {
            maxLength,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            fontSize: "12px",
            backgroundColor: "#FFFFFF",
            minHeight: "112px",
          },
          "& .MuiOutlinedInput-input": {
            lineHeight: 1.5,
            padding: "4px 0",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6E8EC",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D5D9DF",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#00856F",
          },
        }}
      />

      <div className="pr-character-count">
        {(value || "").length}/{maxLength} Characters left
      </div>
    </div>
  );
};

export default FormTextArea;