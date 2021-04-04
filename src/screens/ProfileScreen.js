// Importing react utilities
import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/Ionicons';

// Importing components
import LongButton from '../components/atoms/LongButton'
import SelectedItems from '../components/molecules/SelectedItems'
import * as Colors from '../styles/colors';

// Lists
import listOfHobbies from '../utils/hobbies'
import listOfLanguages from '../utils/languages'
import listOfCountries from '../utils/countries'

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
                    </Text>
                    <Text style={styles.title}>
                        Hobbies
                    </Text>
                    <SelectedItems list={listOfHobbies} selectedItems={[6,1,2]}></SelectedItems>
                    <Text style={styles.title}>
                        Languages
                    </Text>
                    <SelectedItems list={listOfLanguages} selectedItems={[6,1,2]}></SelectedItems>
                    <Text style={styles.title}>
                        Countries
                    </Text>
                    <SelectedItems list={listOfCountries} selectedItems={[6,1,2]}></SelectedItems>
                    <LongButton style={styles.edit_button} title="Edit profile" onPress={() =>
                        navigation.navigate('EditProfile')}>
                    </LongButton>
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
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
    },
    card: {
        borderRadius: 14,
        marginRight: '2%',
        marginLeft: '2%',
        height: '107%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5
    },
    text: {
        marginBottom: 15
    },
    edit_button: {
        bottom: '-12%',
    },
    settings_icon: {
        flexWrap: 'wrap-reverse',
        marginTop: 15,
        marginRight: 15,
    }
});