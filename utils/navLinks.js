import {
  Dashboard,
  GroupAdd,
  Draw,
  Sms,
  PermContactCalendar,
} from "@mui/icons-material";
export const navLinks = [
  {
    title: "Admin Dashboard",
    path: "/admin-dashboard",
    icon: <Dashboard />,
    user_type: "admin",
  },
  {
    title: "Add Employee",
    path: "/add-employee",
    icon: <GroupAdd />,
    user_type: "admin",
  },
  {
    title: "Blog Creation",
    path: "/blog-creation",
    icon: <Draw />,
    user_type: "admin",
  },
  {
    title: "User Comments",
    path: "/user-comments",
    icon: <Sms />,
    user_type: "admin",
  },
  {
    title: "Edit Profile",
    path: "/edit-profile",
    icon: <PermContactCalendar />,
    user_type: "admin",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Dashboard />,
    user_type: "employee",
  },
];
