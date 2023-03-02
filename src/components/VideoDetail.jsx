import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "./";
import { fetchFromApi } from "../utils/fetchFromApi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncDetails,
  fetchAsyncVideos,
  getAllDetails,
  getLoading
} from "../features/videos/videoSlice";

const VideoDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(getAllDetails);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(fetchAsyncDetails(`videos?part=snippet,statistics&id=${id}`));
    dispatch(
      fetchAsyncVideos(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "90px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            {detail.snippet && <Typography color="#fff" variant="subtitle1" fontWeight="bold" p={2}>
              {detail.snippet.title}
            </Typography>}
            
            {detail.snippet && (<Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${detail.snippet.channelId}`}>
                <Typography color="#fff" variant={{ sm: "subtitle1", md: "h6"}}>
                  {detail.snippet.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "grey", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(detail.statistics.viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(detail.statistics.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>)}
            
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos direction='column'/>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
