import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Typography } from "@mui/material";
import { formatString, handleChange } from "./CustomFunction";

const CustomPassword = ({ label, name, value, setFormData }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const formattedOutput = formatString(name);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography
        sx={{ color: "#474747", fontWeight: "500", fontSize: "14px" }}
      >
        {label} <span style={{ color: "red", marginLeft: 5 }}>*</span>
      </Typography>
      <FormControl
        margin="dense"
        required
        fullWidth
        size="small"
        variant="outlined"
      >
        <OutlinedInput
          name={name}
          placeholder={`Enter ${formattedOutput}`}
          value={value}
          onChange={(e) => handleChange(e, setFormData)}
          id={name}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </>
  );
};
export default CustomPassword;
