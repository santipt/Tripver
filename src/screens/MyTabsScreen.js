// Importing react utilities
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faCommentAlt, faCompass, faUser } from '@fortawesome/fontawesome-free-regular';
import Icon from 'react-native-vector-icons/Ionicons';


import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { checkForUnreadChannel, kitty } from '../chatkitty';

// Importing components
import FindPlacesScreen from './FindPlacesScreen'
import ChatComponent from '../components/molecules/ChatComponent'
import ProfileScreen from './ProfileScreen'
import TopTabNavigator from '../components/molecules/TopTabNavigator.js'

import * as Colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export default function MyTabs() {

  // TO DO: Necesito refrescar esta pantalla para que se actualice el badge, hay que hacer que se refresque sola
  
  const [unReadChannel, setUnReadChannel] = useState(false);

  useEffect(() => {
    checkForUnreadChannel().then((res) => {
      setUnReadChannel(res);
    });
  }, [unReadChannel]);


  return (
    <Tab.Navigator tabBarOptions={{
      initialRouteName: "Find people",
      activeTintColor: Colors.PRIMARY,
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: false,
    }}>
      <Tab.Screen
        name="Find people"
        component={TopTabNavigator}
        options={{
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ color }) => (
            <Icon
              name='md-people-outline'
              color={color}
              size={30}
            />),
        }}

      />
      <Tab.Screen
        name="Find places"
        component={FindPlacesScreen}
        options={{
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCompass} color={color} size={22} />)
        }}
      />
      <Tab.Screen
        name="Home chat"
        component={ChatComponent}
        options={unReadChannel ? {
          tabBarButton: CustomTabButton,
          tabBarBadge: '',
          tabBarBadgeStyle: [{ backgroundColor: Colors.SECONDARY, top: 5, left: -1 }, { transform: [{ scale: 0.6 }] }],
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCommentAlt} color={color} size={22} />),
        } : {
          tabBarButton: CustomTabButton,
          //tabBarBadge: '',
          //tabBarBadgeStyle: [{ backgroundColor: Colors.SECONDARY, top: 5, left: -1 }, { transform: [{ scale: 0.6 }] }],
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCommentAlt} color={color} size={22} />),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: CustomTabButton,
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={22} />)
        }}
      />
    </Tab.Navigator>
  );
}

const CustomTabButton = (props) => (
  <TouchableOpacity
    {...props}
    style={
      props.accessibilityState.selected
        ? [props.style, { borderBottomColor: props.children.props.children[0].props.activeTintColor, borderBottomWidth: 5, marginHorizontal: 15 }]
        : [props.style, { marginHorizontal: 15 }]
    }
  />
);









