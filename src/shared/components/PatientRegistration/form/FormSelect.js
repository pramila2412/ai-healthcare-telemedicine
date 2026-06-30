import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  icon,
  error = false,
  helperText = "",
}) => {
  return (
    <div className="pr-form-group">
      <label className="pr-form-label">
        {icon}
        {label}
      </label>

      <FormControl fullWidth size="small" error={error}>
        <Select
          name={name}
          value={value || ""}
          onChange={onChange}
          displayEmpty
          sx={{
            borderRadius: "8px",
            fontSize: "12px",
            backgroundColor: "#FFFFFF",
            height: "44px",
            "& .MuiSelect-select": {
              padding: "12px 14px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E6E8EC",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D5D9DF",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#00856F",
            },
          }}
        >
          <MenuItem value="">
            <span className="pr-select-placeholder">{placeholder}</span>
          </MenuItem>

          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default FormSelect;