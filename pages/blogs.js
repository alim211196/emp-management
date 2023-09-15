import Header from "@/utils/Header";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BlogList from "@/utils/BlogList";
import { SearchWithFuse, convertDate } from "@/utils/CustomFunction";

import ScrollButton from "@/utils/ScrollButton";
import SearchBar from "@/utils/SearchBar";
import LaunchIcon from "@mui/icons-material/Launch";
const Blogs = () => {
  const [query, setQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [ID, setID] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api?apiName=get_blogs")
      .then((response) => response?.json())
      .then((data) => {
        setBlogs(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }, []);

  const openBlog = (flag, id) => {
    setHidden(flag);
    setID(id);
  };

  const newResults = SearchWithFuse(
    ["blog_title", "blog_description", "username"],
    query,
    blogs
  );

  return (
    <Box
      sx={{
        transition: "0.3s",
        position: "relative",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: `url(https://source.unsplash.com/random/?city,evening)`,
        p: 4,
        height: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none", // hide scrollbar on Firefox
        "&::-webkit-scrollbar": {
          width: 0,
          height: 0,
        },
      }}
    >
      <Header />

      <Box sx={{ p: 2, mt: 8, background: "rgba(255, 255, 255, 0.8)" }}>
        {hidden === false ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h3" gutterBottom>
                Welcome to blogs:
              </Typography>
              <SearchBar query={query} setQuery={setQuery} />
            </Box>

            {newResults
              .filter((i) => i.active === true)
              .map((item, index) => {
                return (
                  <Box key={index}>
                    <BlogList blogs={item}>
                      <Tooltip title="Go to view full blog" placement="top">
                        <IconButton onClick={() => openBlog(true, item?._id)}>
                          <LaunchIcon sx={{ color: "#474747" }} />
                        </IconButton>
                      </Tooltip>
                    </BlogList>
                  </Box>
                );
              })}
          </>
        ) : (
          <>
            <Button onClick={() => setHidden(false)}>Back</Button>
            {blogs
              .filter((i) => i._id === ID)
              .map((item, index) => {
                return (
                  <Paper
                    elevation={0}
                    sx={{ p: 2, mt: 1, mb: 2, background: "transparent" }}
                    key={index}
                  >
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{ textTransform: "capitalize", mb: 0 }}
                    >
                      {item?.blog_title}
                    </Typography>
                    <Typography gutterBottom>
                      {" "}
                      {convertDate(new Date(item?.creation_date), 1)} by{" "}
                      {item?.created_by}
                    </Typography>
                    {item?.profileimage && (
                      <Box
                        sx={{
                          height: "400px",
                          width: "100%",
                          transition: "0.3s",
                          position: "relative",
                          backgroundSize: "100% 100% !important",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          background: item?.profileimage
                            ? `url(${item?.profileimage})`
                            : "transparent",
                        }}
                      />
                    )}

                    <Typography
                      gutterBottom
                      sx={{ textTransform: "capitalize", mt: 1 }}
                    >
                      {item?.blog_description}
                    </Typography>
                  </Paper>
                );
              })}
            <ScrollButton />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Blogs;
