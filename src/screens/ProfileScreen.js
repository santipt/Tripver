import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import * as Colors from '../styles/colors';
import { Icon } from 'react-native-elements'



export default function ProfileScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settings_icon}>
                <Icon
                    name='settings'
                    color='white'
                    size={30}
                    //onPress={() => navigation.push('Details')}
                />
            </View>
            <View style={styles.header}>
                <Avatar
                    size="xlarge"
                    width={120}
                    height={120}
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
                    <Text style={{ marginBottom: 30 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Text style={styles.title}>
                        Languages
                    </Text>
                    <Text style={{ marginBottom: 30 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Text style={styles.title}>
                        Countries
                    </Text>
                    <Text style={{ marginBottom: 30 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <TouchableOpacity style={styles.button_container}>
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
        marginTop: 20,
        marginLeft: 20,
    },
    profile_picture: {
        width: 100,
        height: 100
    },
    profile_name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 20,
    },
    city: {
        color: 'white',
        fontSize: 20,
        marginLeft: 20,
    },
    card_container: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'flex-end'
    },
    card: {
        borderRadius: 14,
        margin: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 15
    },
    button_container: {
        backgroundColor: Colors.SECONDARY,
        borderRadius: 30,
        padding: 10,
    },
    button_text: {
        textAlign: 'center',
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
    },
    settings_icon: {
        flexWrap: 'wrap-reverse',
        marginTop: 40,
        marginRight: 20,
    }
});