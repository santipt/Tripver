// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import { changeEmail, editUser } from '../../firebase/Logic';

// Importing images paths
import { images } from '../../utils/images'

export default function EditGenderScreen({ route, navigation }) {

    var user = route.params.user;
    var password = route.params.password;

    const [newEmail, setNewEmail] = React.useState('');

    const { loading, setLoading, userId } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    const checkBeforeNavigate = () => {

        // Checking if the email pass the requirements
        console.log(newEmail)
        if (!newEmail.includes('@') && newEmail == '') {
            alert('The email format is not valid');
            return;
        } else {
            //setLoading(true);
            // Changing password
            changeEmail(newEmail, user.email, password).then(async () => {
                user.email = newEmail;

                // Editing email in the database
                await editUser({email: newEmail}, userId);

                //setLoading(false);

                navigation.navigate('Settings', user)

            }).catch((err) => {
                console.log(err)
                alert('Something went wrong :(')
            })
        }

    };


    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: Colors.GRAY_LIGHT }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <SafeAreaView style={GlobalStyles.androidSafeArea}>
                <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                    <View style={styles.header}>
                        <Icon
                            name='closecircleo'
                            color={Colors.WHITE}
                            size={30}
                            onPress={() => navigation.goBack()}
                        />
                        <Icon
                            name='checkcircleo'
                            color={Colors.WHITE}
                            size={30}
                            onPress={() => checkBeforeNavigate()}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title_text}>Change email</Text>
                        <Text style={styles.description1_text}>Your current email is: {user.email}</Text>
                        <Text style={styles.description2_text}>
                            What would you like to update it to? Your email is not displayed
                            in your public profile on Tripver.
                        </Text>
                        <FormInput
                            labelName="Email"
                            value={newEmail}
                            autoCapitalize="none"
                            onChangeText={(userEmail) => setNewEmail(userEmail)}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            style={styles.input_form}
                            showLabel={false}
                        />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </KeyboardAwareScrollView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title_text: {
        fontSize: 30,
        position: 'relative',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: -100,
    },

    description1_text: {
        fontSize: 18,
        position: 'relative',
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
    },

    description2_text: {
        fontSize: 18,
        position: 'relative',
        textAlign: 'center',
        marginHorizontal: 20,
    },

    input_form: {
        marginTop: 20,
    },

    icon_left: {
        marginLeft: 15,
        marginTop: 10,
    },

});