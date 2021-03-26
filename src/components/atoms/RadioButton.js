// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RadioButton } from 'react-native-paper';
import FormInput from '../../components/atoms/FormInput';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

export default function RadioButtonComponent({ ...props }) {
    const [value, setValue] = React.useState('');

    return (
        <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
            <RadioButton.Item label="Female" value="Female" />
            <RadioButton.Item label="Male" value="Male" />
            <RadioButton.Item label="Specify another" value="Other" />
        </RadioButton.Group>
    );
}