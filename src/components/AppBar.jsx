import React from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.appBarBackground,
  },
  buttonItem: {
    flexGrow: 0,
  },
  tabText: {
    color: "white",
    padding: 10,
  }
});

const Tab = ({ linkTo, tabName }) => {
  return (
    <Pressable style={styles.buttonItem}>
      <Link to={linkTo}>
        <Text fontWeight={"bold"} style={styles.tabText}>{tabName}</Text>
      </Link>
    </Pressable>
  );
};

const OnLoggedIn = () => {
  return (
    <View style={styles.container}>
    <ScrollView horizontal>
      <Tab linkTo={"/"} tabName={"Repositories"}></Tab>
      <Tab linkTo={"/myreviews"} tabName={"My reviews"}></Tab>
      <Tab linkTo={"/reviewform"} tabName={"Give a review"}></Tab>
      <Tab linkTo={"/signout"} tabName={"Sign out"}></Tab>
    </ScrollView>
  </View>
  ); 
};

const OnLoggedOut = () => {
  return (
    <View style={styles.container}>
    <ScrollView horizontal>
      <Tab linkTo={"/"} tabName={"Repositories"}></Tab>
      <Tab linkTo={"/signin"} tabName={"Sign in"}></Tab>
      <Tab linkTo={"/signup"} tabName={"Sign up"}></Tab>
    </ScrollView>
  </View>
  ); 
};

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);
  if(data && data.authorizedUser){
    console.log("ACCESS TOKEN OK - USER FOUND");
  } else {
    console.log("ACCESS TOKEN NOT FOUND");
  }

  return data && data.authorizedUser ? <OnLoggedIn /> :  <OnLoggedOut />;

};

export default AppBar;