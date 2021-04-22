// Importing react utilities
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Importing screens
import MyTabsScreen from '../screens/MyTabsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Edit screens
import EditProfileScreen from '../screens/EditScreens/EditProfileScreen';
import EditLocationScreen from '../screens/EditScreens/EditLocationScreen';
import EditBirthDateScreen from '../screens/EditScreens/EditBirthDateScreen';
import EditGenderScreen from '../screens/EditScreens/EditGenderScreen';

const Main = createStackNavigator();

export default function MainStack() {
  return (
      <Main.Navigator headerMode="none" mode="modal">
        <Main.Screen name="Main" component={MyTabsScreen} />
        <Main.Screen name="Settings" component={SettingsScreen} options={horizontalAnimation}/>
        <Main.Screen name="EditProfile" component={EditProfileScreen} />
        <Main.Screen name="EditLocation" component={EditBirthDateScreen} options={horizontalAnimation}/>
        <Main.Screen name="EditGender" component={EditGenderScreen} options={horizontalAnimation}/>
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