import React, { memo, useState, useEffect } from "react";
import TabBody from "@/utils/TabBody";
import TableSection from "./tableSection";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import { SearchWithFuse, getCurrentDate } from "@/utils/CustomFunction";
import DialogBox from "@/utils/DialogBox";
import EmployeeDialog from "./employeeDialog";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [_id, setID] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const formattedDate = getCurrentDate();
  const [flag, setFlag] = useState("add");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
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
  const handleOpenDialog = () => {
    setIsOpen(true);
    setFlag("add");
  };
  const handleCloseDialog = () => {
    setIsOpen(false);
    setFormData(DataObj);
  };
  const getEmployee = () => {
    fetch("http://localhost:3000/api?apiName=get_employees")
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
  }, []);

  const handleClose = () => {
    setFormData(DataObj);
    setDialogOpen(false);
    setID();
  };
  const handleActive = (flag, id) => {
    setActive(flag);
    setFormData(DataObj);
    setDialogOpen(true);
    setID(id);
  };
  const handleActiveState = async () => {
    try {
      // Make API call to update the blog's active status
      const response = await fetch(
        "http://localhost:3000/api?apiName=update_employee_active",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: _id, active: active }), // Set the 'active' value to false to deactivate the blog
        }
      );
      if (response.ok) {
        getEmployee();
        dispatch(
          openSnackbar({
            message:
              active === true
                ? "Employee Activated Successfully"
                : "Employee Deactivated Successfully",
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
    const newFormData = {
      ...formData,
      active: false,
    };
    setLoading(true);
    fetch("http://localhost:3000/api?apiName=add_employee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          getEmployee();
          setFormData(DataObj);
          setIsOpen(false);
          dispatch(
            openSnackbar({
              message: "Employee added successfully",
              severity: "success",
            })
          );
        } else if (response.status === 409) {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Email or username already exists",
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
    let current_User = users.filter((i) => i._id === id);
    setFormData({
      firstname: current_User[0].firstname,
      lastname: current_User[0].lastname,
      email: current_User[0].email,
      username: current_User[0].username,
      user_type: current_User[0].user_type,
      password: current_User[0].password,
      creation_date: formattedDate,
      confirm_password: current_User[0].password,
    });
    setActive(current_User[0].active);
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
    const newFormData = {
      ...formData,
      active: false,
    };
    setLoading(true);
    fetch("http://localhost:3000/api?apiName=update_employee", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id, ...newFormData }),
    })
      .then((response) => {
        if (response.status === 200) {
          getEmployee();
          setIsOpen(false);
          setFormData(DataObj);
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Employee updated successfully.",
              severity: "success",
            })
          );
        } else if (response.status === 409) {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Email or username already exists",
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
    ["firstname", "lastname", "email", "username"],
    query,
    users
  );
  return (
    <>
      <Box>
        <TabBody
          title={"Employee Registration"}
          btnText={"Add Employee"}
          handleOpenDialog={handleOpenDialog}
          query={query}
          setQuery={setQuery}
          hidden={false}
        >
          <TableSection
            data={newResults}
            handleActive={handleActive}
            handleEdit={handleOpenEdit}
          />
        </TabBody>
        <EmployeeDialog
          handleSubmit={flag === "add" ? handleSubmit : handleEdit}
          formData={formData}
          setFormData={setFormData}
          flag={flag}
          handleCloseDialog={handleCloseDialog}
          open={isOpen}
          loading={loading}
        />
      </Box>
      <DialogBox
        open={dialogOpen}
        handleClose={handleClose}
        handleChange={handleActiveState}
        text={
          active === true
            ? "Are your sure you want to activate this employee account?"
            : "Are your sure you want to deactivate this employee account?"
        }
      />
    </>
  );
};

export default memo(AddEmployee);
