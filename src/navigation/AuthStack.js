// Importing react utilities
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Importing screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreens/SignUpScreen';
import SignUpScreen1 from '../screens/SignUpScreens/SignUpScreen1';
import SignUpScreen2 from '../screens/SignUpScreens/SignUpScreen2';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Signup1" component={SignUpScreen1} />
        <Stack.Screen name="Signup2" component={SignUpScreen2} />
      </Stack.Navigator>
  );
}