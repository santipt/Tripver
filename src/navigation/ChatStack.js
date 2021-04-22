import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton } from 'react-native-paper';

import CreateChannelScreen from '../screens/ChatScreens/CreateChannelScreen';
import ChatScreen from '../screens/ChatScreens/ChatScreen';

const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function ChatStack() {
  return (
      <ModalStack.Navigator mode="modal" headerMode="none">
        <ModalStack.Screen name="ChatApp" component={ChatComponent} />
        <ModalStack.Screen name="CreateChannel" component={CreateChannelScreen} />
      </ModalStack.Navigator>
  );
}

function ChatComponent() {
  return (
      <ChatStack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#5b3a70',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontSize: 22,
            },
          }}
      >
        <ChatStack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ navigation }) => ({
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
      </ChatStack.Navigator>
  );
}