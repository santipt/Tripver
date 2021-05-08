// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

// Importing icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

// Getting screen dimensions
const { width, height } = Dimensions.get('screen');

export default function EditButton({ labelName, showIcon, data, ...props }) {

    const [text, setText] = useState('');

    return (
        <View>
            <TouchableOpacity style={styles.description_container} onPress={props.onPress}>
                <Text style={styles.description_title}>
                    {labelName}
                </Text>
                <Text style={styles.text_input}>
                    {data}
                </Text>
                {showIcon ?
                    <Icon
                        name={props.icon}
                        color={Colors.GRAY_MEDIUM}
                        size={props.iconSize != null ? props.iconSize : 25}
                        style={styles.icon}
                    /> : null}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 10,
        marginBottom: 10,
        height: 44,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 30,
        backgroundColor: 'white',
        fontSize: 15,
    },
    title: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },

    description_container: {
        borderRadius: 14,
        padding: 8,
        marginBottom: 10,
        color: Colors.GRAY_DARK,
        borderColor: Colors.GRAY_MEDIUM,
        borderRadius: 14,
        borderWidth: 2,
    },

    description_title: {
        fontWeight: 'normal',
        fontSize: 15,
        marginLeft: 5,
    },

    text_input: {
        padding: 5,
        color: Colors.PRIMARY,
    },

    icon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: '40%',
        right: '4%'
    },
});