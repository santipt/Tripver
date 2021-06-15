import Constants from 'expo-constants';
import Permission from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

class UserPermissions {
    getCameraPermission = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
        }
    }
    getImageLibraryPermission = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access image library is required!");
        }
    }
    alertIfRemoteNotificationsDisabledAsync = async () => {
        const { status } = await Permission.getAsync(Permission.NOTIFICATIONS);
        if (status !== 'granted') {
            alert('Hey! You might want to enable notifications for my app, they are good.');
        }
    }
    getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location is required!');
            return;
        }
    }
}

export default new UserPermissions();