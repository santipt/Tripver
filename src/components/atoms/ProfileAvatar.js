import React, { useState, } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Accessory } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

// Importing components
import * as Colors from '../../styles/colors';
import { useActionSheet } from '@expo/react-native-action-sheet'

// Importing icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileAvatar({ ...props }) {

    // To open the camera/library option
    const { showActionSheetWithOptions } = useActionSheet();

    const [selectedImage, setSelectedImage] = useState(props.selectedImage);

    // Open options: Take photo or Choose from library
    let onOpenActionSheet = () => {

        const options = ['Take Photo', 'Choose from library', 'Cancel'];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            buttonIndex => {
                // Do something here depending on the button index selected
                if (buttonIndex == 0) {
                    console.log("Open Camera")
                    openCamera();
                }
                else if (buttonIndex == 1) {
                    console.log("Open Photo Library")
                    openImageLibrary();
                }
            },
        );
    };

    // Open photo library from the phone and save the uri in order to show the image
    let openImageLibrary = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        //console.log(pickerResult.uri);

        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage(pickerResult.uri);
        props.onImageChange(pickerResult.uri)
    };

    // Open camera from the phone and save the uri in order to show the image
    let openCamera = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchCameraAsync();
        //console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
        }
        setSelectedImage(pickerResult.uri);
        props.onImageChange(pickerResult.uri)
    };

    return (
        <TouchableOpacity onPress={() => onOpenActionSheet()}>
            {selectedImage != null ?
                <Avatar
                    size={props.size} //"xlarge"
                    width={props.width}
                    height={props.height}
                    rounded
                    source={{ uri: selectedImage }}
                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                    style={styles.avatar_container}
                >
                    {/* Show edit icon */}
                    {props.showEditIcon != false ?
                        <Accessory
                            style={{ ...styles.edit_picture }, { ...props.containerIconStyle }}
                            onPress={onOpenActionSheet}
                            iconStyle={{ ...styles.edit_icon }, { ...props.iconStyle }} />
                        : null
                    }
                    {/* Show camera in the middle of the picture */}
                    {props.showCameraIcon == true ?
                        <Icon
                            name='camera-plus-outline'
                            color={Colors.WHITE}
                            size={40}
                            style={styles.camera_icon}
                        />
                        : null}
                </Avatar>
                : <Avatar
                    size={props.size}
                    width={props.width}
                    height={props.height}
                    rounded
                    imageProps={{ resizeMode: 'cover' }} // Rescaling the image
                    icon={{ name: 'camera', type: 'font-awesome-5', color: 'rgba(0,0,0,0.5)' }}
                    overlayContainerStyle={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                >
                </Avatar>}
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    avatar_container:{
        justifyContent:'center',
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
    camera_icon: {
        position: 'absolute',
        alignSelf: 'center',
    },
});