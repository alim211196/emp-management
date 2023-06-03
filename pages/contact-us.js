import React, { useState } from "react";
import BoxWrapper from "@/utils/BoxWrapper";
import CustomTextField from "@/utils/CustomTextField";
import CustomButton from "@/utils/CustomButton";
import { openSnackbar } from "@/redux/reducer/Snackbar";
import { useDispatch } from "react-redux";
import MultilineTextField from "@/utils/MultilineTextField";
import { Grid } from "@mui/material";
import { getCurrentDate } from "@/utils/CustomFunction";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const formattedDate = getCurrentDate();
  const DataObj = {
    fullname: "",
    email: "",
    phone: "",
    comment: "",
    creation_date: formattedDate,
  };
  const [formData, setFormData] = useState(DataObj);

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
    fetch("http://localhost:3000/api?apiName=post_comment", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            openSnackbar({
              message: "Thanks for submitting your form.",
              severity: "success",
            })
          );
          setLoading(false);
          setFormData(DataObj);
        } else {
          dispatch(
            openSnackbar({
              message: "Form not submitted.",
              severity: "error",
            })
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <BoxWrapper title="Contact Us" handleSubmit={handleSubmit} maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={4}>
          <CustomTextField
            label="Fullname"
            name="fullname"
            type="text"
            value={formData.fullname}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CustomTextField
            label="Email"
            name="email"
            type="text"
            value={formData.email}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <CustomTextField
            label="Phone"
            name="phone"
            type="number"
            value={formData.phone}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <MultilineTextField
            label="Comment"
            name="comment"
            type="text"
            value={formData.comment}
            setFormData={setFormData}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={"center"}>
        <Grid item xs={12} sm={4} md={4}>
          <CustomButton text={"Post Comment"} disabled={loading} />
        </Grid>
      </Grid>
    </BoxWrapper>
  );
};

export default ContactUs;
