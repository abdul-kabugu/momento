import {useLazyQuery} from '@apollo/client'
import {GET_POST_COMMENTS} from '../../graphql/query/getPostComments'
  const useGetPostComments = (postId) =>  {
    const [getComments, {data : postComments, loading : isGetPostComentsLoading, error : isGetPostCommentsError}] = useLazyQuery(GET_POST_COMMENTS, {

        variables : {
            request : {
                commentsOf :    postId,
            }
        }
    })

    return {
        getComments,
        isGetPostComentsLoading,
        isGetPostCommentsError,
        postComments

    }
  }
  export default useGetPostComments