import { Box } from "@mui/material";
import React, { memo } from "react";
import Header from "./Header";

const RoutesWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        transition: "0.3s",
        position: "relative",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url(https://source.unsplash.com/random/?city,evening)`,
      }}
    >
      <Header />
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          pb: 2,
          background: "rgba(0, 0, 0, 0.3)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default memo(RoutesWrapper);
