// Importing react utilities
import React from 'react';

import { RadioButton } from 'react-native-paper';

// Importing components
import * as Colors from '../../styles/colors';


export default function RadioButtonComponent({ ...props }) {
    return (
        <RadioButton.Group onValueChange={props.onValueChange} value={props.value}>
            <RadioButton.Item label="Female" value="female" color={Colors.PRIMARY}/>
            <RadioButton.Item label="Male" value="male" color={Colors.PRIMARY}/>
            <RadioButton.Item label="Specify another" value="other" color={Colors.PRIMARY}/>
        </RadioButton.Group>
    );
}