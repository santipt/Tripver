// Importing react utilities
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

const { width, height } = Dimensions.get('screen');

export default function FormButton({ title, ...props }) {
  return (
    <TouchableOpacity style={{ ...styles.button_container, ...props.style }} onPress={props.onPress}>
      <Text style={{ ...styles.button_text, ...props.textStyle }}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button_container: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: 30,
    padding: 10,
    width: width / 2,
    height: height / 15,
    marginTop: 10,
  },
  button_text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});