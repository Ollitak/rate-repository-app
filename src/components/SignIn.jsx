import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router-native";


const initialValues = {
  username: "kalle",
  password: "password",
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: theme.colors.backGround
  },
  signInButton: {
    backgroundColor: theme.colors.blueButtonBackground,
    borderRadius: 5,
    marginTop: 10,
  },
  signInButtonText: {
    color: theme.colors.blueButtonText,
    textAlign: "center",
    padding: 15,
  }
});


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .required('password is required'),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <FormikTextInput testID="usernameInput" name="username" placeholder="Username"/>
      <FormikTextInput testID="passwordInput" name="password" placeholder="Password"/>
      <Pressable testID="submitButton" style={styles.signInButton} onPress={onSubmit}>
        <Text fontSize={"subHeading"} fontWeight={"bold"} style={styles.signInButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      //console.log(data.authorize.accessToken);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return  (
    <SignInContainer onSubmit={onSubmit} />
  );  
};

export default SignIn;