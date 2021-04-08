// Importing react utilities
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Importing icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing components
import * as Colors from '../../styles/colors';

export default function CircleButton({ ...props }) {
    return (
        <TouchableOpacity style={{ ...styles.container, ...props.style }} onPress={props.onPress}>
            <Icon
                name={props.icon}
                color={Colors.SECONDARY}
                style={{...styles.icon, ...props.iconStyle}}
                size={props.iconSize} //60
            />
            { props.showText ?
                <Text style={{ ...styles.button_text, ...props.textStyle}}>{props.title}</Text>
                : null}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 7,
        borderColor: Colors.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 100,
        borderColor: Colors.WHITE
    },
    button_text: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginTop:10,
    },
});