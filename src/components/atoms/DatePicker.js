// Importing react utilities
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';
import FormInput from '../atoms/FormInput'

// Getting dimensions of the screens
const { width, height } = Dimensions.get('screen');

// Importing DatePicker
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DatePicker({ labelName, focus, ...props }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState(new Date(1598051730000));

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    return (
        <View>
            {
                props.showLabel ?
                    <Text style={{ ...styles.title, ...props.label_style }}>{labelName}</Text>
                    : null
            }
            <FormInput
              //labelName="Date of birth"
              autoCompleteType='name'
              keyboardType='default'
              style={styles.input_form}
              showLabel={true}
              maxLength = {16}
              placeholder='DD/MM/YYYY'
              {...props}
            />
            {/* <TouchableOpacity style={styles.container}
                onPress={showDatePicker}>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                //date={new Date(1243125432)}
                //style={styles.container}
                //display='inline'
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                {...props}
            /> */}
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