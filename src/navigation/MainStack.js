// Importing react utilities
import React, { useEffect, useContext } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { getChannelDisplayName, kitty } from '../chatkitty';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

// Importing screens
import MyTabsScreen from '../screens/MyTabsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Edit screens
import EditProfileScreen from '../screens/EditScreens/EditProfileScreen';
import EditLocationScreen from '../screens/EditScreens/EditLocationScreen';
import EditBirthDateScreen from '../screens/EditScreens/EditBirthDateScreen';
import EditGenderScreen from '../screens/EditScreens/EditGenderScreen';

import CreateChannelScreen from '../screens/ChatScreens/CreateChannelScreen';
import ChatScreen from '../screens/ChatScreens/ChatScreen';
import HomeChatScreen from '../screens/ChatScreens/ChatScreen';
import BrowseChannelsScreen from '../screens/ChatScreens/BrowseChannelsScreen';
import ChatComponent from '../navigation/ChatComponent';


const Main = createStackNavigator();

export default function MainStack() {

  useEffect(() => {
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
      <Main.Screen name="CreateChannel" component={CreateChannelScreen} />
      <Main.Screen name="Settings" component={SettingsScreen} options={horizontalAnimation} />
      <Main.Screen name="EditProfile" component={EditProfileScreen} />
      <Main.Screen name="EditLocation" component={EditLocationScreen} options={horizontalAnimation} />
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

