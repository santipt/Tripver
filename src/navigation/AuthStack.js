// Importing react utilities
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Importing screens

// Login screen
import LoginScreen from '../screens/LoginScreen';

// Sign Up Screens
import SignUpScreen from '../screens/SignUpScreens/SignUpScreen';
import SignUpScreen1 from '../screens/SignUpScreens/SignUpScreen1';
import SignUpScreen2 from '../screens/SignUpScreens/SignUpScreen2';

// Profile set up screens
import LocalOrTripverScreen from '../screens/ProfileSetUp/LocalOrTripverScreen';
import GenderScreen from '../screens/ProfileSetUp/GenderScreen';
import PictureScreen from '../screens/ProfileSetUp/PictureScreen';
import AboutMeScreen from '../screens/ProfileSetUp/AboutMeScreen';
import HobbiesScreen from '../screens/ProfileSetUp/HobbiesScreen';
import LanguagesScreen from '../screens/ProfileSetUp/LanguagesScreen';
import CountriesScreen from '../screens/ProfileSetUp/CountriesScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Signup1" component={SignUpScreen1} />
        <Stack.Screen name="Signup2" component={SignUpScreen2} />
        <Stack.Screen name="LocalOrTripverScreen" component={LocalOrTripverScreen} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="PictureScreen" component={PictureScreen} />
        <Stack.Screen name="AboutMeScreen" component={AboutMeScreen} />
        <Stack.Screen name="HobbiesScreen" component={HobbiesScreen} />
        <Stack.Screen name="LanguagesScreen" component={LanguagesScreen} />
        <Stack.Screen name="CountriesScreen" component={CountriesScreen} />
      </Stack.Navigator>
  );
}