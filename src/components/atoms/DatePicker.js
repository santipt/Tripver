// Importing react utilities
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';
import FormInput from '../atoms/FormInput'

// Getting dimensions of the screens
const { width, height } = Dimensions.get('screen');

export default function DatePicker({ labelName, focus, ...props }) {
  
    return (
        <View>
            <FormInput
              labelName="Date of birth"
              autoCompleteType='name'
              style={styles.input_form}
              showLabel={true}
              maxLength = {16}
              placeholder='DD/MM/YYYY'
              keyboardType='default'
              {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    input_form: {
        marginBottom: 30,
      },
      
    container: {
        borderWidth: 0,
        height: 44,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        backgroundColor: Colors.WHITE,
        alignItems: 'flex-start',
        width: width / 1.2,
        marginTop: 10,
        marginBottom: 30,
    },
    placeholderText: {
        color: Colors.GRAY_MEDIUM
    },
    text: {
        width: '100%',
        paddingVertical: 8,
        color: Colors.GRAY_DARK,
        fontSize: 15,
    },
});