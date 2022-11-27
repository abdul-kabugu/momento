import { Box, Button, Heading, Text } from '@chakra-ui/react'
import {useState, useRef} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import {BsCheck2Circle} from 'react-icons/bs'
import { useUploadToIPFS } from '../../hooks/lens-react'
import  PuffLoader from 'react-spinners/PuffLoader'

export default function FirstStep({uploadedFileCid, setuploadedFileCid}) {
  const [selectedFile, setselectedFile] = useState()
  const {uploadToIpfs, isUploading, isUploadingError, isUploadingSuccess, Error, fileCID} = useUploadToIPFS()
  console.log("the uploaded file CID",uploadedFileCid)
  console.log("the uploaded file CID",selectedFile)
    const  videoRef = useRef()
     const selectVideos = () => {
      videoRef.current.click()
     }

      const handleUpoadToIpfs =  async (file) => {
        const fileCid =   await uploadToIpfs(file)
         setuploadedFileCid(fileCid?.path)

      }
      // accepated files    accept="video/mp4"

      

       if(isUploadingError) {
        return(
          <Heading>{Error}</Heading>
        )
       }
  

     const getUploadingState = () =>  {
       if(isUploading) {
        return (
          <PuffLoader  />
        )
       }else if(isUploadingSuccess) {
        return(
       <Box display="flex" alignItems="center" justifyContent="center" w="100%" flexDir="column">
         
           <BsCheck2Circle size={30} color="green" />
           <Text fontSize="lg"fontWeight="semibold" >Done</Text>
       </Box>
        )
       }else {
        return(
          <Button leftIcon={<IoMdAdd  />} colorScheme="messenger" onClick={() => handleUpoadToIpfs(selectedFile)}>Upload Video</Button>
        )
       }
     }
  return (
    <Box w="100%" h="80vh" display="flex" alignItems='center' justifyContent="center" flexDir="column" gap={5}>
      <Heading>Upload video</Heading>
      <Text>   {uploadedFileCid?.path}</Text>
       <Box w={{base : "100%", md : "500px"}} h={{base : "100%", md : "400px"}} border="2px dashed" borderColor="gray.300" rounded="lg" display="flex" alignItems="center" justifyContent="center" flexDir="column" gap={6}>
          <AiOutlineCloudUpload size={100} color="gray" />
           <Text fontWeight="semibold" fontSize='lg'>Drag  or  add  videos</Text>
           <input type='file'   ref={videoRef} onChange = {e => setselectedFile(e.target.files[0])} accept="video/mp4" hidden />
            <Button leftIcon={<AiOutlineCloudUpload />} colorScheme="messenger" onClick={selectVideos}>Select video</Button>
             {getUploadingState()
         
             }
       </Box>
    
    </Box>
  )
}
