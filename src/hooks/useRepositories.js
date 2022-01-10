import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortOrder, searchKeyword) => {
  let searchParameter = {};

  switch(sortOrder) {
    case 'LATEST':
      searchParameter = {orderBy: "CREATED_AT", searchKeyword}; break;
    case 'RATING_ASC':
      searchParameter = {orderBy: "RATING_AVERAGE", orderDirection: "ASC", searchKeyword}; break;
    case 'RATING_DESC':
      searchParameter = {orderBy: "RATING_AVERAGE", orderDirection: "DESC", searchKeyword}; break;
    default:
      searchParameter = {orderBy: "CREATED_AT"}; 
  }

  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables: searchParameter
  });

  return { 
    repositories: data && data.repositories,
    loading
   };
};

export default useRepositories;