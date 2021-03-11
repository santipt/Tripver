// Importing react utilities
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// Importing icons

// Importing components
import * as Colors from '../../../styles/colors';

export default function GoogleButton({...props}) {

    return(
    <TouchableOpacity style={props.longButton ? {...styles.long_button_container, ...props.style}:{...styles.button_container, ...props.style}} onPress={props.onPress}>
        { props.showIcon ?
        <Image style={props.longButton ? styles.long_google_icon : styles.google_icon }source={require('../../../assets/images/googleIcon.png')} /> : null}
        <Text style={{...styles.button_text, ...props.textStyle, ...props.showIcon ? styles.button_text_icon : null}}>{props.title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_container: {
        backgroundColor: Colors.WHITE,
        borderRadius: 30,
        padding: 10,
        width:'50%',
        margin: 8,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    long_button_container:{
        backgroundColor: Colors.WHITE,
        borderRadius: 30,
        padding: 10,
        width:'83%',
        margin: 8,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    button_text: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
        flex:1,
        marginRight:35,
    },
    google_icon:{
        marginLeft:0,
        marginTop:-2,
        height:'120%',
        width:'15%',
    },
    long_google_icon:{
        marginLeft:0,
        marginTop:-1,
        height:'110%',
        width:'8%',
    },
    button_text_icon:{
        marginLeft:15,
    },
}); 