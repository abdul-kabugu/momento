import { Box, Button, Heading, Text } from '@chakra-ui/react'
import {useState} from 'react'
import { FirstStep, SecondStep, ThirdStep } from '../components'
import {useAccount, useaddress} from 'wagmi'
import TopNav from '../components/TopNav'
import { useCreatePost } from '../hooks/lens-react'
import {SyncLoader} from 'react-spinners'
import {toast} from 'react-toastify'
function upload() {
const [currentStep, setcurrentStep] = useState(0)
const [selectedVidFileCID, setselectedVidFileCID] = useState()
 const [selectedCollectModule, setselectedCollectModule] = useState("FreeCollectModule")
  const [selectedCurrency, setselectedCurrency] = useState("0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889")
  const [dropPrice, setdropPrice] = useState("")
  const [referralFee, setreferralFee] = useState("")
  const [collectLimit, setcollectLimit] = useState("")
  const [uploadedFileCid, setuploadedFileCid] = useState("")
  const [mirrorRules, setmirrorRules] = useState(true)
  const [collectRules, setcollectRules] = useState(false)
   const [description, setdescription] = useState("")
   const [dropTags, setdropTags] = useState([])
  const parsedReferral = parseFloat(referralFee)
   const {address} = useAccount()

const goNextPage = () => {
  if(currentStep < 2){
    setcurrentStep(currentStep +1)
  }
}

  const goPrevPage = () =>  {
    if(currentStep > 0){
      setcurrentStep(currentStep -1)
    }
  }
const getCurrentStep = () => {
  if(currentStep === 0){
    return(
      <FirstStep uploadedFileCid={uploadedFileCid} setuploadedFileCid = {setuploadedFileCid} />
    )
  }else if(currentStep === 1){
    return (
   <ThirdStep description = {description} setdescription = {setdescription} 
    dropTags = {dropTags} setdropTags = {setdropTags}
   />
    )
  
  }else if(currentStep === 2){
    return(
      <SecondStep selectedCollectModule = {selectedCollectModule} setselectedCollectModule = {setselectedCollectModule} 
      selectedCurrency = {selectedCurrency} setselectedCurrency = {setselectedCurrency} dropPrice ={dropPrice} setdropPrice ={setdropPrice}
       referralFee = {referralFee} setreferralFee = {setreferralFee} collectLimit ={collectLimit}
        setcollectLimit = {setcollectLimit}
    />
    )
  }
}


const getPostModules = () => {
  if(selectedCollectModule  === "FreeCollectModule"){
     const collectModule = {
      freeCollectModule : {
        followerOnly : collectRules
     }
     }
     return collectModule
  }else if(selectedCollectModule  === "FeeCollectModule"){
    const  collectModule  = {
      feeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : address,
        referralFee : parsedReferral,
        followerOnly : collectRules,

      }
    }
    return collectModule
  }else if(selectedCollectModule  === "LimitedFeeCollectModule"){
    const collectModule = {
      limitedFeeCollectModule : {
        collectLimit : collectLimit,
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : address,
        referralFee : parsedReferral,
        followerOnly : collectRules,
      }
    }
    return collectModule
  }else if(selectedCollectModule === "LimitedTimedFeeCollectModule"){
    const collectModule = {
      limitedTimedFeeCollectModule : {
        collectLimit : collectLimit,
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : address,
        referralFee : parsedReferral,
        followerOnly : collectRules,
      }
    }

    return collectModule
  }else if (selectedCollectModule === "TimedFeeCollectModule"){
    const collectModule = {
      timedFeeCollectModule : {
        amount: {
          currency : selectedCurrency,
           value : dropPrice,
        },
        recipient : address,
        referralFee : parsedReferral,
        followerOnly : collectRules,

      }
    }

    return collectModule
  }
    }

    const getPostRefrenceModule = () => {
      if(mirrorRules ){
        const referenceModule = {
          followerOnlyReferenceModule : true,
        }
         return referenceModule
      }else if(!mirrorRules){
        const referenceModule = {
         followerOnlyReferenceModule : false,
            }
        return referenceModule
      }
      }
  const {uploadPost, isLoading, isError, isSuccess, Errror} = useCreatePost()

  /* if(isLoading) {
    return(
      <Heading>I'm Loading</Heading>
    )
   }*/

   /*if(isSuccess) {
    return (
      <Heading>Post have been  created  succesfully</Heading>
    )
   }*/

   /*if(isError){
     
   }*/
   const getUploadBtnState = () => {
     if(isLoading){
      return(

        <SyncLoader  />
      )
     }else {
      return(
        <Button onClick={() => uploadPost(description, dropTags, uploadedFileCid, getPostModules, getPostRefrenceModule)} colorScheme="messenger" >Create New Post</Button>
      )
     }
   }
  return (
   <Box>
    <TopNav  />
     <Box>
      {getCurrentStep()}
     </Box>
      <Box display='flex' alignItems="center" justifyContent="end" px={6} gap={4}>
        <Button onClick={goPrevPage} colorScheme="messenger">Prev</Button>
       {
        currentStep === 2 ?
        getUploadBtnState() :
        <Button onClick={goNextPage} colorScheme="messenger">Next</Button>
       }
     
      </Box>
   </Box>
  )
}

export default upload