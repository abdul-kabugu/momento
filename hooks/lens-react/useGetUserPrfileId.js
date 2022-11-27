import {useQuery} from '@apollo/client'
import {GET_USER_PROFILE_IDS} from '../../graphql/query/getUserProfileId'
import {useAccount} from 'wagmi'


const  useGetUserProfileId = () =>  {
    const {address} = useAccount()
    const {data : userProfileIds, loading :isUserProfileIdsLoading, error : isUserProfileIdsError } = useQuery(GET_USER_PROFILE_IDS, {
        variables : {
            request : {
                ownedBy : [address]
            }
        }
    })
  return {
    userProfileIds,
     isUserProfileIdsLoading,
     isUserProfileIdsError
  }
}

export default useGetUserProfileId


