import {useQuery} from '@apollo/client'
import {GET_TOP_CREATORS} from '../../graphql/query/get-top-creators'
  const useGetTopCreators = () => {
    const {data : topCreators, loading : isTopCreatorsLoading, error : isTopCreatorsError} = useQuery(GET_TOP_CREATORS)
     
    return{
        topCreators,
        isTopCreatorsError,
        isTopCreatorsLoading
    }
  }

  export default useGetTopCreators