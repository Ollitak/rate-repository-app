import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  username: "",
  password: "",
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
      <FormikTextInput name="username" placeholder="Username"/>
      <FormikTextInput name="password" placeholder="Password"/>
      <Pressable style={styles.signInButton} onPress={onSubmit}>
        <Text fontSize={"subHeading"} fontWeight={"bold"} style={styles.signInButtonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    console.log(`Username: ${username} , password: ${password}`);
  };

  return  (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );  
};

export default SignIn;