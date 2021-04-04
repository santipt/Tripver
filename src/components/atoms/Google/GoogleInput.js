// Importing react utilities
import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../../styles/colors';

export default function GoogleInput({ labelName, focus, ...props }) {
    return (
        <View>
            {
                props.showLabel ?
                    <Text style={{ ...styles.title, ...props.label_style }}>{labelName}</Text>
                    : null
            }
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    styles={focus ? googleInputStyle : googleInputStyle2}
                    isRowScrollable={false}
                    enablePoweredByContainer={false}
                    autoFocus={true}
                    keyboardShouldPersistTaps='always'
                    placeholder='Search city'
                    fetchDetails={true}
                    onFail={(error) => console.error(error)}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        //console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyC_iGZnODFXnCUCOF_gRwja3-kmHnF-PAY',
                        language: 'en',
                        types: '(cities)',
                    }}
                    filterReverseGeocodingByTypes={[
                        'locality',
                        'administrative_area_level_3',
                      ]}
                    renderDescription={(row) => row.description || row.vicinity}
                    //disableScroll={true}
                    //currentLocation={true}
                    //currentLocationLabel='Current location'
                    //minLength={3}
                    {...props}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexDirection:'row',
    },
    title: {
        marginLeft: 10,
        fontWeight: 'bold',
        color: Colors.BLACK,
        marginBottom: 10,
    },
});

const googleInputStyle = StyleSheet.create({
    container: {
        flex: 0,
        width: '82%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: 30,
        backgroundColor:Colors.WHITE,
    },
    textInputContainer: {
        flexDirection: 'row',
        marginBottom: -10,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        width: '135%'
    },
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 30,
    },
});

const googleInputStyle2 = StyleSheet.create({
    container: {
        flex: 0,
        width: '82%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginBottom: 30,
    },
    textInputContainer: {
        flexDirection: 'row',
        marginBottom: -10,
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 44,
        borderRadius:30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        width: '135%'
    },
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 30,
    },
});