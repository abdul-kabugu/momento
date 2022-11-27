import { Box, IconButton } from '@chakra-ui/react'
import { AiOutlinePlaySquare } from 'react-icons/ai'
import { IoIosPause, IoIosPlay } from 'react-icons/io'

export default function PlayPause({isPlaying, handlePlayVideo }) {
  return (
    <Box>
    {isPlaying ?
     <IconButton   icon={<IoIosPause size={30} color="white"  />} colorScheme="blackAlpha" onClick={handlePlayVideo} /> :
    <IconButton   icon={<IoIosPlay size={30} color="white"  />} colorScheme="blackAlpha" onClick={ handlePlayVideo}  />

  }
    </Box>
  )
}
