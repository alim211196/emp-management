import { Button, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const TabBody = ({
  title,
  btnText,
  handleOpenDialog,
  children,
  query,
  setQuery,
  hidden,
}) => {
  const router = useRouter();

  const btnState = () => {
    if (["/user-comments", "/admin-dashboard"].includes(router.pathname)) {
      return null;
    } else {
      return (
        <Button
          size="large"
          variant="contained"
          sx={{ background: "#474747" }}
          onClick={handleOpenDialog}
        >
          {btnText}
        </Button>
      );
    }
  };
  return (
    <>
      {hidden === false && (
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
              {btnState()}
            </Box>
          </Box>
          <Divider sx={{ mb: 2, mt: 2 }} />
        </>
      )}

      {children}
    </>
  );
};

export default memo(TabBody);
