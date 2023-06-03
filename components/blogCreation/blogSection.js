import {
  Badge,
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Draw } from "@mui/icons-material";
import React, { memo, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { convertDate } from "@/utils/CustomFunction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LaunchIcon from "@mui/icons-material/Launch";
import CancelIcon from "@mui/icons-material/Cancel";
import BlogList from "@/utils/BlogList";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AssignBlogDialog from "./assignBlogDialog";
const BlogSection = ({
  blogs,
  handleActive,
  handleEdit,
  currentUser,
  setHidden,
  hidden,
  dashboardPath,
  getBlogs,
}) => {
  const [ID, setID] = useState(null);

  const [OpenAssignDialog, setOpenAssignDialog] = useState(false);
  const DataObj = {
    id: "",
    blog_title: "",
    created_by: "",
  };
  const [formData, setFormData] = useState(DataObj);

  const openBlog = (flag, id) => {
    setHidden(flag);
    setID(id);
  };

  const handleOpenEmployeeDialog = (
    flag,
    id,
    title,
    created_by,
    employees_ids
  ) => {
    setOpenAssignDialog(flag);
    setFormData({
      id: id,
      blog_title: title,
      created_by: created_by,
      assignedEmployees: employees_ids,
    });
  };

  const handleCloseEmployeeDialog = () => {
    setOpenAssignDialog(false);
    setFormData(DataObj);
  };
  let filteredBlogs;
  if (currentUser?.username === "admin") {
    // Show all blogs for admin user
    filteredBlogs = blogs.filter((blog) =>
      blog?.created_by === "admin"
        ? blog
        : blog?.created_by !== "admin"
        ? blog.active === true
        : blog.active === true
    );
  } else {
    // Show blogs created by currentUser and blogs where currentUser is in employees_ids
    filteredBlogs = blogs.filter(
      (blog) =>
        blog?.created_by === currentUser?.username ||
        (blog?.employees_ids?.includes(currentUser?._id) &&
          blog?.active === true)
    );
  }
  if (dashboardPath) {
    filteredBlogs = blogs.filter(
      (blog) => blog?.active === false && blog.created_by !== "admin"
    );
  }

  return filteredBlogs && filteredBlogs?.length > 0 ? (
    <>
      {hidden === false ? (
        filteredBlogs.map((blog, index) => {
          return (
            <BlogList index={index} blogs={blog} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Tooltip title="Edit" placement="top">
                  <IconButton onClick={() => handleEdit(true, blog?._id)}>
                    <EditIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
                {currentUser?.user_type === "admin" && (
                  <>
                    <Tooltip
                      title={blog.active === false ? "Inactive" : "Active"}
                      placement="top"
                    >
                      <IconButton
                        onClick={() => {
                          blog.active === false
                            ? handleActive(true, blog._id)
                            : handleActive(false, blog._id);
                        }}
                      >
                        {blog.active === false ? (
                          <CancelIcon sx={{ fontSize: 20, color: "red" }} />
                        ) : (
                          <CheckCircleIcon
                            sx={{ fontSize: 20, color: "green" }}
                          />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Assign to other" placement="top">
                      <IconButton
                        disabled={
                          blog?.created_by !== "admin" || blog?.active === false
                        }
                        onClick={() =>
                          handleOpenEmployeeDialog(
                            true,
                            blog?._id,
                            blog?.blog_title,
                            blog?.created_by,
                            blog?.employees_ids
                          )
                        }
                      >
                        <Badge
                          badgeContent={blog?.employees_ids?.length}
                          sx={{
                            "& .MuiBadge-badge": {
                              background: "#1976D2",
                              color: "#fff",
                            },
                          }}
                        >
                          <GroupAddIcon sx={{ fontSize: 20 }} />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </>
                )}

                <Tooltip title="Go to view full blog" placement="top">
                  <IconButton onClick={() => openBlog(true, blog?._id)}>
                    <LaunchIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </BlogList>
          );
        })
      ) : (
        <>
          <Button onClick={() => setHidden(false)}>Back</Button>
          {blogs
            .filter((i) => i._id === ID)
            .map((item, index) => {
              return (
                <Paper
                  elevation={0}
                  sx={{
                    pl: 5,
                    pr: 5,
                    mt: 1,
                    mb: 2,
                    background: "transparent",
                  }}
                  key={index}
                >
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{ textTransform: "capitalize", mb: 0 }}
                  >
                    {item?.blog_title}
                  </Typography>
                  <Typography gutterBottom>
                    {" "}
                    {convertDate(new Date(item?.creation_date), 1)} by{" "}
                    {item?.created_by}
                  </Typography>
                  {item?.profileimage && (
                    <Box
                      sx={{
                        height: "400px",
                        width: "100%",
                        transition: "0.3s",
                        position: "relative",
                        backgroundSize: "100% 100% !important",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        background: item?.profileimage
                          ? `url(${item?.profileimage})`
                          : "transparent",
                      }}
                    />
                  )}

                  <Typography
                    gutterBottom
                    sx={{ textTransform: "capitalize", mt: 1 }}
                  >
                    {item?.blog_description}
                  </Typography>
                </Paper>
              );
            })}
        </>
      )}
      <AssignBlogDialog
        open={OpenAssignDialog}
        handleCloseDialog={handleCloseEmployeeDialog}
        formData={formData}
        getBlogs={getBlogs}
      />
    </>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Draw />
      <Typography sx={{ fontSize: 20 }}>
        You Don not have any blog available please create new one.
      </Typography>
    </Box>
  );
};

export default memo(BlogSection);
