import MiniDrawer from "@/components/Drawer.js/MiniDrawer";
import AddBlogs from "@/components/blogCreation/addBlogs";
import React from "react";

const BlogIndex = () => {
  return (
    <MiniDrawer>
      <AddBlogs />
    </MiniDrawer>
  );
};

export default BlogIndex;
