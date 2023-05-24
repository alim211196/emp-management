import React, { memo, useState, useEffect } from "react";
import TabBody from "@/utils/TabBody";
import BlogDrawer from "./blogDrawer";
import BlogSection from "./blogSection";
import { Box } from "@mui/material";
import ScrollButton from "@/utils/ScrollButton";
import { useDispatch } from "react-redux";
import { SearchWithFuse, getCurrentDate } from "@/utils/CustomFunction";
import DialogBox from "@/utils/DialogBox";
import { openSnackbar } from "@/redux/reducer/Snackbar";

const AddBlogs = ({ value, currentUser }) => {
  const dispatch = useDispatch();
  const formattedDate = getCurrentDate();
  const DataObj = {
    blog_title: "",
    blog_description: "",
    username: currentUser?.username,
    creation_date: formattedDate,
  };

  const [formData, setFormData] = useState(DataObj);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [_id, setID] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [flag, setFlag] = useState("add");

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
    if (open === true) {
      setFormData(DataObj);
    }
    setFlag("add");
  };

  const getBlogs = () => {
    fetch("http://localhost:3000/api?apiName=get_blogs")
      .then((response) => response?.json())
      .then((data) => {
        setBlogs(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };

  useEffect(() => {
    getBlogs();
  }, [value]);

  const handleClose = () => {
    setDialogOpen(false);
    setID();
  };
  const handleOpen = (flag, id) => {
    setDialogOpen(flag);
    setID(id);
  };

  const handleDelete = async () => {
    try {
      // Make API call to delete the employee
      const response = await fetch(
        "http://localhost:3000/api?apiName=delete_blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: _id }),
        }
      );
      if (response.ok) {
        getBlogs();
        dispatch(
          openSnackbar({
            message: "Blog Deleted Successfully",
            severity: "success",
          })
        );
        handleClose();
      } else {
        dispatch(
          openSnackbar({
            message: "Delete request failed.",
            severity: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: error,
          severity: "error",
        })
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);
    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) {
      dispatch(
        openSnackbar({
          message: "Please fill out all fields.",
          severity: "error",
        })
      );
      return;
    }

    fetch("http://localhost:3000/api?apiName=add_blog", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        getBlogs();
        setFormData(DataObj);
        setIsDrawerOpen(false);
        dispatch(
          openSnackbar({
            message: "Blog added successfully.",
            severity: "success",
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleOpenEdit = (flag, id) => {
    setIsDrawerOpen(flag);
    setID(id);
    setFlag("edit");
    let current_User = blogs.filter((i) => i._id === id);
    setFormData({
      blog_title: current_User[0].blog_title,
      blog_description: current_User[0].blog_description,
      username: currentUser?.username,
      creation_date: formattedDate,
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const formDataValues = new FormData(event.target);
    const data = {};
    for (let [key, value] of formDataValues.entries()) {
      data[key] = value;
    }
    const hasEmptyFields = Object.values(data).some((value) => !value);
    if (hasEmptyFields) {
      dispatch(
        openSnackbar({
          message: "Please fill out all fields.",
          severity: "error",
        })
      );
      return;
    }
    fetch("http://localhost:3000/api?apiName=update_blogs", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, ...formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        getBlogs();
        setIsDrawerOpen(false);
        setFormData(DataObj);
        dispatch(
          openSnackbar({
            message: "Blog updated successfully.",
            severity: "success",
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const newResults = SearchWithFuse(
    ["blog_title", "blog_description", "username"],
    query,
    blogs
  );

  return (
    <>
      <Box sx={{ p: 3 }}>
        <TabBody
          title={"Blog Creation"}
          btnText={"Create blog"}
          toggleDrawer={toggleDrawer}
          query={query}
          setQuery={setQuery}
        >
          <BlogSection
            blogs={newResults}
            handleOpen={handleOpen}
            handleEdit={handleOpenEdit}
            currentUser={currentUser}
          />
        </TabBody>
        <ScrollButton />
        <BlogDrawer
          isDrawerOpen={isDrawerOpen}
          handleSubmit={flag === "add" ? handleSubmit : handleEdit}
          toggleDrawer={toggleDrawer}
          formData={formData}
          setFormData={setFormData}
          flag={flag}
        />
      </Box>
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleDelete}
        text={"Are your sure you want to delete this?"}
      />
    </>
  );
};

export default memo(AddBlogs);
