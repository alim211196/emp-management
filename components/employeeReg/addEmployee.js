import React, { memo, useState, useEffect } from "react";
import EmployeeDrawer from "./employeeDrawer";
import TabBody from "@/utils/TabBody";
import TableSection from "./tableSection";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import {
  SearchWithFuse,
  getCurrentDate,
} from "@/utils/CustomFunction";
import DialogBox from "@/utils/DialogBox";
const AddEmployee = ({ value }) => {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [_id, setID] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const formattedDate = getCurrentDate();
  const [flag, setFlag] = useState("add");
  const [query, setQuery] = useState("");
  const DataObj = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    user_type: "employee",
    password: "",
    creation_date: formattedDate,
  };
  const [formData, setFormData] = useState({
    ...DataObj,
    confirm_password: "",
  });

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
    if (open === true) {
      setFormData(DataObj);
    }
    setFlag("add");
  };

  const getEmployee = () => {
    fetch("http://localhost:3000/api/get_employees")
      .then((response) => response?.json())
      .then((data) => {
        setUsers(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  };
  useEffect(() => {
    getEmployee();
  }, [value]);

  const handleClose = () => {
    setFormData(DataObj);
    setDialogOpen(false);
    setID();
  };
  const handleOpen = (flag, id) => {
    setFormData(DataObj);
    setDialogOpen(flag);
    setID(id);
  };
  const handleDelete = async () => {
    try {
      // Make API call to delete the employee
      const response = await fetch(
        "http://localhost:3000/api/delete_employee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: _id }),
        }
      );
      if (response.ok) {
        getEmployee();
        dispatch(
          openSnackbar({
            message: "Employee Deleted Successfully.",
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

    const { password, confirm_password } = data;
    if (password !== confirm_password) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }

    fetch("http://localhost:3000/api/add_employee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        getEmployee();
        setFormData(DataObj);
        setIsDrawerOpen(false);
        dispatch(
          openSnackbar({
            message: "Employee added successfully.",
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
    let currentUser = users.filter((i) => i._id === id);
    setFormData({
      firstname: currentUser[0].firstname,
      lastname: currentUser[0].lastname,
      email: currentUser[0].email,
      username: currentUser[0].username,
      user_type: currentUser[0].user_type,
      password: currentUser[0].password,
      creation_date: formattedDate,
      confirm_password: currentUser[0].password,
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

    const { password, confirm_password } = data;
    if (password !== confirm_password) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }

    fetch("http://localhost:3000/api/update_employee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, ...formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        getEmployee();
        setIsDrawerOpen(false);
        setFormData(DataObj);
        dispatch(
          openSnackbar({
            message: "Employee updated successfully.",
            severity: "success",
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const newResults = SearchWithFuse(
    ["firstname", "lastname", "email", "username"],
    query,
    users
  );
  return (
    <>
      <Box sx={{ p: 3 }}>
        <TabBody
          title={"Employee Registration"}
          btnText={"Add Employee"}
          toggleDrawer={toggleDrawer}
          query={query}
          setQuery={setQuery}
        >
          <TableSection
            data={newResults}
            handleOpen={handleOpen}
            handleEdit={handleOpenEdit}
          />
        </TabBody>
        <EmployeeDrawer
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

export default memo(AddEmployee);
