import React, { useState, useEffect } from "react";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useRouter } from "next/router";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import BasicMenu from "./BasicMenu";
const Header = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [currentUser, setCurrentUser] = useState(() => {
    const storedData = localStorage.getItem("currentUser");
    return storedData ? JSON.parse(storedData) : null;
  });

  const router = useRouter();
  const path = [
    "/employee-login",
    "/admin-login",
    "/forgot-password",
    "/reset-password",
  ].includes(router.pathname);

  const CommonButton = (link, text) => {
    if (path) {
      return null;
    } else {
      return link === router.pathname ? null : (
        <Button color="inherit" onClick={() => router.push(link)}>
          {text}
        </Button>
      );
    }
  };
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
    }
  }, []);

  const UIConditions = () => {
    if (!path) {
      if (matches) {
        return (
          <>
            {CommonButton("/", "Home")}
            {CommonButton("/about-us", "About us")}
            {CommonButton("/contact-us", "Contact us")}
            {CommonButton("/blogs", "Blogs")}
          </>
        );
      } else {
        return <BasicMenu router={router} />;
      }
      return null;
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#474747" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Diversity3Icon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              !currentUser?.user_type && router.push("/");
            }}
          >
            Blogging World
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UIConditions />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
