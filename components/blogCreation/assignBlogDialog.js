import React, { useState, useEffect, memo } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/reducer/Snackbar";

const AssignBlogDialog = ({
  formData,
  open,
  handleCloseDialog,
  getBlogs,
  ...other
}) => {
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3000/api?apiName=get_employees")
      .then((response) => response?.json())
      .then((data) => {
        setUsers(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }, []);

  useEffect(() => {
    if (!open) {
      setValues([]);
    } else {
      // Set the initial checkbox values based on assigned employees
      setValues(formData?.assignedEmployees || []);
    }
  }, [open, formData]);
  const handleCancel = () => {
    handleCloseDialog();
  };

  const handleClose = () => {
    handleCloseDialog(values);
  };

  const handleChange = (event, userId) => {
    if (values.includes(userId)) {
      setValues((prevValues) => prevValues.filter((v) => v !== userId));
    } else {
      setValues((prevValues) => [...prevValues, userId]);
    }
  };

  const handleAssignBlog = async () => {
    setLoading(true);
    try {
      // Make API call to update the blog's active status
      const response = await fetch(
        "http://localhost:3000/api?apiName=assign_blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: formData?.id, employees_ids: values }),
        }
      );
      if (response.ok) {
        getBlogs();
        dispatch(
          openSnackbar({
            message: "Blog Assigned Successfully.",
            severity: "success",
          })
        );
        handleClose();
      } else {
        dispatch(
          openSnackbar({
            message: "Assigned request failed.",
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
    } finally {
      setLoading(false);
    }
  };

  const btnText = () => {
    if (loading) {
      return "loading...";
    } else if (values.length > 0) {
      return "Update assignee";
    } else {
      return "Add assignee";
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>
        {" "}
        <ListItemText
          sx={{ textTransform: "capitalize" }}
          primary={formData?.blog_title}
          secondary={`Created by ${formData?.created_by}`}
        />
      </DialogTitle>
      <DialogContent dividers>
        <FormGroup>
          {users
            .filter(
              (i) => !["admin", formData?.created_by].includes(i.username)
            )
            .map((item) => (
              <FormControlLabel
                key={item?._id}
                control={
                  <Checkbox
                    checked={values.includes(item?._id)}
                    onChange={(event) => handleChange(event, item?._id)}
                    value={item?._id}
                  />
                }
                label={item?.username}
              />
            ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAssignBlog}
          disabled={loading}
        >
          {btnText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(AssignBlogDialog);
