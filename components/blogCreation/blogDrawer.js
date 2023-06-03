import React, { memo } from "react";
import CustomTextField from "@/utils/CustomTextField";
import DrawerWrapper from "@/utils/DrawerWrapper";
import MultilineTextField from "@/utils/MultilineTextField";

const BlogDrawer = ({
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
      title={flag === "add" ? "Add Blog Details:" : "Update Blog Details:"}
      btnText={flag === "add" ? "Create Blog" : "Update Blog"}
    >
      <CustomTextField
        label="Blog Tile"
        name="blog_title"
        type="text"
        value={formData.blog_title}
        setFormData={setFormData}
      />
      <MultilineTextField
        label="Blog Description"
        name="blog_description"
        type="text"
        value={formData.blog_description}
        setFormData={setFormData}
      />
    </DrawerWrapper>
  );
};

export default memo(BlogDrawer);
