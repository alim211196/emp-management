import React, { memo } from "react";
import Drawer from "@mui/material/Drawer";
import { Box, Typography } from "@mui/material";
import CustomButton from "@/utils/CustomButton";

const DrawerWrapper = ({
  isDrawerOpen,
  toggleDrawer,
  handleSubmit,
  title,
  btnText,
  children,
}) => {
  return (
    <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          p: 2,
          width: "25rem !important",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {children}
        <CustomButton text={btnText} />
      </Box>
    </Drawer>
  );
};

export default memo(DrawerWrapper);
