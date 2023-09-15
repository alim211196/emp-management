import React, { memo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomTheme = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976D2",
      },
      secondary: {
        main: "#1976D2",
      },
    },
    components: {
      typography: {
        fontFamily: "Roboto",
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                color: "#474747",
                borderColor: "#474747",
              },
            },
            "& .MuiOutlinedInput-root.Mui-disabled": {
              "& fieldset": {
                color: "#474747",
                borderColor: "#474747",
              },
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "#474747",
            },
            "& .MuiOutlinedInput-root.Mui-disabled:hover fieldset": {
              borderColor: "#fff",
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff",
            },
            "& .MuiOutlinedInput-input.Mui-disabled": {
              WebkitTextFillColor: "#fff",
              opacity: 0.6,
            },
            "& .MuiInputLabel-root": {
              color: "#fff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
            "& .MuiInputLabel-root.Mui-disabled": {
              color: "#fff",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                color: "#474747",
                borderColor: "#474747", // change border color
              },
            },
            "& .MuiOutlinedInput-root:hover fieldset": {
              borderColor: "#474747",
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff",
            },
            "& .MuiInputLabel-root": {
              color: "#fff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#fff",
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default memo(CustomTheme);
