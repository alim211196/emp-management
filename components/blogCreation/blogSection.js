import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import React, { memo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { convertDate } from "@/utils/CustomFunction";

const BlogSection = ({ blogs, handleOpen, handleEdit, currentUser }) => {
  return blogs && blogs?.length > 0 ? (
    <>
      {blogs?.map((blog, index) => {
        return (
          <Paper elevation={3} sx={{ p: 2, mt: 1, mb: 2 }} key={index}>
            <Typography variant="h3" gutterBottom>
              {blog?.blog_title}
            </Typography>
            <Typography gutterBottom>
              {" "}
              {convertDate(new Date(blog?.creation_date))} by {blog?.username}
            </Typography>
            <Typography gutterBottom>{blog?.blog_description}</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Tooltip title="Edit" placement="top">
                <IconButton onClick={() => handleEdit(true, blog._id)}>
                  <EditIcon sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>
              {currentUser?.user_type === "admin" && (
                <Tooltip title="Delete" placement="top">
                  <IconButton onClick={() => handleOpen(true, blog._id)}>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Paper>
        );
      })}
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: 20 }}>No Blogs Found</Typography>
    </Box>
  );
};

export default memo(BlogSection);
