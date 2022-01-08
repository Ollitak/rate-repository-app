import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading } = useQuery(GET_REPOSITORY,
    { variables: { id },
     fetchPolicy: 'cache-and-network' 
    }
  );

  return { 
    repository: data && data.repository,
    loading
   };
};

export default useRepository;