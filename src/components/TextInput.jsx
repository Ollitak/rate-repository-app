import React from 'react';
import { TextInput as NativeTextInput, View, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  common: {
    borderWidth: 1,
    borderColor: theme.colors.appBarBackground,
    borderRadius: 5,
  },
  sizeLarge: {
    padding: 10,
    marginBottom: 5,
  },
  error: {
    borderColor: theme.colors.error,
  }
});

const TextInput = ({ style, size, error, ...props }) => {
  const textInputStyle = [
    styles.common,
    size === "large" && styles.sizeLarge,
    error && styles.error,
  ];

  return (
    <NativeTextInput style={textInputStyle} {...props} />
  );
};

export default TextInput;