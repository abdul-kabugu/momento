import { Avatar, Box, Button, Container, Hide, IconButton, Input, InputGroup, InputRightElement, Text, useColorMode } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import {useState} from 'react'
import { BsSearch } from 'react-icons/bs'
import   { AiOutlineUpload } from 'react-icons/ai'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { useSignIn } from '../hooks/lens-react'
import {useAccount} from 'wagmi'
import Link from 'next/link'

export default function TopNav() {
  const [searchInput, setsearchInput] = useState("")
   const [isSignedIn,setIsSignedIn] = useState(false)
  const {colorMode, toggleColorMode} = useColorMode()
  const {address, isConnected} = useAccount()
   const {signIn} = useSignIn()
    
      const handleSignIn = async () => {
        await signIn()
         setIsSignedIn(true)
        

      }
    const  getLensTkns = () => { 
       if (typeof window !== 'undefined') {
        const LENS_TOKEN = sessionStorage?.getItem("accessToken")
        return LENS_TOKEN
       }}
       const LENS_ACCESS_TOKEN = getLensTkns()
     // LENS_ACCESS_TOKEN()
   const getAuthState = () => {
    if(! isConnected){
      return(
        <ConnectButton  />
      )
    }else if(isConnected && LENS_ACCESS_TOKEN === null){
      return(
        <Button leftIcon={<img  src='/img/lens-logo.jpg'  style={{width : "20px", borderRadius : "50%"}} />} colorScheme="messenger" onClick={handleSignIn}>Sign-In with lens</Button>
      )
    }else if(address && LENS_ACCESS_TOKEN){
      return(
       <Box display="flex" alignItems="center" justifyContent="center" gap={2} border="1px" borderColor="gray.300" px={2} rounded="lg" cursor="pointer">
          <Avatar  name='user' size='sm'  />
           <Text>Abdul kabugu</Text>
          
       </Box>
      )
    }
   }
  return (
    <Box w="100%" h="60px" borderBottom="1px solid " borderColor="gray.300" display='flex' alignItems="center">
     <Container>
      <Text>Momento</Text>
     </Container>
      <Hide below='lg'>
      <Container>
       <InputGroup>
        <Input   value={searchInput} placeholder="Search Video, acounts"  onChange={e => setsearchInput(e.target.value)} />
         <InputRightElement
             pointerEvents='none'
             color='gray.300'
             fontSize='1.2em'
             children={<BsSearch  cursor="pointer" />}
           />
      </InputGroup>
      </Container >
      </Hide>
        <Container display='flex' gap={7}>
            <Button leftIcon={<AiOutlineUpload  size={22}  />} colorScheme="messenger"><Link href="/upload">Upload</Link>   </Button>
            {getAuthState() }
           
              {colorMode === "light" ?  <IconButton  icon={<MdOutlineLightMode />} onClick={toggleColorMode} /> : <IconButton  icon={<MdOutlineDarkMode />}   onClick={toggleColorMode}/>}
        </Container>
    </Box>
  )
}
