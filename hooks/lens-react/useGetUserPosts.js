import {useQuery} from '@apollo/client'
import {GET_USER_POSTS} from '../../graphql/query/getUserPosts'

   export const useGetUserPosts = (id) => {
    const {data : userPosts, loading : isUserPostsLoading, error : isUserPostsError} = useQuery(GET_USER_POSTS,{
        variables : {
            request : {
                "profileId": id,
                "publicationTypes": ["POST",  "MIRROR"],
                 
                "sources":  ["momentom"]   //["audios"]
            }
        }
    })

     return{
        userPosts, isUserPostsLoading, isUserPostsError
     }
   }
