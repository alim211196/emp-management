import { Button } from "@mui/material";
import React, { memo } from "react";
const CustomButton = ({ text }) => {

  return (
    <Button
      type="submit"
      variant="contained"
      sx={{ width: "100%", mt: 1,background:"#292929" }}
    >
      {text}
    </Button>
  );
};

export default memo(CustomButton);
