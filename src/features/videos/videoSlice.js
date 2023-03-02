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
    selected: "New",
    isLoading: true
}

const videoSlice = createSlice({
    name : "videos",
    initialState,
    reducers: {
      updateSelected: (state, {payload}) => {
        state.selected = payload;
      },
    },
    extraReducers:{

        [fetchAsyncVideos.fulfilled] : (state , {payload}) => {
            return {...state , videos:payload , isLoading: false}
        },
        [fetchAsyncDetails.fulfilled] : (state , {payload}) => {
          return {...state , details:payload.items[0]}
        },
        [fetchAsyncDetails.pending] : (state ) => {
          return {...state , isLoading: true }
        }
      }
    })

export const { updateSelected } = videoSlice.actions;
export const getAllVideos = (state) => state.videos.videos;
export const getAllDetails = (state) => state.videos.details;
export const getSelectCategory = (state) => state.videos.selected
export const getLoading = (state) => state.videos.isLoading
export default videoSlice.reducer;