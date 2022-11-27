import React from 'react'
import { Avatar, Box, IconButton, Show, Text } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
export default function SmVideoSidebarIcon({video}) {
  return (
    <Box >
      
      <Box mt={10} display="flex" flexDir="column" gap={4} alignItems="center">
        <Show below='md'>
           <Box display="flex" alignItems="center" flexDir="column">
           <Avatar  name='handle' src={video.creatorImage} />
        </Box>
        </Show>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" >
           <IconButton   icon={ <AiOutlineHeart  size={30} />} />
            <Text fontSize='lg' color="white">100</Text>
          </Box>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
          <IconButton  icon={ <AiOutlineRetweet size={30} />} />
            <Text fontSize='lg' color="white">10</Text>
          </Box>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
           <IconButton   icon={<AiOutlineComment size={30}/>} />
            <Text fontSize='lg' color="white">100</Text>
          </Box>
        
      </Box>
    </Box>
  )
}
