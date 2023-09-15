import MiniDrawer from "@/components/Drawer.js/MiniDrawer";
import AddBlogs from "@/components/blogCreation/addBlogs";
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
    <MiniDrawer>
      <AddBlogs currentUser={currentUser} />
    </MiniDrawer>
  ) : null;
};

export default Dashboard;
