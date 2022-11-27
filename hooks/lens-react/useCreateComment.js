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

const CREATE_COMMENT_TYPED_DATA = `
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
        referenceModuleData
      }
     }
   }
 }
`;
// TODO types
const createCommentTypedData = (createCommentTypedDataRequest) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};
 const useCreateComment = () =>  {
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [isSuccess, setisSuccess] = useState(false)
    const [Errror, setErrror] = useState("")
  const {address, isConnected} = useAccount()

  const {userProfileIds, isUserProfileIdsError, isUserProfileIdsLoading}  = useGetUserProfileId() 
   const FIRST_USER_ID = userProfileIds?.profiles?.items[0] 
  const {uploadToIpfs} = useUploadToIPFS()
     const createComment = async (caption, postId) => {
        setisLoading(true)
        const metadata = {
            version: '1.0.0',
            metadata_id: uuidv4(),
            description: caption,
            content: caption,
            external_url: null,
            image: null,
            imageMimeType: null,
            name: caption,
            attributes: [],
            media: [],
            appId: 'momentom',
          }

          const ipfsResult = await uploadToIpfs(JSON.stringify(metadata))
          console.log(ipfsResult)

          const createCommentRequest = {
            profileId : FIRST_USER_ID.id,
            publicationId :  postId,     
            contentURI: `https://gateway.pinata.cloud/ipfs/${ipfsResult.path}`, 
            collectModule : {
                freeCollectModule : {
                   followerOnly : false
                }
                },
                referenceModule: {
                   followerOnlyReferenceModule: false,
                 },  
                }

                try{
                    const result = await createCommentTypedData(createCommentRequest);
                    const typedData = result.data.createCommentTypedData.typedData;
                    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
                    const { v, r, s } = splitSignature(signature);
                      
                    const tx = await lensHub.commentWithSig({
                        profileId: typedData.value.profileId,
                        contentURI: typedData.value.contentURI,
                        profileIdPointed: typedData.value.profileIdPointed,
                        pubIdPointed: typedData.value.pubIdPointed,
                        collectModule: typedData.value.collectModule,
                        collectModuleInitData: typedData.value.collectModuleInitData,
                        referenceModule: typedData.value.referenceModule,
                        referenceModuleInitData: typedData.value.referenceModuleInitData,
                        referenceModuleData: typedData.value.referenceModuleData,
                        sig: {
                          v,
                          r,
                          s,
                          deadline: typedData.value.deadline,
                        },
                      });
                      setisLoading(false)
                      setisSuccess(true)
                      console.log('create comment: tx hash', tx.hash);
    
                    }catch (error) {
                        alert(error)
                        setisLoading(false)
                        setErrror(error.message)
                         setisError(true)
                    }
     }

     return {
      createComment,
       Errror,
       isLoading,
       isError
     }

 }

 export default useCreateComment
