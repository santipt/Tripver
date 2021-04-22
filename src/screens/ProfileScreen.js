// Importing react utilities
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';


// Importing components
import LongButton from '../components/atoms/LongButton'
import SelectedItems from '../components/molecules/SelectedItems'
import * as Colors from '../styles/colors';
import { firebase } from '../firebase/index'
import Loading from '../components/atoms/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import GlobalStyles from '../styles/GlobalStyles';

// Importing image paths
import { images } from '../utils/images'

// Lists
import listOfHobbies from '../utils/hobbies'
import listOfLanguages from '../utils/languages'
import listOfCountries from '../utils/countries'

export default function ProfileScreen({ navigation }) {

    const [user, setUser] = useState([])
    const { userId } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log("USER ID: ", userId)

        const subscriber = firebase.firestore()
            .collection('users').doc(userId)
            .onSnapshot(doc => {
                setUser(doc.data())
                //console.log(documentSnapshot.data())
                setLoading(false)
            });

        // Stop listening for updates when no longer required
        return () => subscriber();

    }, [loading]);

    if (loading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                <View style={styles.settings_icon}>
                    <Icon
                        name='settings-outline'
                        color='white'
                        size={30}
                        onPress={() => navigation.navigate('Settings', user)}
                    />
                </View>
                <View style={styles.header}>
                    <Avatar
                        size="medium" // If I want a circle xlarge
                        width={styles.profile_picture.width}
                        height={styles.profile_picture.height}
                        rounded
                        source={{ uri: user.profile_picture }}
                        imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                    />
                    <View>
                        <Text style={styles.profile_name}>{user.name}, {user.age}</Text>
                        <Text style={styles.city}>{user.current_location}</Text>
                    </View>
                </View>
                <View style={styles.card_container}>
                    <Card containerStyle={styles.card}>
                        <ScrollView
                            contentContainerStyle={styles.scrollview}
                            showsVerticalScrollIndicator={false}>
                            <Text style={styles.title}>
                                About me
                                </Text>
                            <Text style={styles.text}>
                                {user.about_me}
                            </Text>
                            <Text style={styles.title}>
                                Hobbies
                            </Text>
                            <SelectedItems list={listOfHobbies} selectedItems={user.hobbies}></SelectedItems>
                            <Text style={styles.title}>
                                Languages
                            </Text>
                            <SelectedItems list={listOfLanguages} selectedItems={user.languages}></SelectedItems>
                            <Text style={styles.title}>
                                Countries
                            </Text>
                            <SelectedItems list={listOfCountries} selectedItems={user.countries}></SelectedItems>
                            {/* <LongButton style={styles.edit_button} title="Edit profile" onPress={() =>
                                navigation.navigate('EditProfile', user)}>
                            </LongButton> */}
                            <View style={styles.scrollview_bottom}></View>
                        </ScrollView>
                    </Card>
                    <View style={styles.user_type_container}>
                        <Text style={styles.user_type_text}>{user.user_type}</Text>
                        <Icon2
                            name='bag-personal-outline'
                            color={Colors.SECONDARY}
                            size={30}
                            style={styles.user_type_icon}
                        />
                    </View>
                    <TouchableOpacity style={styles.edit_icon}>
                        <Icon2
                            name='pencil-circle'
                            color={Colors.SECONDARY}
                            size={27}
                            onPress={() => {
                                // Because a warning
                                user.birth_date = "";
                                navigation.navigate('EditProfile', user)
                            }}
                        />
                    </TouchableOpacity>
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
        marginBottom: 5,
    },
    city: {
        color: 'white',
        fontSize: 15,
        marginLeft: 20,
    },
    edit_icon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 20,
        right: 12,
    },

    user_type_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 10,
        padding: 6,
        backgroundColor: Colors.WHITE,
        width: '50%',
        height: '10%',
        position: 'absolute',
        alignSelf: 'center',
        top: -16,
    },

    user_type_text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    },

    user_type_icon: {
        marginLeft: 10,
    },

    card_container: {
        alignSelf: 'center',
        width: '98%',
        marginTop:40,
    },
    card: {
        borderRadius: 14,
        marginRight: '2%',
        marginLeft: '2%',
        paddingTop: 5,
        paddingBottom: 5,
        height:'82.5%',
    },
    scrollview: {
    },

    scrollview_bottom: {
        height: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
        marginTop: 10,
    },
    text: {
        marginBottom: 10
    },
    edit_button: {
        position: 'relative',
        top: 10,
        alignSelf: 'center'
    },
    settings_icon: {
        flexWrap: 'wrap-reverse',
        marginTop: 15,
        marginRight: 15,
    }
});