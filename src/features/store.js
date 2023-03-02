import { configureStore } from "@reduxjs/toolkit";
import videosReducer from "./videos/videoSlice"


export const Store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});