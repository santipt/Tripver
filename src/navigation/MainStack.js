import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyTabs from '../components/molecules/MyTabs';

import EditProfileScreen from '../screens/EditProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen}/>
    </Stack.Navigator>
  );
}

export default function MainStack() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MyTabs} />
        <Stack.Screen name="Root" component={Root} />
      </Stack.Navigator>
  );
}
