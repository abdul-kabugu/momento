import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Show, Text, Textarea } from '@chakra-ui/react'
import {useState} from 'react'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineRetweet, AiOutlineSend, AiOutlineFileAdd, AiOutlineUser } from 'react-icons/ai'
import { useCollect, useCreateComment, useGetPostComments, useMirror } from '../hooks/lens-react'
import { HiOutlineCollection } from 'react-icons/hi'
import { MdOutlinePostAdd } from 'react-icons/md'
import { truncateString } from '../hooks/useSubstring'

export default function VideoSidebarIcons({video}) {
  const [isCommentDrwaer, setisCommentDrwaer] = useState(false)
  const [commentTxt, setcommentTxt] = useState('')
  const [isCollectModal, setisCollectModal] = useState(false)
  console.log("the videos from sidebar icons", video)
  const {getComments, isGetPostCommentsError, postComments, isGetPostComentsLoading} = useGetPostComments(video.id)
   console.log("the post comments", postComments)
    if(isGetPostCommentsError){
      alert("something  went  wrong")
    }
    const {createComment, isLoading, isError, Errror} = useCreateComment()
    const {collecPublication, isError : isCollectPubsError, isLoading : isCollectPubsLoading, Errror : pubsErrorMessage} = useCollect()
     const {mirrorPublications, isError : isMirrorError, isLoading : isMirrorLoading, Errror : mirrorError} = useMirror()
     const closeCommentDrawer = () => {
      setisCommentDrwaer(false)
     }
      const openCommentDrawer = async () => {
        
         setisCommentDrwaer(true)
         getComments()
      }
       const closeCollectModal = () => {
          setisCollectModal(false)
       }
       const openCollectModal = () => {
        setisCollectModal(true)
       }
       if(isError){
        console.log(Error)
       }
  return (
    <Box >
       <Modal
       isOpen = {isCollectModal}
       onClose = {closeCollectModal}
        isCentered
       >
          <ModalOverlay   />
          <ModalContent>
            <ModalHeader display='flex' gap={4} alignItems="center"> <AiOutlineFileAdd />  {video?.collectModule?.type}</ModalHeader>
            <ModalCloseButton  />
             <ModalBody>
               <Box display="flex" flexDir="column" gap={4}>
                <Box display='flex' gap={4} alignItems="center">
                  <MdOutlinePostAdd  size={20} color='gray' />
                  <Text  fontWeight='semibold'>Post By</Text>
                  <Text>{video?.profile.handle}</Text>
                </Box>
                <Box display='flex' gap={4} alignItems="center">
                  <AiOutlineUser  size={20} color='gray' />
                  <Text  fontWeight='semibold'>Recipient</Text>
                  <Text>{video && truncateString(video.profile.ownedBy, 14)}</Text>
                </Box>
                 <Text color="gray">{video && truncateString(video.metadata?.content, 30)}</Text>
                  <Button ml='auto' rightIcon={<HiOutlineCollection />} colorScheme="messenger"
                   onClick={() => collecPublication(video?.id) }
                  >collect</Button>
               </Box>
             </ModalBody>
          </ModalContent>
       </Modal>
       <Drawer
         isOpen = {isCommentDrwaer}
         placement="right"
         onClose={closeCommentDrawer}

       >
         <DrawerOverlay  />
         <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>comments</DrawerHeader>
          <DrawerBody>
             {postComments?.publications?.items.map((comment, i) => {

              return(
                <Box display='flex' gap={3} key={i}>
                <Box>
                  <Avatar  src={comment?.profile?.picture?.original?.url}    />
                </Box>
                 <Box>
                   <Text>{comment?.profile?.handle}</Text>
                   <Text>{comment?.metadata?.content}</Text>
                 </Box>
                 </Box>
              )
             })}
            {isGetPostComentsLoading && <Heading>Thing  is loading</Heading>}
          </DrawerBody>
           <DrawerFooter>
            <Box display="flex" flexDir='column' gap={2} width="100%">
          <Textarea  placeholder='Your Comment ' 
            value={commentTxt} onChange = {e => setcommentTxt(e.target.value)}

          />
           <Button rightIcon={<AiOutlineSend />} colorScheme='messenger' onClick={() => createComment (commentTxt, video?.id)} >Comment</Button>
          </Box>
           </DrawerFooter>
         </DrawerContent>

       </Drawer>
      <Box mt="70%" display="flex" flexDir="column" gap={4} alignItems="center">
        <Show below='md'>
           <Box display="flex" alignItems="center" flexDir="column">
           <Avatar  name='handle' />
            <Text>{video.cretorName}</Text>
           </Box>
        </Show>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={3} >
           <IconButton   icon={ <HiOutlineCollection  size={30} />} onClick = {openCollectModal} />
            <Text fontSize="lg">{video?.stats.totalAmountOfCollects}</Text>
          </Box>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={3}>
          <IconButton  icon={ <AiOutlineRetweet size={30} />} onClick={() => mirrorPublications(video?.id)} />
            <Text fontSize="lg">{video?.stats?.totalAmountOfMirrors}</Text>
          </Box>
          <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={3}>
           <IconButton   icon={<AiOutlineComment size={30}/>} onClick = {openCommentDrawer} />
            <Text fontSize="lg">{video?.stats.totalAmountOfComments}</Text>
          </Box>
         
      </Box>
    </Box>
  )
}
