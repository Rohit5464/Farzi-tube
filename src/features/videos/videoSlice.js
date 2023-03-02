import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const BASE_URL= process.env.REACT_APP_BASE_URL;

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    // 'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchAsyncVideos = createAsyncThunk(
    "videos/fetchAsyncVideos",
    async(url) => {
        const { data } = await axios.get (`${BASE_URL}/${url}` , options)
    
        return data;
    }
)

export const fetchAsyncDetails = createAsyncThunk(
  "videos/fetchAsyncDetails",
  async(url) => {
      const { data } = await axios.get (`${BASE_URL}/${url}` , options)
  
      return data;
  }
)
 

const initialState = {
    videos: {},
    details: {},
    selected: "New"
}

const videoSlice = createSlice({
    name : "videos",
    initialState,
    reducers: {
      updateSelected: (state, {payload}) => {
        state.selected = payload;
      },
      removeVideos: (state) => {
        state.videos = {};
      },
      removeDetails: (state) => {
        state.details={};
      }
    },
    extraReducers:{

        [fetchAsyncVideos.fulfilled] : (state , {payload}) => {
            return {...state , videos:payload }
        },
        [fetchAsyncDetails.fulfilled] : (state , {payload}) => {
          return {...state , details:payload.items[0]}
        }
      }
    })

export const { removeDetails} = videoSlice.actions;
export const { updateSelected } = videoSlice.actions;
export const { removeVideos } = videoSlice.actions;
export const getAllVideos = (state) => state.videos.videos;
export const getAllDetails = (state) => state.videos.details;
export const getSelectCategory = (state) => state.videos.selected
export default videoSlice.reducer;