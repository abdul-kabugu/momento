import { Box, Button, Hide, Show } from '@chakra-ui/react'
import {useRef, useState, useEffect} from 'react'
import PlayPause from './PlayPause'
import SmVideoSidebarIcon from './SmVideoSidebarIcon'
import VideoHeaderCard from './VideoHeaderCard'
import VideoSidebarIcons from './VideoSidebarIcons'

export default function VideoCard({video, index}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlay, setcurrentPlay] = useState("")
  
  /* useEffect(() => {
       if(ref ){
        setcurrentPlay(ref.current)
      
       }
      
    }, [isPlaying])*/
    
   
   const ref = useRef(null)
   const handlePlayVideo = (i) => {
      //ref.current.pause()*/
    if(isPlaying){
      ref.current.pause()
      setIsPlaying(false)
    }else if(! isPlaying  ){
      ref.current.play()
      setIsPlaying(true)
    }
   }

  
   // console.log("videos from video card", video)
  
  return (
   <Box px={2} >
 <VideoHeaderCard video = {video} />
  <Box display="flex" gap={6}>
    <Hide below='md'>
   <Box bg="blackAlpha.600" w={{ base : "full", md : "255px", lg : "289px"}} h={{base: "90vh", md : "70vh"}} ml={{ base : 0, md: 20}} rounded="lg" mb="10px" pos="relative">
       {video?.metadata?.media.map((vid, i) => {

        return(
          <video key={i} src={vid.original.url} className="vid-element" ref={ref}></video>
        )
       })}
     
       <Box pos="absolute" top="90%" left={15}>
       <PlayPause isPlaying = {isPlaying} handlePlayVideo = {handlePlayVideo} />
       </Box>
   </Box>
   <VideoSidebarIcons  video ={video} />
   </Hide>
    <Show below='md'>
    <Box bg="blackAlpha.600" w={{ base : "full", md : "255px", lg : "289px"}} h={{base: "90vh", md : "70vh"}} ml={{ base : 0, md: 20}} rounded="lg" mb="10px" pos='relative'>
    <video src={video.video } className="vid-element" ref={ref} style={{zIndex : -1}}></video>
    <Box pos="absolute" top="90%" left={15}>
       <PlayPause isPlaying = {isPlaying} handlePlayVideo = {handlePlayVideo} />
       </Box>
     <Box pos='absolute' zIndex={1}  left="76%" top="100px" px={6}>
     
         <SmVideoSidebarIcon video={video } />
       
    
     </Box>
   </Box>
   
   
   
    </Show>
   </Box>
   </Box>
  )
}
