// Importing react utilities
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, Accessory } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import ProfileAvatar from '../../components/atoms/ProfileAvatar';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import ProgressLine from '../../components/atoms/ProgressLine'

// Importing image paths
import { images } from '../../utils/images'

export default function PictureScreen({ route, navigation }) {

    const { loading } = useContext(AuthContext);

    const [selectedImage, setSelectedImage] = useState(null);

    // Getting the data from the other screens
    var data = route.params;

    // Running only the screen is loaded
    useEffect(() => {
        if (data.googleData != undefined && selectedImage == null) {
            setSelectedImage(data.googleData.user.photoUrl)
        }
    }, []);

    if (loading) {
        return <Loading />;
    }

    const checkTextInput = () => {

        if (selectedImage != null && selectedImage != '') {
            data.profile_picture = selectedImage;

            //Checked Successfully
            navigation.navigate('AboutMeScreen', data)
        }
    };


    return (
        <SafeAreaView style={GlobalStyles.androidSafeArea}>
            <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                <Icon
                    name='arrowleft'
                    color={Colors.WHITE}
                    style={styles.icon_left}
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <View style={styles.content}>
                    <Text style={styles.title_text}>Say{'\n'} cheese :)</Text>
                    <View style={styles.header}>
                        <ProfileAvatar
                            size="xlarge"
                            width={styles.profile_picture.width}
                            height={styles.profile_picture.height}
                            selectedImage={selectedImage}
                            onImageChange={(img) => {
                                setSelectedImage(img)
                            }}
                            iconStyle={styles.edit_icon}
                            containerIconStyle={styles.container_icon_style}
                        ></ProfileAvatar>
                    </View>
                    <Button
                        title="Next"
                        labelStyle={styles.loginButtonLabel}
                        style={styles.next_button}
                        //onPress={() => register(displayName, email, password)}
                        onPress={() => checkTextInput()}
                        showIcon={true}
                    />
                </View>
                <ProgressLine value='42%'></ProgressLine>
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
        flex: 1,
    },
    header: {
    },
    profile_picture: {
        width: 200,
        height: 200
    },
    container_icon_style:{
        height: '20%',
        width: '20%',
        borderRadius: 30,
        backgroundColor: Colors.SECONDARY,
    },
    edit_icon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title_text: {
        fontSize: 30,
        position: 'absolute',
        top: 60,
        textAlign: 'center',
    },
    icon_left: {
        marginLeft: 15,
        marginTop: 10,
    },
    next_button: {
        marginTop: 20,
        position: 'absolute',
        bottom: 60,
    }
});