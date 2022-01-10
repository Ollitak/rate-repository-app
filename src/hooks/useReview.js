import { useMutation, useApolloClient } from "@apollo/client";
import { NEW_REVIEW } from "../graphql/mutations";



const useReview = () => {
  const [mutate, result] = useMutation(NEW_REVIEW);
  const apolloClient = useApolloClient();

  const review = async ({ repositoryName, ownerName, rating, text }) => {
    const response = await mutate(
      { variables: { review: { repositoryName, ownerName, rating: parseInt(rating), text } } }
    );
    
    const { data } = response;

    if(data && data.createReview) {
      console.log("Sending a new review");
      await apolloClient.resetStore();
    }

    return response;
  };

  return [review, result];
};

export default useReview;


