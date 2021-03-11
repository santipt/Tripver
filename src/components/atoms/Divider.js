// Importing react utilities
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Text, View,} from 'react-native';

// Importing components
import * as Colors from '../../styles/colors';

export default function Divider({ ...props }) {

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...props.style }}>
            <View style={{ height: 1, backgroundColor: Colors.WHITE, width: '35%' }} />
            <View>
                <Text style={{ width: 50, textAlign: 'center', fontSize:10, color: Colors.WHITE }}>OR</Text>
            </View>
            <View style={{ height: 1, backgroundColor: Colors.WHITE, width: '35%' }} />
        </View>
    )
}