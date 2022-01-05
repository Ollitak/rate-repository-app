import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.appBarBackground,
    height: 60,
  },
  buttonItem: {
    flexGrow: 1,
  },
  textFormatting: {
    color: "white",
  }
});

const AppBar = () => {
  return (
   <View style={styles.container}>
    <Pressable style = {styles.buttonItem}>
      <Text fontWeight={"bold"} style={styles.textFormatting}>Repositories</Text>
    </Pressable>
  </View>
  );
};

export default AppBar;