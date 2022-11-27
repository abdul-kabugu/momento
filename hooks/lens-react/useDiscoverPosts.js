import {useQuery} from '@apollo/client'
import {DISCOVER_POSTS} from '../../graphql/query/getTopPosts'


export const useDiscoverPosts = (tags) => {
    const {data :posts , loading : isPostsLoading, error: isPostsError} = useQuery(DISCOVER_POSTS, {
        variables : {
            request : {
                "sortCriteria":   "LATEST",  //"TOP_COLLECTED",
                "publicationTypes": ["POST", "MIRROR"],
                
                "sources":  ['momentom'],      //["audios"], 

                metadata : {
                    "mainContentFocus": ["VIDEO"],
                     "tags" : tags
                  }

            }
        }
    })

    return {posts, isPostsError, isPostsLoading}
}

export default useDiscoverPosts