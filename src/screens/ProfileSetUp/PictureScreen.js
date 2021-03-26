// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, Text, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Avatar, Accessory } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';


// Importing icons
import Icon from 'react-native-vector-icons/AntDesign';

// Importing components
import * as Colors from '../../styles/colors';
import Button from '../../components/atoms/Button';
import Loading from '../../components/atoms/Loading';
import { AuthContext } from '../../navigation/AuthProvider';

// Importing image paths
import { images } from '../../utils/images'

export default function PictureScreen({ route, navigation }) {
    const [selectedImage, setSelectedImage] = React.useState(null);

    // Getting the data from the other screens
    var data = route.params;

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    // Open photo library from the phone and save the uri in order to show the image
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage({ localUri: pickerResult.uri });
    };

    const checkTextInput = () => {
        if (selectedImage != null) {
            data.profile_picture = selectedImage.localUri;

            //Checked Successfully
            navigation.navigate('AboutMeScreen', data)
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ backgroundColor: Colors.GRAY_LIGHT }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <SafeAreaView style={styles.container}>
                <ImageBackground source={images.signUpBackground.uri} style={styles.background}>
                    <Icon
                        name='arrowleft'
                        color={Colors.WHITE}
                        style={styles.icon_left}
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={styles.sing_up_container}>
                        <Text style={styles.title_text}> Say cheese :)</Text>
                        <View style={styles.header}>
                            {selectedImage != null ?
                                <Avatar
                                    size="xlarge"
                                    width={styles.profile_picture.width}
                                    height={styles.profile_picture.height}
                                    rounded
                                    source={{ uri: selectedImage.localUri }}
                                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                                >
                                    <Accessory
                                        style={styles.edit_picture}
                                        onPress={openImagePickerAsync}
                                        iconStyle={styles.edit_icon} />
                                </Avatar>
                                : <Avatar
                                    size="xlarge"
                                    width={styles.profile_picture.width}
                                    height={styles.profile_picture.height}
                                    rounded
                                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                                    icon={{ name: 'camera', type: 'font-awesome-5', color: 'rgba(0,0,0,0.5)' }}
                                    overlayContainerStyle={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                                >
                                    <Accessory
                                        style={styles.edit_picture}
                                        onPress={openImagePickerAsync}
                                        iconStyle={styles.edit_icon} />
                                </Avatar>}
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
        alignItems: 'center',
        margin: 20,
    },
    profile_picture: {
        width: 200,
        height: 200
    },
    edit_picture: {
        height: '20%',
        width: '20%',
        borderRadius: 30,
        backgroundColor: Colors.SECONDARY,
    },
    edit_icon: {
        fontSize: 20,
    },
    sing_up_container: {
        flex: 1,
        alignItems: 'center',
    },
    title_text: {
        fontSize: 30,
        marginBottom: 60,
        marginTop: 60,
    },
    icon_left: {
        marginLeft: 15,
        marginTop: 10,
    },
    next_button: {
        marginTop: 100,
    }
});