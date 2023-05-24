import AddBlogs from "@/components/blogCreation/addBlogs";
import Header from "@/utils/Header";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

const Dashboard = () => {

   const [currentUser, setCurrentUser] = useState(() => {
     const storedData = localStorage.getItem("currentUser");
     return storedData ? JSON.parse(storedData) : null;
   });
   useEffect(() => {
     // Retrieve data from localStorage when the component mounts
     const storedData = localStorage.getItem("currentUser");
     if (storedData) {
       setCurrentUser(JSON.parse(storedData));
     }
   }, []);

  return currentUser ? (
    <Box>
      <Header />
      <Box sx={{ width: "100%", mt: 8.5 }}>
        <AddBlogs currentUser={currentUser} />
      </Box>
    </Box>
  ) : null;
};

export default Dashboard;
