import React, { memo } from "react";
import CustomPassword from "@/utils/CustomPassword";
import CustomTextField from "@/utils/CustomTextField";
import { Grid } from "@mui/material";
import CustomDialog from "@/utils/CustomDialog";

const EmployeeDialog = ({
  handleCloseDialog,
  open,
  handleSubmit,
  flag,
  setFormData,
  formData,
  loading,
}) => {
  return (
    <CustomDialog
      handleCloseDialog={handleCloseDialog}
      open={open}
      handleSubmit={handleSubmit}
      title={
        flag === "add" ? "Add Employee Details:" : "Update Employee Details:"
      }
      btnText={flag === "add" ? "Add Employee" : "Update Employee"}
      loading={loading}
      maxWidth="sm"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomTextField
            label="First name"
            name="firstname"
            type="text"
            value={formData.firstname}
            setFormData={setFormData}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomTextField
            label="Last name"
            name="lastname"
            type="text"
            value={formData.lastname}
            setFormData={setFormData}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomTextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomTextField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomPassword
            label="Password"
            name="password"
            value={formData.password}
            setFormData={setFormData}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {" "}
          <CustomPassword
            label="Confirm Password"
            name="confirm_password"
            value={formData.confirm_password}
            setFormData={setFormData}
          />
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default memo(EmployeeDialog);
