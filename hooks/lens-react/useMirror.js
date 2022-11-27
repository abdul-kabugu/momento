import {gql} from '@apollo/client'
import {signText, splitSignature, signedTypeData} from '../../utils/ether-service'
import {useAccount} from "wagmi"
import {lensHub} from '../../utils/lens-hub'
import LENS_ABI from '../../abi/LENS_ABI.json'
import {v4 as uuidv4} from 'uuid'
import {apolloClient} from '../../graphql/apollo/apoloClient'
import {useState} from 'react'
import useGetUserProfileId from './useGetUserPrfileId'
import useUploadToIPFS from './useIPFSupload'

const CREATE_MIRROR_TYPED_DATA = `
mutation($request: CreateMirrorRequest!) { 
  createMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
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
      profileIdPointed
      pubIdPointed
      referenceModuleData
      referenceModule
      referenceModuleInitData
    }
   }
 }
}
`;

// TODO types
const createMirrorTypedData = (createMirrorTypedDataRequest) => {
return apolloClient.mutate({
  mutation: gql(CREATE_MIRROR_TYPED_DATA),
  variables: {
    request: createMirrorTypedDataRequest,
  },
});
};

const useMirror = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

  const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
   const FIRST_USER_ID = userProfileIds?.profiles?.items[0] 

  

  const mirrorPublications = async (postId) => {
    setisLoading(true)
    const createMirrorRequest = {
        profileId : FIRST_USER_ID.id,
        publicationId: postId,
        referenceModule: {
            followerOnlyReferenceModule: false,
          },
      }

      try{
        const result = await createMirrorTypedData(createMirrorRequest);
        const typedData = result.data.createMirrorTypedData.typedData;
        const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
        const { v, r, s } = splitSignature(signature);
  
        const tx = await lensHub.mirrorWithSig({
          profileId: typedData.value.profileId,
          profileIdPointed: typedData.value.profileIdPointed,
          pubIdPointed: typedData.value.pubIdPointed,
          referenceModuleData: typedData.value.referenceModuleData,
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
      } catch (error) {
          console.log(error)
          setisLoading(false)
          setisError(true)
          setErrror(error.message)
          
      }
    
  }

  return {
    mirrorPublications,
    isError,
    isLoading,
    Errror
  }
}
export default useMirror