import { Box, Center, HStack, IconButton, Show, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineHome, AiOutlineMenu, AiOutlineSearch, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai'

export default function BottomNav() {
  return (
    <Box>
        <Show below='md'>
           <Box pos="fixed" top="90vh"  w="100%" py={1} px={4} alignItems="center" >
            <HStack gap={14} justifyContent="center">
              
                    <IconButton   icon={ <AiOutlineHome size={22} />} />
           
       
         
           
                <IconButton  icon={<AiOutlineSearch  size={22} />} />
           
                <IconButton  icon={<AiOutlineUpload size={22}/>}  />
             
             
          
            
                <IconButton  icon={ <AiOutlineUser size={22}  />} />
            
            
         
         
                <IconButton   icon={ <AiOutlineMenu size={22} />} />
             
           
            
            </HStack>
           </Box>
        </Show>
    </Box>
  )
}
