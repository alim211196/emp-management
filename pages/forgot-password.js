import { Box } from "@mui/material";
import CustomButton from "@/utils/CustomButton";
import CustomTextField from "@/utils/CustomTextField";
import React, { useState } from "react";
import BoxWrapper from "@/utils/BoxWrapper";
import CustomLink from "@/utils/CustomLink";
import { useRouter } from "next/router";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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

    try {
      const response = await fetch(
        "http://localhost:3000/api/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(
          openSnackbar({
            message: data.message,
            severity: "success",
          })
        );
        router.push({
          pathname: "/reset-password",
          query: { _id: data._id },
        });
      }
    } catch (error) {
      dispatch(
        openSnackbar({
          message: "An error occurred. Please try again.",
          severity: "error",
        })
      );
    }
  };
  return (
    <BoxWrapper title="Forgot Password" handleSubmit={handleSubmit}>
      <CustomTextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        setFormData={setFormData}
      />
      <CustomButton text={"Forgot password"} />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItem: "center",
          justifyContent: "space-between",
        }}
      >
        <CustomLink link="/employee-login" title="Employee" />
        <CustomLink link="/admin-login" title="Admin" />
      </Box>
    </BoxWrapper>
  );
};
export default ForgotPassword;
