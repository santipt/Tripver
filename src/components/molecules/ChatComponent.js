import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import { getChannelDisplayName, kitty } from '../../chatkitty';

import * as Colors from '../../styles/colors';

import BrowseChannelsScreen from '../../screens/ChatScreens/BrowseChannelsScreen';
import HomeChatScreen from '../../screens/ChatScreens/HomeChatScreen';
import ChatScreen from '../../screens/ChatScreens/ChatScreen';
import { AuthContext } from '../../navigation/AuthProvider';

const ChatStack = createStackNavigator();

export default function ChatComponent({ route, navigation, showNotification }) {

  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    // If it's focused and it's from find people then open the chat with the person
    if (route.params != undefined && isFocused) {
      if (route.params.redirect) {
        console.log('Redirecting to direct chat...')
        navigation.push('Chat', { channel: route.params.channel });
        route.params.redirect = false;
      }
    }
  }, [navigation, showNotification, isFocused]);

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.PRIMARY,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 20,
        },
      }}
    >
      <ChatStack.Screen
        name="My connections"
        component={HomeChatScreen}
        options={({ navigation }) => ({
          // headerRight: () => (
          //   <IconButton
          //     icon="plus"
          //     size={28}
          //     color="#ffffff"
          //     onPress={() => navigation.navigate('BrowseChannels')}
          //   />
          // ),
        })}
      />
      <ChatStack.Screen
        name="BrowseChannels"
        component={BrowseChannelsScreen}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { margin: 10 },
          headerRight: () => (
            <IconButton
              icon="plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('CreateChannel')}
            />
          ),
        })}
      />
      <ChatStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: getChannelDisplayName(route.params.channel, user),
          headerBackTitleVisible: false,
          headerLeftContainerStyle: { margin: 10, },
          // headerRight: () => (
          //   <IconButton
          //     icon="plus"
          //     size={28}
          //     color="#ffffff"
          //     onPress={() => navigation.navigate('BrowseChannels')}
          //   />
          // ),
        })}
      />
    </ChatStack.Navigator>
  );
}

