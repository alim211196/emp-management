import React, { memo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { CardName, convertDate } from "./CustomFunction";
import { Box, Divider } from "@mui/material";

const BlogList = ({ blogs, children }) => {
  const secondaryText =
    convertDate(new Date(blogs?.creation_date), 1) + " by " + blogs?.created_by;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <List sx={{ width: "100%", background: "transparent" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: "#474747" }}>
                {CardName(blogs?.blog_title)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={blogs?.blog_title}
              secondary={secondaryText}
            />
          </ListItem>
        </List>
        {children}
      </Box>

      <Divider />
    </>
  );
};

export default memo(BlogList);
