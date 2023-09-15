import CustomTheme from "@/utils/CustomTheme";
import {
  ListItem,
  ListItemButton,
  Tooltip,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import React, { memo } from "react";
const LowerIcons = ({ icon, text, open, setDialogOpen }) => {
  return (
    <CustomTheme>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setDialogOpen(true)}>
          <Tooltip title={!open && text} placement="right">
            <ListItemIcon sx={{ color: "#1976D2" }}>{icon}</ListItemIcon>
          </Tooltip>

          <ListItemText sx={{ color: "#292929" }} primary={text} />
        </ListItemButton>
      </ListItem>
    </CustomTheme>
  );
};

export default memo(LowerIcons);
