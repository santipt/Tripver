// Importing react utilities
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

export default function Link({...props}) {
    return(
    <TouchableOpacity style={{...styles.button_container, }} onPress={props.onPress}>
        <Text style={{...styles.button_text, ...props.textStyle, ...props.style}}>{props.title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_container: {
    },
    button_text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
}); 