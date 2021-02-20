// Importing react utilities
import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

// Getting screen dimensions
const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...props }) {
  return (
      <TextInput
        label={labelName}
        style={{...styles.input, ...props.style}}
        placeholder={labelName}
        textContentType={props.textContentType}
        secureTextEntry={props.secureTextEntry}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}        
        autoCapitalize={props.autoCapitalize}
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
    paddingLeft: 15,
  },
});