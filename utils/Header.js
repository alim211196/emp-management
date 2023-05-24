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
  Avatar,
} from "@mui/material";
import FadeMenu from "./Menubar";
import { CardName } from "./CustomFunction";
const Header = () => {
  const [currentUser,setCurrentUser] = useState(() => {
    const storedData = localStorage.getItem("currentUser");
    return storedData ? JSON.parse(storedData) : null;
  });
  const router = useRouter();
  const CommonButton = (link, text) => {
    return link === router.pathname ? null : (
      <Button color="inherit" onClick={() => router.push(link)}>
        {text}
      </Button>
    );
  };

  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#292929" }}>
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
            Employee Management
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {currentUser ? (
              <>
                <Avatar sx={{ fontSize: 24 }}>
                  {CardName(currentUser?.username)}
                </Avatar>
                <FadeMenu router={router} user={currentUser} />
              </>
            ) : (
              <>
                {CommonButton("/employee-login", "Employee")}
                {CommonButton("/admin-login", "Admin")}
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
