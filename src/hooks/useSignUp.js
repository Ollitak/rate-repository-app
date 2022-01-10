import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";



const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    const response = await mutate({ variables: { user: { username, password } } });
    console.log("Created a new user");
    apolloClient.resetStore();
    
    return response;
  };
  return [signUp, result];
};

export default useSignUp;