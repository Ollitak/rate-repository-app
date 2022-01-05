import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';


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
    padding: 10,
    color: "white",
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

const AppBar = () => {
  return (
   <View style={styles.container}>
    <Tab linkTo={"/"} tabName={"Repositories"}></Tab>
    <Tab linkTo={"/signin"} tabName={"Sign in"}></Tab>
  </View>
  );
};

export default AppBar;