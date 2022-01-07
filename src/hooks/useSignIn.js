import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from "react-router-native";



const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);
  const authStorage = useAuthStorage();
  let history = useHistory();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { data: { username, password } } });
    
    const { data } = response;

    if(data && data.authorize) {
      console.log("Storing access token: " + data.authorize.accessToken);
      await authStorage.setAccessToken(data.authorize.accessToken);
      history.push("/");
      await apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;