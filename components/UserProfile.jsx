import { Box } from '@chakra-ui/react'
import React from 'react'
import UserProfileHeader from './UserProfileHeader'

export default function UserProfile({userProfile, isUserProfileLoading, isUserProfileError}) {
  return (
    <Box w="100%" py={3}>
        <UserProfileHeader userProfile = {userProfile} isUserProfileError = {isUserProfileError} isUserProfileLoading = {isUserProfileLoading}  />
    </Box>
  )
}
