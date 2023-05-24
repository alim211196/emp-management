import React, { memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DialogBox from "./DialogBox";

const FadeMenu = ({ user, router }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutDialogOpen = () => {
    handleClose();
    setDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        {!anchorEl ? (
          <ArrowDropDownIcon sx={{ color: "#fff" }} />
        ) : (
          <ArrowDropUpIcon sx={{ color: "#fff" }} />
        )}
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem> Username: {user?.username}</MenuItem>
        <MenuItem onClick={handleLogoutDialogOpen}>Logout</MenuItem>
      </Menu>
      <DialogBox
        open={dialogOpen}
        handleClose={handleLogoutDialogClose}
        handleChange={handleLogout}
        text={"Are your sure you want to exit?"}
        user={user}
      />
    </>
  );
};

export default memo(FadeMenu);
