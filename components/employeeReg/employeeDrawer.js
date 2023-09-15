import React, { memo } from "react";
import CustomTextField from "@/utils/CustomTextField";
import CustomPassword from "@/utils/CustomPassword";
import DrawerWrapper from "@/utils/DrawerWrapper";

const EmployeeDrawer = ({
  isDrawerOpen,
  handleSubmit,
  toggleDrawer,
  formData,
  setFormData,
  flag,
}) => {
  return (
    <DrawerWrapper
      isDrawerOpen={isDrawerOpen}
      toggleDrawer={toggleDrawer}
      handleSubmit={handleSubmit}
      title={
        flag === "add" ? "Add Employee Details:" : "Update Employee Details:"
      }
      btnText={flag === "add" ? "Add Employee" : "Update Employee"}
    >
      <CustomTextField
        label="First name"
        name="firstname"
        type="text"
        value={formData.firstname}
        setFormData={setFormData}
      />
      <CustomTextField
        label="Last name"
        name="lastname"
        type="text"
        value={formData.lastname}
        setFormData={setFormData}
      />
      <CustomTextField
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        setFormData={setFormData}
      />
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
      <CustomPassword
        label="Confirm Password"
        name="confirm_password"
        value={formData.confirm_password}
        setFormData={setFormData}
      />
    </DrawerWrapper>
  );
};

export default memo(EmployeeDrawer);
