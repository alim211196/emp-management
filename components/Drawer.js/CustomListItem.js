import React, { memo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon, Tooltip } from "@mui/material";
import CustomTheme from "../../utils/CustomTheme";
const CustomListItem = ({ item, open, router }) => {
  return (
    <CustomTheme>
      <ListItemButton
        onClick={() => router.push(item.path)}
        selected={item.path === router.pathname}
      >
        <Tooltip title={!open && item.title} placement="right">
          <ListItemIcon sx={{ color: "#1976D2" }}>{item.icon}</ListItemIcon>
        </Tooltip>
        <ListItemText sx={{ color: "#292929" }} primary={item.title} />
      </ListItemButton>
    </CustomTheme>
  );
};

export default memo(CustomListItem);
