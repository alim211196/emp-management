import { TextField, Typography } from "@mui/material";
import React, { memo } from "react";
import { formatString, handleChange } from "./CustomFunction";
const MultilineTextField = ({ label, name, type, value, setFormData }) => {
  const formattedOutput = formatString(name);

  return (
    <>
      <Typography
        sx={{ color: "#474747", fontWeight: "500", fontSize: "14px" }}
      >
        {label} <span style={{ color: "red", marginLeft: 5 }}>*</span>
      </Typography>
      <TextField
        margin="dense"
        required
        fullWidth
        id={type}
        name={name}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, setFormData)}
        placeholder={`Enter ${formattedOutput}`}
        size="small"
        multiline
        rows={6}
      />
    </>
  );
};

export default memo(MultilineTextField);
