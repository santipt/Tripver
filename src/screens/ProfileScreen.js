import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import * as Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settings_icon}>
                <Icon
                    name='settings-outline'
                    color='white'
                    size={30}
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
            <View style={styles.header}>
                <Avatar
                    size="xlarge"
                    width={styles.profile_picture.width}
                    height={styles.profile_picture.height}
                    rounded
                    source={require("../assets/images/profile_picture.jpg")}
                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                />
                <View>
                    <Text style={styles.profile_name}>Santi, 21</Text>
                    <Text style={styles.city}>Valencia (Spain)</Text>
                </View>
            </View>
            <View style={styles.card_container}>
                <Card containerStyle={styles.card}>
                    <Text style={styles.title}>
                        Description
                    </Text>
                    <Text style={styles.text}>
                        The idea with React Native Elements is more about component structure than actual design.
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Text style={styles.title}>
                        Hobbies
                    </Text>
                    <Text style={styles.text}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Text style={styles.title}>
                        Languages
                    </Text>
                    <Text style={styles.text}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Text style={styles.title}>
                        Countries
                    </Text>
                    <Text style={styles.text}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <TouchableOpacity style={styles.button_container} onPress={() =>
                        navigation.navigate('EditProfile')
                    }>
                        <Text style={styles.button_text}>Edit profile</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PRIMARY,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-around',
        marginLeft: 20,
    },
    profile_picture: {
        width: 90,
        height: 90
    },
    profile_name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20,
    },
    city: {
        color: 'white',
        fontSize: 15,
        marginLeft: 20,
    },
    card_container: {
        position: 'relative',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10
    },
    card: {
        borderRadius: 14,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    },
    text: {
        marginBottom: 15
    },
    button_container: {
        backgroundColor: Colors.SECONDARY,
        borderRadius: 30,
        padding: 10,
    },
    button_text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    settings_icon: {
        flexWrap: 'wrap-reverse',
        marginTop: 15,
        marginRight: 15,
    }
});