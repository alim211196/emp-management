import React, { memo } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const BasicMenu = ({ router }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About us",
      path: "/about-us",
    },
    {
      name: "Contact us",
      path: "/contact-us",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
  ];
  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuIcon sx={{ fontSize: 28, color: "#fff" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {links.map((item, index) => {
          return item.path === router.pathname ? null : (
            <MenuItem key={index} onClick={() => router.push(item.path)}>
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default memo(BasicMenu);
