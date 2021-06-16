// Importing react utilities
import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// expo
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

// Imnporting components
import { kitty } from '../chatkitty';
import { AuthContext } from './AuthProvider';

// Importing screens
import MyTabsScreen from '../screens/MyTabsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ShowProfilePicture from '../screens/ShowProfilePicture';

// Edit screens in Edit Profile Screen
import EditProfileScreen from '../screens/EditScreens/EditProfileScreen';
import EditLocationScreen from '../screens/EditScreens/EditLocationScreen';

// Edit screens in Settings Screen
import EditEmailScreen from '../screens/EditScreens/EditEmailScreen';
import ChangePasswordScreen from '../screens/EditScreens/ChangePasswordScreen';
import EditGenderScreen from '../screens/EditScreens/EditGenderScreen';
import EditBirthDateScreen from '../screens/EditScreens/EditBirthDateScreen';



import CreateChannelScreen from '../screens/ChatScreens/CreateChannelScreen';

import ProfileScreen from '../screens/ProfileScreen';

const Main = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function MainStack() {

  const { user } = useContext(AuthContext);

  // When is enable it bugs the chat , not always works
  useEffect(() => {
    // In order to get notificaton from expo
    registerForPushNotificationsAsync().then((token) => {
      kitty.updateCurrentUser((user) => {
        user.properties = {
          ...user.properties,
          'expo-push-token': token,
        };

        return user;
      });
    });
  }, []);

  return (
    // headerMode="none"
    <Main.Navigator headerMode="none" mode="modal">
      <Main.Screen name="Main" component={MyTabsScreen} />
      <Main.Screen name="ShowProfile" component={ProfileScreen} />
      <Main.Screen name="ShowProfilePicture" component={ShowProfilePicture} />
      <Main.Screen name="CreateChannel" component={CreateChannelScreen} />
      <Main.Screen name="Settings" component={SettingsScreen} options={horizontalAnimation} />
      <Main.Screen name="EditProfile" component={EditProfileScreen} />
      <Main.Screen name="EditLocation" component={EditLocationScreen} options={horizontalAnimation} />
      <Main.Screen name="EditEmail" component={EditEmailScreen} options={horizontalAnimation} />
      <Main.Screen name="ChangePassword" component={ChangePasswordScreen} options={horizontalAnimation} />
      <Main.Screen name="EditBirthDate" component={EditBirthDateScreen} options={horizontalAnimation} />
      <Main.Screen name="EditGender" component={EditGenderScreen} options={horizontalAnimation} />
    </Main.Navigator>
  );
}

// Changing vertical animation (mode="modal") to horizontal animation
const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice && Platform.OS !== 'web') {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}




