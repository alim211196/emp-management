import { SearchWithFuse } from "@/utils/CustomFunction";
import TabBody from "@/utils/TabBody";
import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import CardSection from "./cardSection";

const GetComments = () => {
  const [query, setQuery] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api?apiName=get_comments")
      .then((response) => response?.json())
      .then((data) => {
        setComments(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error
      });
  }, []);

  const newResults = SearchWithFuse(
    ["fullname", "email", "phone", "comment"],
    query,
    comments
  );

  return (
    <TabBody
      title={"Users Comments"}
      query={query}
      setQuery={setQuery}
      hidden={false}
    >
      <Grid container spacing={2}>
        {newResults.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CardSection item={item} />
            </Grid>
          );
        })}
      </Grid>
    </TabBody>
  );
};

export default GetComments;
