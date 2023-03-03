import React from "react";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Videos from "./Videos";
import { useDispatch } from "react-redux";
import { fetchAsyncVideos } from "../features/videos/videoSlice";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const dispatch = useDispatch();
  const { searchTerm } = useParams();

  useEffect(() => {
    dispatch(fetchAsyncVideos(`search?part=snippet&q=${searchTerm}`));
  }, [searchTerm, dispatch]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        {}
        Search Results for:{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }}> </Box>
        <Videos />
      </Box>
    </Box>
  );
};

export default SearchFeed;
