import React from "react";
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncVideos,
  getSelectCategory,
  removeVideos,
} from "../features/videos/videoSlice";

const Feed = () => {
  const selectedCategory = useSelector(getSelectCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncVideos(`search?part=snippet&q=${selectedCategory}`));
    return () => {
      dispatch(removeVideos());
    };
  }, [selectedCategory, dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 @RO-HIT
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory}
          <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos />
      </Box>
    </Stack>
  );
};

export default Feed;
