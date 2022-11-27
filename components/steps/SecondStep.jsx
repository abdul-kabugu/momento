import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react'
import {useState} from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { collectModules, currencies } from '../../assets/constants'

export default function SecondStep({selectedCollectModule, setselectedCollectModule,
  selectedCurrency, setselectedCurrency, dropPrice , setdropPrice,  referralFee,
  setreferralFee, collectLimit,  setcollectLimit 
}) {
  const [isFeeModal, setisFeeModal] = useState(false)
   const handleSelectCollectModule = (module) => {
    setselectedCollectModule(module)
   }

    const handleOpenFeeCollectModal = (module) =>  {
      handleSelectCollectModule(module)
        isFeeModal ? setisFeeModal(false) : setisFeeModal(true)
    }
   // console.log("selected collect module", selectedCollectModule)
  return (
     <Box w="100%" display='flex' h="80vh" alignItems="center" justifyContent="center">
       <Modal isOpen={isFeeModal} onClose={handleOpenFeeCollectModal} isCentered >
         <ModalOverlay  bg="blackAlpha.800"  />
           <ModalContent>
            <ModalHeader>{selectedCollectModule}</ModalHeader>
            <ModalCloseButton   />
             <ModalBody>
              <Box display='flex' flexDir="column" gap={3}>
              <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight='semibold'  fontSize="lg">Currency </Text>
                 <Select value={selectedCurrency} onChange = {e => setselectedCurrency(e.target.value)} disabled={selectedCollectModule === "FreeCollectModule"}>
                    {currencies.map((currency, i) => {

                      return(
                        <option key={i} value={currency.value}>{currency.title}</option>
                      )
                    })}
                 </Select>
              </Box>
                {selectedCollectModule === "LimitedFeeCollectModule" || 
                 selectedCollectModule === "LimitedTimedFeeCollectModule" ||
                 selectedCollectModule === "TimedFeeCollectModule"  ?
                 <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight='semibold' fontSize="lg">Collect Limit</Text>
                  <Input    type="number"    value={collectLimit} onChange={e => setcollectLimit(e.target.value)} placeholder="10 " disabled={selectedCollectModule === "FreeCollectModule"}/>
              </Box>  : ""
                }
              <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight='semibold'  fontSize="lg">Amount </Text>
                  <Input    type="number"    value={dropPrice} onChange={e => setdropPrice(e.target.value)} placeholder="100" disabled={selectedCollectModule === "FreeCollectModule"} />
              </Box>
              <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight='semibold' fontSize="lg">Refferal Fee </Text>
                  <Input    type="number"    value={referralFee} onChange={e => setreferralFee(e.target.value)} placeholder="10 %" disabled={selectedCollectModule === "FreeCollectModule"} />
              </Box>

              <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight='semibold'  fontSize="lg">Who Can Collect </Text>
                 <Select value={selectedCurrency} onChange = {e => setselectedCurrency(e.target.value)} disabled={selectedCollectModule === "FreeCollectModule"}>
                    <option value="true">Everyone Can Collect</option>
                    <option value="false">Only Followers Can Collect</option>
                 </Select>
              </Box>
               <Button colorScheme="messenger" onClick={() => setisFeeModal(false)}>Save</Button>
              </Box>
             </ModalBody>
           </ModalContent>
       </Modal>
   <Box w={{base : '100%', md : "450px"}} h={{base :"80vh", md : "400px"}}  p={4} >
     <Box display="flex" flexDir="column" gap={5}>
         {collectModules.map((module, i) =>  {

          return(
            <Box key={i} border="1px solid " borderColor={selectedCollectModule === module.collectModule ? "green.400" : "messenger.500"} display="flex" flexDir="column" py={3} px={4} rounded="lg" cursor="pointer" onClick={() => handleOpenFeeCollectModal(module.collectModule)}
             >
               
              <Box display='flex' alignItems="center" gap={4}>
                <Box display="flex" gap={2}>
                <module.firstIcon size={20} />
                {module.secondIcon && <module.secondIcon size={20} /> }
                
                </Box>
       
                 <Text fontWeight="semibold">{module.title}</Text>
                 {selectedCollectModule === module.collectModule  && <AiOutlineCheck style={{marginLeft : "auto"}} size={30} color="green" />}
                 
              </Box>
                <Text color='gray.500'>{module.contractAddress}</Text>
               
            </Box>
          )
         })}
     </Box>
   </Box>
   </Box>
  )
}
