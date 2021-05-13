// Importing react utilities
import React, { useContext, useState, } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { View } from 'react-native';
import { Dimensions, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// Importing components
import * as Colors from '../../styles/colors';
import { kitty } from '../../chatkitty';
import { AuthContext } from '../../navigation/AuthProvider';


export default function ProfileCard({ title, age, location, profile_picture, onPress, id, ...props }) {

    const { user, userId } = useContext(AuthContext);
    const [channelName, setChannelName] = useState(title);
    const navigation = useNavigation();

    //console.log("Chatkitty id", id)

    //console.log(user)
    function handleButtonPress() {

        // Getting both id in order to create the session
        // console.log("Current user id:", userId)
        // console.log("User id:", id);

        if (channelName.length > 0) {
            kitty
                .createChannel({
                    type: 'DIRECT',
                    members: [{ id: id }],
                })
                .then((result) => {
                    // "Home chat" is the name of the navigation in TabsNavigator
                    //console.log(result.channel.id)
                    navigation.navigate('Home chat', { channel: result.channel, redirect: true });
                });
        }
    }
    return (
        <Card containerStyle={styles.card_container}>
            <View style={styles.container}>
                <Avatar
                    size="xlarge"
                    width={styles.profile_picture.width}
                    height={styles.profile_picture.height}
                    rounded
                    source={{ uri: profile_picture }}
                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                />
                <View style={styles.text_container}>
                    <Text style={styles.title}>{title}, {age}</Text>
                    <Text style={styles.location}>{location}</Text>
                </View>
                <Avatar
                    size="medium"
                    width={styles.profile_picture.width}
                    height={styles.profile_picture.height}
                    rounded
                    icon={{ name: 'chat', color: Colors.SECONDARY, size: 25, }}
                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                    containerStyle={styles.open_chat}
                    onPress={() => handleButtonPress()}
                ></Avatar>
            </View>
        </Card>
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
        alignSelf: 'center',
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
                //It doesn't work
                elevation: 5,
            },
        })
    },
});