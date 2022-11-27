import {useAccount, useSignTypedData, useContractWrite} from 'wagmi'
import {v4 as uuidv4} from 'uuid'
//import { omit, splitSignature } from '../../utils/helpers'
//import {CREATE_POST_TYPED_DATA} from '../../graphql/query/create-post'
import {useMutation} from "@apollo/client"
import LENS_ABI from '../../abi/LENS_ABI.json'
import {MUMBAI_CONTRACT_ADDRESS} from '../../assets/constants'
import useUploadToIPFS from './useIPFSupload'
import useGetUserProfileId from './useGetUserPrfileId'
import {apolloClient} from '../../graphql/apollo/apoloClient'
import {gql} from '@apollo/client'
import {signText, signedTypeData, splitSignature} from '../../utils/ether-service'
import { lensHub} from '../../utils/lens-hub'
import {useState} from 'react'
import {toast} from 'react-toastify'

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

//TODO typings
const createPostTypedData = (createPostTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

    
  const useCreatePost = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()
  const {uploadToIpfs} = useUploadToIPFS()
  
   const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
   const FIRST_USER_ID = userProfileIds?.profiles?.items[0] 
    console.log("user profile id",FIRST_USER_ID)

      const uploadPost  = async (description, tags, media, getPostModules, getPostRefrenceModule) => {
        
    const metadata = {
      version: '2.0.0',
      // version : '1.0.0',
      metadata_id: uuidv4(),
      description: description,
      content: description,
      locale : "en-US",
       tags : tags,
       mainContentFocus :  'VIDEO',
       external_url: null,
      image: null,
      imageMimeType: "image/jpeg",
      name: description,
      attributes: [],
      media:[{
        item:`https://gateway.pinata.cloud/ipfs/${media}`,    
         type:  'video/mp4',
        // altTag: trackName,
        // cover : trackCover
        },
      ],
     
      animation_url : `https://gateway.pinata.cloud/ipfs/${media}`,
      appId: 'momentom',
    }
     setisLoading(true)
    const ipfsResult = await uploadToIpfs(JSON.stringify(metadata))
      console.log(ipfsResult)

      const createPostRequest = {
        profileId: FIRST_USER_ID?.id,
        contentURI: `https://gateway.pinata.cloud/ipfs/${ipfsResult.path}`,
          collectModule : getPostModules(),
           referenceModule: getPostRefrenceModule()
         }

         try{
          const result = await createPostTypedData(createPostRequest)
          const typedData = result.data.createPostTypedData.typedData;
          const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
          const { v, r, s } = splitSignature(signature);

          const tx = await lensHub.postWithSig({
            profileId: typedData.value.profileId,
            contentURI:typedData.value.contentURI,
            collectModule: typedData.value.collectModule,
            collectModuleInitData: typedData.value.collectModuleInitData,
            referenceModule: typedData.value.referenceModule,
            referenceModuleInitData: typedData.value.referenceModuleInitData,
            sig: {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          });

            setisLoading(false)
            setisSuccess(true)
          console.log(tx.hash);

         }catch (error) {
          console.log(error)
          setisLoading(false)
          setisError(true)
          setErrror(error)
          toast(error.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            
          })
          
         }

      }
  return{
    uploadPost,
    isLoading,
    isError,
    isSuccess,
    Errror
  }
  }
  export default useCreatePost