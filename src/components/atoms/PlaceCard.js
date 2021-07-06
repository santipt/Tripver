// Importing react utilities
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, Platform, Image, Linking } from 'react-native';
import { Avatar } from 'react-native-elements';
import { showLocation } from 'react-native-map-link'
import Star from 'react-native-star-view';

// Importing components
import * as Colors from '../../styles/colors';
import { calculateDistance } from '../../firebase/Logic';


export default function PlaceCard({ title, picture, rating, location, id, onPress, ...props }) {

    const [distance, setDistance] = useState(0);
    const NUM_OF_LINES = 1;

    function openGoogleMaps() {

        showLocation({
            latitude: location.lat,
            longitude: location.lng,
            //sourceLatitude: -8.0870631,  // optionally specify starting location for directions
            //sourceLongitude: -34.8941619,  // not optional if sourceLatitude is specified
            title: title,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: id,  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            //cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            //appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
            naverCallerName: 'com.example.myapp' // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    }

    useEffect(() => {
        // Calculate distance
        var dis = calculateDistance(location.lat, location.lng, 54.354755007573054, 18.65669404988337)
        setDistance(dis)
    }, [])

    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log('Show more info about the place')}>
            <View style={styles.card_container}>
                <Image style={styles.image} source={{ uri: picture }} />
                <View style={styles.info_container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={NUM_OF_LINES}>
                            {title}
                        </Text>
                        <Star
                            score={rating}
                            style={styles.rating}
                        />
                    </View>
                    <Avatar
                        size="medium"
                        width={styles.icon.width}
                        height={styles.icon.height}
                        rounded
                        source={require('../../assets/images/2.png')}
                        imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                        containerStyle={styles.open_maps}
                        onPress={() => openGoogleMaps()}
                    ></Avatar>
                    <Text style={styles.km}>
                        {distance}km
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card_container: {
        flex: 1,
        margin: 15,
        height: 200,
        borderRadius: 12,
        backgroundColor: Colors.WHITE,
        overflow: 'hidden', // In order to show the image with round borders on the top
    },
    image: {
        width: '100%',
        height: '40%'
    },
    info_container: {
        padding: 12,
    },
    textContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    },
    rating: {
        paddingVertical: 10,
        width: 140,
        height: 25,
        marginTop: 5,
        marginBottom: 20
    },
    km: {
        color: Colors.GRAY_DARK,
        position: 'absolute', 
        left: 10,
        bottom: -18, 
    },
    icon: {
        width: 10,
        height: 10,
    },
    open_maps: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: Colors.WHITE,
        position: 'absolute',
        top: 50,
        right: 20,
        padding: 10,
    },
    chat: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            },
            android: {
                // It doesn't work
                elevation: 5,
            },
        })
    },
});