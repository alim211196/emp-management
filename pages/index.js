import { Box, Typography, Button, Paper } from "@mui/material";
import React from "react";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const CommonButton = (link, text) => {
    return (
      <Button
        variant="outlined"
        onClick={() => router.push(link)}
        sx={{
          background: "transparent",
          fontSize: 16,
          color: "#fff",
          mb: 2,
          border: "1px solid #fff",
          width: "10rem",
          "&:hover": {
            background: "#292929",
            color: "#fff",
          },
        }}
      >
        {text}
      </Button>
    );
  };
  return (
    <Box
      sx={{
        transition: "0.3s",
        position: "relative",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url(https://source.unsplash.com/random/?city,evening)`,
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        sx={{
          background: "rgba(0, 0, 0, 0.7)",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Diversity3Icon sx={{ width: 60, height: 60, color: "#FFF" }} />{" "}
            <Typography
              variant="h6"
              sx={{
                ml: 2,
                flexGrow: 1,
                cursor: "pointer",
                fontSize: 36,
                color: "#FFF",
              }}
            >
              Employee Management
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {CommonButton("employee-login", "Employee")}
            {CommonButton("admin-login", "Admin")}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default HomePage;
