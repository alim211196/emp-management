import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import SearchBar from "./SearchBar";

const TabBody = ({
  title,
  btnText,
  toggleDrawer,
  children,
  query,
  setQuery,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{title}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SearchBar query={query} setQuery={setQuery} />
          <Button size="large" variant="contained" sx={{background:"#292929"}} onClick={toggleDrawer(true)}>
            {btnText}
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 2, mt: 2 }} />
      {children}
    </>
  );
};

export default memo(TabBody);
