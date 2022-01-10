import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useHistory } from "react-router-native";
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import SignIn from './SignIn';


const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};


const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required')
    .min(1)
    .max(30),
  password: yup
    .string()
    .required('password is required')
    .min(5)
    .max(50),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')])
    .required('Password confirm is required')
});


const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: theme.colors.backGround
  },
  signUpButton: {
    backgroundColor: theme.colors.blueButtonBackground,
    borderRadius: 5,
    marginTop: 10,
  },
  signUpButtonText: {
    color: theme.colors.blueButtonText,
    textAlign: "center",
    padding: 15,
  }
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password"/>
      <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation"/>
      <Pressable style={styles.signUpButton} onPress={onSubmit}>
        <Text fontSize={"subHeading"} fontWeight={"bold"} style={styles.signUpButtonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return  (
    <SignUpContainer onSubmit={onSubmit} />
  );  
};

export default SignUp;