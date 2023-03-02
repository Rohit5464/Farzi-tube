import axios from 'axios';

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


export const fetchFromApi = async(url) => {
    const { data } = await axios.get (`${BASE_URL}/${url}` , options)

    return data;
}