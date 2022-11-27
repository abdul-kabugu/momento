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

const CREATE_COLLECT_TYPED_DATA = `
  mutation($request: CreateCollectRequest!) { 
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
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
        pubId
        data
      }
     }
   }
 }
`;

// TODO typings
const createCollectTypedData = (createCollectTypedDataRequest) => {
    return apolloClient.mutate({
      mutation: gql(CREATE_COLLECT_TYPED_DATA),
      variables: {
        request: createCollectTypedDataRequest,
      },
    });
  };

  const useCollect = () => {
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

  const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
   const FIRST_USER_ID = userProfileIds?.profiles?.items[0] 

    const collecPublication = async (postId) => {
        setisLoading(true)
        const collectRequest = {
            publicationId: postId,
         }

         try{
            const result = await createCollectTypedData(collectRequest);
            const typedData = result.data.createCollectTypedData.typedData;
            const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
            const { v, r, s } = splitSignature(signature);
       
            const tx = await lensHub.collectWithSig({
               collector: address,
               profileId: typedData.value.profileId,
               pubId: typedData.value.pubId,
               data: typedData.value.data,
               sig: {
                 v,
                 r,
                 s,
                 deadline: typedData.value.deadline,
               },
             });
             console.log(tx.hash);
             setisLoading(false)
             setisSuccess(true)
           } 
               
           
            catch (error) {
               alert(error)
               setisLoading(false)
               setisError(true)
               setErrror(error.message)
               
            }
    }
    return{
        collecPublication,
        isError,
        isLoading,
        isSuccess,
        Errror
    }
  }

  export default useCollect