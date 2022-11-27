import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

export default function UserPostCard({post}) {
  console.log("the posts", post)
  return (
    
       <Box width="190px" h="270px" bg='black' rounded="lg">
         {post?.metadata?.media.map((media, i) => {

          return(
            <video src={media.original.url} className="user-post-card-video"></video>
          )
         })}
       </Box>
 
  )
}
