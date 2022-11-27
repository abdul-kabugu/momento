import { Box, Heading, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'
import {useState} from 'react'
import {testVideos} from '../assets/constants'
import { useDiscoverPosts } from '../hooks/lens-react'
import VideoCard from './VideoCard'

export default function Video() {
  const {posts, isPostsError, isPostsLoading} = useDiscoverPosts()
  const [isTest, setisTest] = useState(true)
    if(isPostsLoading){
      return(
       <Box shadow='lg' width="100%" py={7} display="flex" flexDir="column" alignItems='center'>
         <Box display="flex" justifyContent='space-between' width="70%" mb="0">
          <Box display="flex" gap={6} >
            <SkeletonCircle  size="70"   />
            <SkeletonText  noOfLines={2} width='250px'  />
          </Box>
             <Skeleton width='130px' h="35px" />
         </Box>
         
          <Box mt={4}>
          <Skeleton  width={{base : '100%', md : "370px"}}  height='480px'     />
          </Box>
       </Box>
      )
    }
  return (
    <Box ml={{base : "0px", md: 5, lg: 30}}  h={{base : "90vh"}}   w="full" py={4} >
      <div className='vid-container'>
      {posts?.explorePublications?.items?.map((vid, i) => {

        return(
            <VideoCard  video = {vid} index = {i} key={i} />
          
        )
      })}
      </div>
    </Box>
  )
}
