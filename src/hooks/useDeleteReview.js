import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";



const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();

  const deleteReview = async (id) => {
    const response = await mutate({ variables: { id: id } });    
    const { data } = response;

    if(data && data.deleteReview) {
      await apolloClient.resetStore();
    }

    return response;
  };

  return [deleteReview, result];
};

export default useDeleteReview;


