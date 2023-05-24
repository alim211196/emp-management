import AddBlogs from "@/components/blogCreation/addBlogs";
import Header from "@/utils/Header";
import { Box } from "@mui/system";
import React from "react";

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ width: "100%", mt: 8.5 }}>
        <AddBlogs />
      </Box>
    </Box>
  );
};

export default Dashboard;
