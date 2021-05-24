// Importing react utilities
import React from 'react';

// Importing components
import { RadioButton } from 'react-native-paper';
import * as Colors from '../../styles/colors';

export default function RadioButtonComponent({ ...props }) {
    return (
        <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
            <RadioButton.Item label="Female" value="Female" color={Colors.PRIMARY}/>
            <RadioButton.Item label="Male" value="Male" color={Colors.PRIMARY}/>
            <RadioButton.Item label="Specify another" value="Other" color={Colors.PRIMARY}/>
        </RadioButton.Group>
    );
}