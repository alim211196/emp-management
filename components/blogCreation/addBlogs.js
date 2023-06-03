import React, { memo, useState, useEffect } from "react";
import TabBody from "@/utils/TabBody";
import BlogSection from "./blogSection";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { SearchWithFuse, getCurrentDate } from "@/utils/CustomFunction";
import DialogBox from "@/utils/DialogBox";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import BlogDialog from "./blogDialog";
import { useRouter } from "next/router";

const AddBlogs = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedData = localStorage.getItem("currentUser");
    return storedData ? JSON.parse(storedData) : null;
  });

  const dispatch = useDispatch();
  const formattedDate = getCurrentDate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState(false);
  const DataObj = {
    blog_title: "",
    blog_description: "",
    created_by: currentUser?.username,
    updated_by: "",
    creation_date: formattedDate,
    employees_ids: [],
  };

  const [formData, setFormData] = useState(DataObj);
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [_id, setID] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [flag, setFlag] = useState("add");
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  const dashboardPath = router.pathname === "/admin-dashboard";
  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedData = localStorage.getItem("currentUser");
    if (storedData) {
      setCurrentUser(JSON.parse(storedData));
    }
  }, []);

  const handleFileInputChange = (e) => {
    let files = e.target.files;
    let fsize = files[0]?.size;

    const file = Math.round(fsize / 1024);

    if (file > 100) {
      dispatch(
        openSnackbar({
          message: "Please upload image less than 1MB.",
          severity: "error",
        })
      );
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };
  };
  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
    setFlag("add");
  };
  const handleCloseDialog = () => {
    setFormData(DataObj);
    setSelectedFile(null);
    setIsOpen(false);
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
  }, []);

  const handleClose = () => {
    setDialogOpen(false);
    setID();
  };
  const handleActive = (flag, id) => {
    setActive(flag);
    setDialogOpen(true);
    setID(id);
  };

  const handleBlogState = async () => {
    try {
      // Make API call to update the blog's active status
      const response = await fetch(
        "http://localhost:3000/api?apiName=update_blog_active",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: _id, active: active }), // Set the 'active' value to false to deactivate the blog
        }
      );
      if (response.ok) {
        getBlogs();
        dispatch(
          openSnackbar({
            message:
              active === true
                ? "Blog Activated Successfully"
                : "Blog Deactivated Successfully",
            severity: "success",
          })
        );
        handleClose();
      } else {
        dispatch(
          openSnackbar({
            message: "Deactivation request failed.",
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
    const newFormData = {
      ...formData,
      profileimage: selectedFile,
      active: false,
    };

    setLoading(true);
    fetch("http://localhost:3000/api?apiName=add_blog", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    })
      .then((response) => {
        if (response.status === 200) {
          getBlogs();
          setFormData(DataObj);
          setIsOpen(false);
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Blog added successfully.",
              severity: "success",
            })
          );
        } else if (response.status === 409) {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Blog title already exists",
              severity: "error",
            })
          );
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "API not found",
              severity: "error",
            })
          );
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleOpenEdit = (flag, id) => {
    setIsOpen(flag);
    setID(id);
    setFlag("edit");
    let current_Blog = blogs.filter((i) => i._id === id);
    setFormData({
      blog_title: current_Blog[0].blog_title,
      blog_description: current_Blog[0].blog_description,
      created_by: current_Blog[0].created_by,
      updated_by: currentUser?.username,
      creation_date: formattedDate,
      employees_ids: current_Blog[0].employees_ids,
    });
    setSelectedFile(current_Blog[0].profileimage);
    setActive(current_Blog[0].active);
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
    const newFormData = {
      ...formData,
      profileimage: selectedFile,
      active: active,
    };
    setLoading(true);
    fetch("http://localhost:3000/api?apiName=update_blogs", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, ...newFormData }),
    })
      .then((response) => {
        if (response.status === 200) {
          getBlogs();
          setIsOpen(false);
          setFormData(DataObj);
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Blog updated successfully.",
              severity: "success",
            })
          );
        } else if (response.status === 409) {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Blog title already exists",
              severity: "error",
            })
          );
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "API not found",
              severity: "error",
            })
          );
        }
      })
      .catch((error) => {
        setLoading(false);
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
      <Box>
        <TabBody
          title={
            dashboardPath === true
              ? "Recently created inactive blogs"
              : "Blog Creation"
          }
          btnText={"Create blog"}
          handleOpenDialog={handleOpenDialog}
          query={query}
          setQuery={setQuery}
          hidden={hidden}
        >
          <BlogSection
            blogs={newResults}
            handleActive={handleActive}
            handleEdit={handleOpenEdit}
            currentUser={currentUser}
            hidden={hidden}
            setHidden={setHidden}
            dashboardPath={dashboardPath}
            getBlogs={getBlogs}
          />
        </TabBody>
        <BlogDialog
          handleSubmit={flag === "add" ? handleSubmit : handleEdit}
          formData={formData}
          setFormData={setFormData}
          flag={flag}
          handleCloseDialog={handleCloseDialog}
          open={isOpen}
          loading={loading}
          selectedFile={selectedFile}
          handleFileInputChange={handleFileInputChange}
          handleClear={handleClear}
        />
      </Box>
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleBlogState}
        text={
          active === true
            ? "Are your sure you want to activate this blog?"
            : "Are your sure you want to deactivate this blog?"
        }
      />
    </>
  );
};

export default memo(AddBlogs);
