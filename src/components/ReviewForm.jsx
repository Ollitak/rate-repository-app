import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import useReview from '../hooks/useReview';


const initialValues = {
  repositoryName: "",
  ownerName: "",
  rating: "",
  text: "",
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    backgroundColor: theme.colors.backGround
  },
  sendButton: {
    backgroundColor: theme.colors.blueButtonBackground,
    borderRadius: 5,
    marginTop: 10,
  },
  sendButtonText: {
    color: theme.colors.blueButtonText,
    textAlign: "center",
    padding: 15,
  }
});

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  ownerName: yup
    .string()
    .required('Owner is required'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup
    .string()    
});

const ReviewFormLayout = ({ onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <FormikTextInput name="repositoryName" placeholder="Repository"/>
      <FormikTextInput name="ownerName" placeholder="Owner"/>
      <FormikTextInput name="rating" placeholder="Rating"/>
      <FormikTextInput name="text" placeholder="Text"/>
      <Pressable style={styles.sendButton} onPress={onSubmit}>
        <Text fontSize={"subHeading"} fontWeight={"bold"} style={styles.sendButtonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};


export const ReviewFormContainer = ({ onSubmit }) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema} >
      {({ handleSubmit }) => <ReviewFormLayout onSubmit={handleSubmit} />}
    </Formik>
  );
};

const ReviewForm = () => {
  // Eli tehdään repon reviewiin tarkoitettu lomake seuraavaksi
  // Routet tehty valmiiksi ja toimii, myös mutation tehty (hook puuttuu)
  // 1) Seuraavaksi tee formi samaa tapaa noudattaen kuin signinissä, testaa ensin
  // että joku mock-onsubmit toimii consoleen
  // 2) Sitten implementoi arvostelun lähettämiseen tarvvittava hook, todnäk aika samalla
  // tavalla kuin sign inissä käytetty hook, eli tarjotaan asynkroninen funktio
  // onsubmit nappulalle ja muistetaan resetoida kaikki queryt niin data päivittynee
  const history = useHistory();
  const [ review ] = useReview();
  
  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const { data } = await review({ repositoryName, ownerName, rating, text });
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return  (
    <ReviewFormContainer onSubmit={onSubmit} />
  ); 
};


export default ReviewForm;