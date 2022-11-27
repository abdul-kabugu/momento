import { Box, Text, Textarea } from '@chakra-ui/react'
import {useState} from 'react'
import {AiOutlineClose} from 'react-icons/ai'

export default function ThirdStep({description, setdescription, dropTags, setdropTags}) {
  const [tagsText, settagsText] = useState('')
    // add  new  tag
    const addNewTag = (event) => {
      if(event.key === "Enter" && tagsText !== ""  && dropTags.length < 5){
        
        setdropTags([...dropTags, tagsText])
        settagsText("")
     
     }
     }

     //Remove  tag
   const removeTag = (index) => {
    setdropTags([...dropTags.filter(tags => dropTags.indexOf(tags) !== index)])
   }
    
  return (
   <Box w="100%" h="80vh" display="flex" alignItems="center" justifyContent="center" flexDir='column' gap={5}>
     <Box display='flex' flexDir='column' gap={3}>
    <Text fontSize="xl" fontWeight="semibold">Caption</Text>
    <Textarea  value={description} onChange={e => setdescription(e.target.value)} w={{base : "100%", md : "500px"}} 
    placeholder='Post caption' border='1px solid' borderColor="gray.400"
    size="lg" resize="none" minH="130px"
    />
    </Box>

    <Box display='flex' flexDir='column' gap={3} >
    <Text fontSize="xl" fontWeight="semibold">Add Tags</Text>
    
      <Box w={{base : "100%", md : "500px"}}  h="130px" border="1px solid " borderColor="gray.400" rounded="lg" p={4}>
      <div className="tags-container">
      {dropTags?.map((tag, i) => {

return(
  <div key={i} >
    <li className='tag-box'>
      {tag}
      <AiOutlineClose className='ml-1 cursor-pointer' onClick={() => removeTag(i)} cursor="pointer" />
      </li>
  </div>
)
})}
</div>
        <input type='text' value={tagsText} onChange = {e => settagsText(e.target.value)}  placeholder="Tag Name"  
          className='tags-input'
          onKeyUp={event => addNewTag(event)} 
        />
         
      </Box>
    </Box>
   </Box>
  )
}
