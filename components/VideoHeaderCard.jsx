import { Avatar, Box, Button, Text, Show, Hide } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import {truncateString} from '../hooks/useSubstring'
import  Link from 'next/link'
import { useFollow } from '../hooks/lens-react'

export default function VideoHeaderCard({video}) {
  const {followUsers, isLoading, isError, Errror} = useFollow()
  return (
    <Box mb={3}>
      <Hide below='md'>
       <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" gap={7}>
        <Box>
        <Avatar  src={video.profile.picture.original.url} />
        </Box>
          <Box>
           <Link href={`/users/${video.profile.id}`}>
            <Text fontWeight="semibold" fontSize='lg' textTransform='capitalize' >{video.profile.handle}</Text>
            </Link>
            <Text >{video.profile.id}</Text>
            
            <Text>{ video && truncateString(video.metadata.description, 70) }</Text>
            
          </Box>
          </Box>
           <Button rightIcon={<AiOutlineUserAdd />} colorScheme="messenger" onClick={() => followUsers()} >Follow</Button>
       </Box>
       </Hide>
       
    </Box>
  )
}
