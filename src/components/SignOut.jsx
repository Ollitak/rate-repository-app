import React, { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';
import { useHistory } from "react-router-native";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    const token = authStorage.getAccessToken();
    console.log("TOKEN: " + token);
    await apolloClient.resetStore();
    history.push("/");
  };

  useEffect(() => {
    signOut();
  }, []);

  return (
    <></>
  );
};

export default SignOut;