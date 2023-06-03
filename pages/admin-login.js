import React, { useState } from "react";
import BoxWrapper from "@/utils/BoxWrapper";
import { useRouter } from "next/router";
import CustomTextField from "@/utils/CustomTextField";
import CustomPassword from "@/utils/CustomPassword";
import CustomButton from "@/utils/CustomButton";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import { useDispatch } from "react-redux";
const AdminLogin = () => {
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
        "http://localhost:3000/api?apiName=admin_login",
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
         localStorage.setItem("currentUser", JSON.stringify(data.user));
         router.push("/admin-dashboard");
        dispatch(
          openSnackbar({
            message: data.message,
            severity: "success",
          })
        );
       
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
    <BoxWrapper title="Admin Login" handleSubmit={handleSubmit} maxWidth="xs">
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
    </BoxWrapper>
  );
};

export default AdminLogin;
