import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortOrder, searchKeyword, first) => {
  let searchParameter = {};

  switch(sortOrder) {
    case 'LATEST':
      searchParameter = {orderBy: "CREATED_AT", searchKeyword, first}; break;
    case 'RATING_ASC':
      searchParameter = {orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword, first}; break;
    case 'RATING_DESC':
      searchParameter = {orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword, first}; break;
    default:
      searchParameter = {orderBy: "CREATED_AT"}; 
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables: searchParameter
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log("fetching more repositories...");
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        searchParameter,
      },
    });
  };

  return { 
    repositories: data && data.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
   };
};

export default useRepositories;