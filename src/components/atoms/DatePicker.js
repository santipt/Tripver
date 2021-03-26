
// import React in our code
import React, { useState } from 'react';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

const { width, height } = Dimensions.get('screen');


//import DatePicker from the package we installed
import DateInput from 'react-native-datepicker';
import RNDatePicker from '@react-native-community/datetimepicker';


export default function DatePicker({ labelName, focus, ...props }) {

    return (
        <View>
            {
                props.showLabel ?
                    <Text style={{ ...styles.title, ...props.label_style }}>{labelName}</Text>
                    : null
            }
            <DateInput
                iOSDatePickerComponent={(props) => (<RNDatePicker {...props} display={Platform.OS === 'ios' ? 'spinner' : 'default'} />)}
                style={styles.datePickerStyle}
                mode="date" // The enum of date, datetime and time
                placeholder="Select date"
                format="DD-MM-YYYY"
                minDate="01-01-1920"
                maxDate="11-10-2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        display: 'none',
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                    },
                    dateInput: {
                        borderWidth: 0,
                        height: height / 15,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 30,
                        backgroundColor: 'white',
                        fontSize: 15,
                        alignItems: 'flex-start',
                    },
                }}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title:{
        marginLeft:10,
        fontWeight: 'bold',
        color: Colors.BLACK,
      },
    datePickerStyle: {
        width: width / 1.2,
        marginTop: 10,
    marginBottom: 30,

    },
});