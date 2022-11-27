import React from 'react'
import {Box, Heading} from '@chakra-ui/react'
import UserPostCard from './userPostCard'
export default function UserPosts({userPosts, isUserPostsError, isUserPostsLoading }) {
  console.log("the user psts from profil page", userPosts)
  return (
<Box  display="flex" gap={6} px={5} flexWrap ="wrap" >
   
     {userPosts?.publications?.items.map((post, i) => {

      return(
        <Box key={i} display="flex" flexDir="column" gap={4}>
         <UserPostCard  post = {post} />
         
          
         </Box>
          
      )
     })}
     
</Box>
  )
}
