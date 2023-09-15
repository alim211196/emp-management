import { Box, Paper, Container, CssBaseline, Typography } from "@mui/material";
import React, { memo } from "react";
import Header from "@/utils/Header";
const BoxWrapper = ({ title, children, handleSubmit, maxWidth }) => {
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
        }}
      >
        <Container component="main" maxWidth={maxWidth}>
          <CssBaseline />
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
              pb: 2,
              background: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography
              sx={{
                color: "#474747",
                fontSize: "32px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {title}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 3,
                width: "-webkit-fill-available",
              }}
            >
              {" "}
              {children}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default memo(BoxWrapper);
