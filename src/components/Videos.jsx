import { Box, Stack } from '@mui/material'
import React from 'react'
import VideoCard from './VideoCard'
import ChannelCard from './ChannelCard'
import { useSelector } from 'react-redux'
import { getAllVideos } from '../features/videos/videoSlice'

const Videos = ({direction}) => { 
  const videos = useSelector(getAllVideos)
  return videos.items!=null &&(
    <Stack direction={direction || 'row'} flexWrap='wrap' justifyContent='start' gap={2}>
        {(videos.items).map((item , idx) => {
           return <Box key={idx}>
                {item.id.videoId && <VideoCard video={item}/>}
                {item.id.channelId && <ChannelCard channelDetail={item}/>}
            </Box>
        })}   
    </Stack>
  )
}

export default Videos