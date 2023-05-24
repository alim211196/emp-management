import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WithAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const isLoggedIn =
          typeof localStorage !== "undefined" &&
          localStorage.getItem("currentUser");
        if (!isLoggedIn) {
          await router.replace("/"); // Redirect to the login page if not logged in
        }
        setIsLoading(false);
      };

      checkAuth();
    }, []);

    if (isLoading) {
      return (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress />
        </Box>
      ); // Display a loading state until the authentication check is complete
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default WithAuth;
