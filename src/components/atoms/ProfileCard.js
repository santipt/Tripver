// Importing react utilities
import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

// Importing components
import * as Colors from '../../styles/colors';
import { kitty } from '../../chatkitty';
import { calculateDistance, getCurrentLocation } from '../../firebase/Logic';



export default function ProfileCard({ title, age, location, lastLocation, profilePicture, onPress, chatkittyId, profileUserId, ...props }) {

    const [channelName, setChannelName] = useState(title);
    const [distance, setDistance] = useState('');

    const navigation = useNavigation();

    const NUM_OF_LINES = 1;

    useEffect(() => {
        getCurrentLocation().then(res => {
            var dis = calculateDistance(res.coords.latitude, res.coords.longitude, lastLocation.latitude, lastLocation.longitude)
            setDistance(dis);
        });
    }, []);

    function goToChat() {

        if (channelName.length > 0) {
            kitty
                .createChannel({
                    type: 'DIRECT',
                    members: [{ id: chatkittyId }],
                })
                .then((result) => {
                    // "Home chat" is the name of the navigation screen in TabsNavigator
                    //console.log(result.channel.id)
                    // TO DO: Close the chat screen everytime the user leaves de chat
                    navigation.navigate('Home chat', { channel: result.channel, redirect: true });
                });
        }
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ShowProfile', { userId: profileUserId, chatkittyId: chatkittyId })}>
            <Card containerStyle={styles.card_container}>
                <View style={styles.container}>
                    <View>
                        <Avatar
                            size="xlarge"
                            width={styles.profile_picture.width}
                            height={styles.profile_picture.height}
                            rounded
                            source={{ uri: profilePicture }}
                            imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                        />
                        <Text style={styles.distance}>{distance} Km</Text>
                    </View>
                    <View style={styles.text_container}>
                        <Text style={styles.title} numberOfLines={NUM_OF_LINES} >{title}, {age}</Text>
                        <Text style={styles.location} numberOfLines={NUM_OF_LINES} >{location}</Text>
                    </View>
                    <Avatar
                        size="medium"
                        width={styles.profile_picture.width}
                        height={styles.profile_picture.height}
                        rounded
                        icon={{ name: 'chat', color: Colors.SECONDARY, size: 25, }}
                        imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                        containerStyle={styles.open_chat}
                        onPress={() => goToChat()}
                    ></Avatar>
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card_container: {
        flex: 1,
        borderRadius: 12,
        height: '50%',
    },
    container: {
        flexDirection: 'row',
    },
    text_container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    profile_picture: {
        width: 60,
        height: 60,
        alignSelf: 'flex-start',
    },
    title: {
        marginLeft: 20,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
    },
    location: {
        marginLeft: 20,
        width:180
    },
    distance: {
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: -10,
        color: Colors.GRAY_DARK,
        fontSize: 12,
    },
    open_chat: {
        alignSelf: 'center',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: 'white',
        position: 'absolute',
        right: 0

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