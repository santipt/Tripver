// Importing react utilities
import React, {useContext} from 'react';
import { View } from 'react-native';
import { Dimensions, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

// Importing components
import * as Colors from '../../styles/colors';
import { AuthContext } from '../../navigation/AuthProvider';


export default function ProfileCard({ title, age, location, profile_picture, onPress, ...props }) {
    const { user } = useContext(AuthContext);
    console.log(user)

    return (
        <Card containerStyle={styles.card_container}>
            <View style={styles.container}>
                <Avatar
                    size="xlarge"
                    width={styles.profile_picture.width}
                    height={styles.profile_picture.height}
                    rounded
                    source={{uri: profile_picture}}
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
                    onPress={() => console.log("Open chat")}
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
        justifyContent: 'space-between'
    },
    text_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginStart: -100
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: 'white',
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