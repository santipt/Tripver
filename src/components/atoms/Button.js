// Importing react utilities
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';

export default function Button({...props}) {

    return(
    <TouchableOpacity style={{...styles.button_container, ...props.style}} onPress={props.onPress}>
        <Text style={{...styles.button_text, ...props.textStyle, ...props.showIcon ? styles.button_text_icon : null}}>{props.title}</Text>
        { props.showIcon ?
        <Icon
          name='arrowright'
          color={Colors.WHITE}
          style={styles.icon}
          size={20}
        /> : null}
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button_container: {
        backgroundColor: Colors.SECONDARY,
        borderRadius: 30,
        padding: 10,
        width:'50%',
        margin: 8,
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    button_text: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.WHITE,
        flex:1,
    },
    icon:{
        marginRight:0,
    },
    button_text_icon:{
        marginLeft:15,
    }
}); 