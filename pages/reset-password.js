import CustomButton from "@/utils/CustomButton";
import React, { useState } from "react";
import CustomPassword from "@/utils/CustomPassword";
import BoxWrapper from "@/utils/BoxWrapper";
import { useDispatch } from "react-redux";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import { useRouter } from "next/router";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const router = useRouter();
  const _id = router.query._id;

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

    const { new_password, confirm_password } = data;
    if (new_password !== confirm_password) {
      dispatch(
        openSnackbar({
          message: "Passwords do not match.",
          severity: "error",
        })
      );
      return;
    }
  const newFormData = {
    _id: _id,
    new_password: data.new_password,
  };
    try {
      const response = await fetch(
        "http://localhost:3000/api?apiName=reset_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFormData),
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
        router.push("/employee-login");
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(
        openSnackbar({
          message: "An error occurred. Please try again.",
          severity: "error",
        })
      );
    }
  };
  return (
    <BoxWrapper title="Reset Password" handleSubmit={handleSubmit}>
      <CustomPassword
        label="New Password"
        name="new_password"
        value={formData.new_password}
        setFormData={setFormData}
      />
      <CustomPassword
        label="Confirm Password"
        name="confirm_password"
        value={formData.confirm_password}
        setFormData={setFormData}
      />
      <CustomButton text={"Reset password"} />
    </BoxWrapper>
  );
};
export default ResetPassword;
