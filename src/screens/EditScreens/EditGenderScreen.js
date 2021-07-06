// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import FormInput from '../../components/atoms/FormInput';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import RadioButton from '../../components/atoms/GenderPicker'
import GlobalStyles from '../../styles/GlobalStyles';
import { editUser } from '../../firebase/Logic';

// Importing images paths
import { images } from '../../utils/images'

export default function EditGenderScreen({ route, navigation }) {

    // Getting the data from the other screens
    var user = route.params;

    console.log(user.gender)

    const [checked, setChecked] = React.useState(user.gender);
    const [gender, setGender] = React.useState(user.gender);

    const { setLoading, loading, userId } = useContext(AuthContext);

    const checkBeforeNavigate = async () => {

        setLoading(true);

        if (checked == "Other") {
            user.gender = gender;
        } else {
            user.gender = checked
        }

        // Editing gender in the database
        await editUser({gender: gender}, userId);

        setLoading(false);

        navigation.navigate('Settings', user)

    };

    if (loading) {
        return <Loading />;
    }

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
                        <Text style={styles.title_text}>How do you identify?</Text>
                        <Card style={styles.card_container} containerStyle={styles.card}>
                            <RadioButton value={checked} onValueChange={checked => setChecked(checked)} />
                            {checked == 'Other' ? <FormInput style={styles.form_input} value={gender} onChangeText={(text) => setGender(text)} labelName="Enter preferred gender"></FormInput> : null}
                        </Card>
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
        marginBottom: 60,
        marginTop: -80,
    },

    icon_left: {
        marginLeft: 15,
        marginTop: 10,
    },

    card: {
        borderRadius: 30,
        width: '90%',
    },

    form_input: {
        borderColor: Colors.GRAY_MEDIUM,
        borderWidth: 2,
        width: '95%',
        marginLeft: 10,
    },

    next_button: {
        marginTop: 100,
        marginBottom: -20,
        position: 'relative',
    }
});