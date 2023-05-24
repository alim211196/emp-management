import { Box, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddEmployee from "@/components/employeeReg/addEmployee";
import AddBlogs from "@/components/blogCreation/addBlogs";
import Header from "@/utils/Header";

const AdminPanel = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [currentUser,setCurrentUser] = useState(() => {
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Employee Registration" value="1" />
              <Tab label="Blogs Creation" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <AddEmployee value={value} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <AddBlogs
              value={value}
              currentUser={currentUser}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  ) : null;
};

export default AdminPanel;
