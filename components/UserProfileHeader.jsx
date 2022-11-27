import { Avatar, Box, Button, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useFollow } from '../hooks/lens-react'

function UserProfileHeader({userProfile, isUserProfileError, isUserProfileLoading }) {
    console.log("the user profle from profil page", userProfile)
    const {followUsers, isLoading, isError, Errror} = useFollow()
  return (
   <Box w="100%" py={3} px={4}>
     <div className='profile-header'>
        <Box display='flex' gap={6} p={5}>
      <Box>
        <Avatar  name={userProfile?.profile?.picture.url} size="2xl" />
      </Box>
       <Box w="100%" py={2} px={4}>
         <Box display='flex' justifyContent="space-between" alignItems="center" >
         <Box>
          <Text fontSize='4xl' fontWeight="semibold">{userProfile?.profile.name || userProfile?.profile.handle}</Text>
           <Text fontSize="sm">{userProfile?.profile?.handle}</Text>
           <Text mt={3}>{userProfile?.profile?.bio  || "No Bio"}</Text>
          </Box>
           <Box>
             <Button rightIcon={<AiOutlineUserAdd  />} colorScheme="messenger" size="lg" onClick={() => followUsers()}>Follow</Button>
            </Box>
            </Box>
              <Box display='flex' alignItems="center" gap={6} flexWrap="wrap" mt={3}>
                <Box bg='whiteAlpha.600' color='black' display="flex" width="150px" justifyContent="space-between" 
                py={2} px={4} rounded="sm"
                >
                    <Text fontWeight="semibold">Followers</Text>
                     <Text fontWeight="bold"> {userProfile?.profile.stats.totalFollowers} </Text>
                </Box>
                <Box bg='whiteAlpha.600' color='black' display="flex" width="150px" justifyContent="space-between" 
                py={2} px={4} rounded="sm">
                    <Text>Following</Text>
                    <Text fontWeight="bold"> {userProfile?.profile.stats.totalFollowing}</Text>
                </Box>
                <Box bg='whiteAlpha.600' color='black' display="flex" width="150px" justifyContent="space-between" 
                py={2} px={4} rounded="sm">
                    <Text>Mirrors</Text>
                    <Text fontWeight="bold">  {userProfile?.profile.stats.totalMirrors}</Text>
                </Box>
                <Box bg='whiteAlpha.600' color='black' display="flex" width="150px" justifyContent="space-between" 
                py={2} px={4} rounded="sm">
                    <Text>Collects</Text>
                    <Text fontWeight="bold">    {userProfile?.profile.stats.totalCollects}</Text>
                </Box>
              </Box>
       </Box></Box>
        
     </div>
   </Box>
  )
}

export default UserProfileHeader