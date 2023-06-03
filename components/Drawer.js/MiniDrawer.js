import React, { memo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { AppBar, Drawer } from "./DrawerFunction";
import { navLinks } from "@/utils/navLinks";
import CustomListItem from "./CustomListItem";
import { useRouter } from "next/router";
import { Avatar, ListItemButton, ListItemIcon, Tooltip } from "@mui/material";
import { CardName } from "@/utils/CustomFunction";
import LowerIcons from "./LowerIcons";
import DialogBox from "@/utils/DialogBox";

const MiniDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedData = localStorage.getItem("currentUser");
    return storedData ? JSON.parse(storedData) : null;
  });
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
    }
  }, []);
  const handleLogoutDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      if (currentUser.user_type === "admin") {
        router.push("/admin-login");
      } else {
        router.push("/employee-login");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Blogging World
          </Typography>
        </Toolbar>{" "}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip title={currentUser?.username} placement="bottom">
            <Avatar sx={{ fontSize: 24, mr: 3 }}>
              {CardName(currentUser?.username)}
            </Avatar>
          </Tooltip>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <List
          sx={{
            pt: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            background: "#fff",
            marginTop: "65px",
          }}
        >
          <Box>
            <ListItem disablePadding>
              <ListItemButton
                sx={
                  open && {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }
                }
                onClick={() => {
                  open ? handleDrawerClose() : handleDrawerOpen();
                }}
              >
                <ListItemIcon
                  sx={
                    open && {
                      color: "#1976D2",
                      "&.MuiListItemIcon-root": {
                        minWidth: "0px !important",
                      },
                    }
                  }
                >
                  {open ? (
                    <ChevronLeftIcon sx={{ color: "#1976d2" }} />
                  ) : (
                    <ChevronRightIcon sx={{ color: "#1976d2" }} />
                  )}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            {navLinks
              .filter((i) => i.user_type === currentUser.user_type)
              .map((item, index) => {
                return (
                  <ListItem key={index} disablePadding>
                    <CustomListItem item={item} open={open} router={router} />
                  </ListItem>
                );
              })}
          </Box>
          <LowerIcons
            icon={<PowerSettingsNewIcon />}
            text={"Logout"}
            altText={"logout"}
            open={open}
            setDialogOpen={setDialogOpen}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 10, pl: 1, pr: 1, Pb: 1 }}>
        {children}
      </Box>
      <DialogBox
        open={dialogOpen}
        handleClose={handleLogoutDialogClose}
        handleChange={handleLogout}
        text={"Are your sure you want to exit?"}
      />
    </Box>
  );
};
export default memo(MiniDrawer);
