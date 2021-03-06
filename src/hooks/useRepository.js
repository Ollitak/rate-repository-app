import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY,
    { variables: { id, first: 6},
     fetchPolicy: 'cache-and-network' 
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 6,
      },
    });
  };

  return { 
    repository: data && data.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
   };
};

export default useRepository;