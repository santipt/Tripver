
// Importing react utilities
import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...rest }) {
  return (
      <TextInput
          label={labelName}
          style={styles.input}
          {...rest}
      />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.2,
    height: height / 15,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    paddingLeft:15,
  },
});