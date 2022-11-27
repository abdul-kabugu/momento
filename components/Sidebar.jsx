import React from 'react'
import { Avatar, Box, Text } from '@chakra-ui/react'
import { topCreators } from '../assets/constants'
import useGetTopCreators from '../hooks/lens-react/useGetTopCreators'
import {ClimbingBoxLoader} from 'react-spinners'
export default function Sidebar() {
   const {topCreators : topcreators, isTopCreatorsLoading, isTopCreatorsError} = useGetTopCreators()
     
    const slicedCreators = topcreators?.exploreProfiles?.items.slice(0, 6)
    console.log("the to creators,", slicedCreators)
  return (
   <>
   { isTopCreatorsLoading ? (
    <Box w={{md : "260px", lg : "350px"}} minW="260px"  h="90vh" py="4px" px={{md : 10 , lg: 15}} display='flex' alignItems='center' justifyContent='center'>

     <Text fontSize='lg' fontWeight='semibold'>Top Artist Is Loading</Text>
    </Box>
   ) : (
    <Box w={{md : "260px", lg : "350px"}} minW="260px"  h="90vh" py="4px" px={{md : 10 , lg: 15}}>
     
      
       <Text fontSize="3xl" fontWeight="semibold" my={3}>Top creators</Text>
        {slicedCreators?.map((profile, i) => {

         return(
            <Box key={i} display="flex" gap={6} my={5}>
               
                  
                <Avatar    src={profile.picture?.original?.url} name={profile.name} />
                 <Box>
                    <Text
                     
                     fontSize='xl'
                     fontWeight='semibold'
                    >{profile.handle}</Text>
                    <Text
                    fontSize='sm'
                    fontWeight="semibold"
                    color="gray.500"
                    cursor="pointer"
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                   
                    
                    >{profile.handle}</Text>
                 </Box>
               
            </Box>
         )
        })}
       
    </Box>
)}
    </>
  )
}
