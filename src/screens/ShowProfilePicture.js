// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

import { StyleSheet, View, SafeAreaView, Text, TextInput, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

// Importing components
import * as Colors from '../styles/colors';
import Loading from '../components/atoms/Loading';

// Importing icons
import Icon from 'react-native-vector-icons/Ionicons';

// Importing image paths
import { images } from '../utils/images'

export default function ShowProfilePicture({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    var profilePicture = route.params;

    // TO DO: No funciona cargar hasta que la img este cargada
    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                <View style={styles.container}>
                    <View style={styles.settings_icon}>
                        <Icon
                            name='close'
                            color='white'
                            size={30}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <ReactNativeZoomableView
                        maxZoom={2}
                        minZoom={1}
                        zoomStep={0.5}
                        initialZoom={1}
                        bindToBorders={true}
                    >
                        <Image source={{ uri: profilePicture }} resizeMode="contain" style={styles.profile_picture} onLoadStart={() => setLoading(false)} onLoadEnd={() => setLoading(false)}></Image>
                    </ReactNativeZoomableView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    container: {
        flex: 1,
    },
    settings_icon: {
        flexWrap: 'wrap-reverse',
        marginTop: 15,
        marginRight: 15,
    },
    profile_picture: {
        flex: 1,
    },
});