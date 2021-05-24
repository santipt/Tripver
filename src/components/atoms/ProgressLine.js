// Importing react utilities
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

export default function ProgressLine({ labelName, ...props }) {
    return (
        <View style={styles(props).line}>
            <View style={styles.child}>
      		</View>
        </View>
    );
}

const styles = (props) => StyleSheet.create({
    line: {
        width: props.value, 
        backgroundColor: Colors.SECONDARY, 
        height: '1.2%',
        borderRadius:10,
    },
});
