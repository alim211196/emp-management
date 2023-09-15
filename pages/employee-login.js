import React, { useState } from "react";
import { useRouter } from "next/router";
import BoxWrapper from "@/utils/BoxWrapper";
import CustomTextField from "@/utils/CustomTextField";
import CustomPassword from "@/utils/CustomPassword";
import CustomButton from "@/utils/CustomButton";
import { Box } from "@mui/material";
import CustomLink from "@/utils/CustomLink";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/reducer/Snackbar";

const EmployeeLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
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
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api?apiName=employee_login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        dispatch(
          openSnackbar({
            message: "Login successful",
            severity: "success",
          })
        );
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        router.push("/dashboard");
      } else if (data.status === 409) {
        dispatch(
          openSnackbar({
            message:
              "Your account is temporarily deactivated. Please contact the administrator.",
            severity: "error",
          })
        );
        setLoading(false);
      } else {
        dispatch(
          openSnackbar({
            message: "Login Failed.",
            severity: "error",
          })
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <BoxWrapper
      title="Employee Login"
      handleSubmit={handleSubmit}
      maxWidth="xs"
    >
      <CustomTextField
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        setFormData={setFormData}
      />
      <CustomPassword
        label="Password"
        name="password"
        value={formData.password}
        setFormData={setFormData}
      />
      <CustomButton text={"Login"} disabled={loading} />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <CustomLink link="/forgot-password" title="Forgot password?" />
      </Box>
    </BoxWrapper>
  );
};

export default EmployeeLogin;
