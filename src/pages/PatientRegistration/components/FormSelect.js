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
    <div className="mb-6">
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
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
            "& .MuiSelect-select": {
              padding: "13px 14px",
            },
          }}
        >
          <MenuItem value="">
            <span className="text-slate-400">{placeholder}</span>
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