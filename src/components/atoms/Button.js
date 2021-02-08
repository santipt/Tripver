// Importing react utilities
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

export default function Button({...props}) {
    return(
    <TouchableOpacity style={{...styles.button_container, ...props.style}} onPress={props.onPress}>
        <Text style={{...styles.button_text, ...props.textStyle}}>{props.title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_container: {
        backgroundColor: Colors.SECONDARY,
        borderRadius: 30,
        padding: 10,
        width:'50%',
    },
    button_text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
}); 