import GetComments from "@/components/Comments/getComments";
import MiniDrawer from "@/components/Drawer.js/MiniDrawer";
import React from "react";

const UserComments = () => {
  return (
    <MiniDrawer>
      <GetComments />
    </MiniDrawer>
  );
};

export default UserComments;
