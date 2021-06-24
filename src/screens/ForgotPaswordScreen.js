// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../styles/colors';
import LongButton from '../components/atoms/LongButton';
import FormInput from '../components/atoms/FormInput';
import Loading from '../components/atoms/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import GlobalStyles from '../styles/GlobalStyles';
import { resetPassword } from '../firebase/Logic';

// Importing image paths
import { images } from '../utils/images'

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');

    const { loading, setLoading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    const checkTextInput = () => {

        //Check for the Email TextInput
        if (!email.trim()) {
            alert('Please enter Email');
            return;
        }

        // Check if the email contains @
        if (!email.includes('@')) {
            alert('The email format is not valid');
            return;
        }

        //Checked Successfully
        setLoading(true);
        resetPassword(email).then(() => {
            setLoading(false);
            navigation.goBack();
        }).catch(err => {
            setLoading(false);
            console.log(err)
            alert('This user does not exist :(');
        });

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
                    <Icon
                        name='arrowleft'
                        color={Colors.WHITE}
                        style={styles.icon_left}
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={styles.forgot_password_container}>
                        <Text style={styles.titleText}>Forgot Password?</Text>
                        <FormInput
                            labelName="Email"
                            value={email}
                            autoCapitalize="none"
                            onChangeText={(userEmail) => setEmail(userEmail)}
                            autoCompleteType='email'
                            keyboardType='email-address'
                            style={styles.input_form}
                            showLabel={true}
                        />
                        <LongButton
                            title="Send Email"
                            labelStyle={styles.loginButtonLabel}
                            style={styles.next_button}
                            //onPress={() => register(displayName, email, password)}
                            onPress={() => checkTextInput()}
                            showIcon={true}
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
    forgot_password_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        marginBottom: 60,
        marginTop: -10,
    },
    icon_left: {
        marginLeft: 15,
        marginTop: 10,
    },
    input_form: {
        marginBottom: 30,
    },
    next_button: {
        marginTop: 30,
    }
});