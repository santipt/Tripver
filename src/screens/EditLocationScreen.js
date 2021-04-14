// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../styles/colors';
import GoogleInput from '../components/atoms/Google/GoogleInput';
import GlobalStyles from '../styles/GlobalStyles';

// Importing image paths
import { images } from '../utils/images'

export default function SettingsScreen({ navigation }) {
    const [currentLocation, setCurrentLocation] = useState('');

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                <View style={styles.header}>
                    <Icon
                        name='closecircleo'
                        color={Colors.WHITE}
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.title}>Location</Text>
                    <Icon
                        name='checkcircleo'
                        color={Colors.WHITE}
                        size={30}
                        onPress={() => navigation.navigate('EditProfile', { newLocation: currentLocation })}
                    />
                </View>
                <View style={styles.card_container}>
                    <Card containerStyle={styles.card}>
                        <View style={styles.input_container}>
                            <GoogleInput
                                style={googleInputStyle}
                                disableScroll={true}
                                onPress={(data, details = null) => {
                                    setCurrentLocation(data.description)
                                }}
                            ></GoogleInput>
                        </View>
                    </Card>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    container: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    title: {
        fontSize: 25,
        color: Colors.WHITE,
    },
    card_container: {
        position: 'relative'
    },
    card: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        margin: 0,
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    input_container: {
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 2,
        borderRadius: 30,
        padding: 1.8,
    },
});

const googleInputStyle = StyleSheet.create({
    container: {
        flex: 0,
        width: '100%',
        borderRadius: 30,
    },
    textInputContainer: {
        flexDirection: 'row',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 35,
        borderRadius: 30,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        width: '135%',
        marginTop: 3,
    },
    listView: {
    },
    row: {
        backgroundColor: '#FFFFFF',
        padding: 13,
        height: 44,
        flexDirection: 'row',
        borderRadius: 30,
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