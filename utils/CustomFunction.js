import { InputBase, Slide } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import React from "react";
import Fuse from "fuse.js";
export const CardName = (str) => {
  let words = str;
  const str2 = words?.charAt(0);
  return str2?.toUpperCase();
};

export const formatString = (inputString) => {
  let formattedString = inputString.replace(/_/g, " ");
  formattedString = formattedString.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );
  return formattedString;
};

export const generateRandomUserId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(currentDate.getDate()).padStart(2, "0"); // Add leading zero if needed

  return `${year}-${month}-${day}`;
};

export const handleChange = (event, setFormData) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};

export const convertDate = (date, addDays = 0) => {
  if (date instanceof Date) {
    const timeZoneOffset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() + timeZoneOffset * 60000);

    // Add one day to the adjusted date
    adjustedDate.setDate(adjustedDate.getDate() + addDays);

    return adjustedDate.toISOString().split("T")[0];
  } else if (typeof date === "string") {
    const dateParts = date.split("T")[0].split("-");

    // Convert string date to a Date object
    const dateObj = new Date(
      parseInt(dateParts[0]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[2])
    );

    // Add one day to the date object
    dateObj.setDate(dateObj.getDate() + addDays);

    const adjustedDateParts = [
      dateObj.getFullYear(),
      String(dateObj.getMonth() + 1).padStart(2, "0"),
      String(dateObj.getDate()).padStart(2, "0"),
    ];

    return `${adjustedDateParts[0]}-${adjustedDateParts[1]}-${adjustedDateParts[2]}`;
  } else {
    return "";
  }
};

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #474747",
  marginRight: "10px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#474747",
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const SearchWithFuse = (keysToSearch, query, data) => {
  const fuse = new Fuse(data, {
    keys: keysToSearch,
    threshold: 0,
    includeScore: false,
    includeMatches: false,
  });
  const results = query ? fuse.search(query) : [];

  const newResults = query ? results.map((result) => result.item) : data;

  return newResults;
};
