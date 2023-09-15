import { Button } from "@mui/material";
import React, { memo } from "react";
const CustomButton = ({ text, disabled }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ width: "100%", mt: 1, background: "#474747" }}
      disabled={disabled}
    >
      {disabled ? "Loading..." : text}
    </Button>
  );
};

export default memo(CustomButton);
