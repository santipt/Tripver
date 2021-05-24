// Importing react utilities
import React from 'react';
import { Dimensions, StyleSheet, TextInput, Text, View } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

// Getting screen dimensions
const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, ...props }) {
  return (
    <View>
      {
        props.showLabel ?
          <Text style={{...styles.title, ...props.label_style}}>{labelName}</Text>
          : null
      }
      <TextInput
        label={labelName}
        style={{ ...styles.input, ...props.style }}
        placeholder={labelName}
        textContentType={props.textContentType}
        secureTextEntry={props.secureTextEntry}
        autoCompleteType={props.autoCompleteType}
        keyboardType={props.keyboardType}
        autoCapitalize={props.autoCapitalize}
        onChangeText={props.onChangeText}
        maxLength={props.maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.2,
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 10,    
    borderRadius: 30,
    backgroundColor: 'white',
    fontSize: 15,
  },
  title:{
    marginLeft:10,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
});