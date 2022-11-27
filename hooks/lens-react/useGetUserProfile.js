import {useAccount} from 'wagmi'
import {GET_ARTIST_PROFILE} from '../../graphql/query/getUserProfile'
import {useQuery} from '@apollo/client'

const useGetUserProfile = (id) =>  {
const  {address} = useAccount()
const {data :userProfile , loading : isUserProfileLoading, error : isUserProfileError} = useQuery(GET_ARTIST_PROFILE , {
    variables : {
        request : {
            "profileId" : id
        }
    }
})

return {
    userProfile,
    isUserProfileError,
    isUserProfileLoading
}

}
export default useGetUserProfile