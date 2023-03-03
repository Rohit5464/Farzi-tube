import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncDetails,
  fetchAsyncVideos,
  getAllDetails,
  removeDetails,
  removeVideos,
} from "../features/videos/videoSlice";

const ChannelDetail = () => {
  const { id } = useParams();
  const channelDetail = useSelector(getAllDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncDetails(`channels?part=snippet&id=${id}`));
    dispatch(
      fetchAsyncVideos(`search?channelId=${id}&part=snippet&order=date`)
    );
    return () => {
      dispatch(removeVideos());
      dispatch(removeDetails());
    };
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(242,0,0,1) 0%, rgba(0,0,0,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        {channelDetail && (
          <ChannelCard marginTop="-115px" channelDetail={channelDetail} />
        )}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }}> </Box>
        <Videos />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
