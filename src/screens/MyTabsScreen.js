// Importing react utilities
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// Importing icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faCommentAlt, faCompass, faUser } from '@fortawesome/fontawesome-free-regular';
import Icon from 'react-native-vector-icons/Ionicons';

// Importing components
import FindPeople from './FindPeople'
import FindPlacesScreen from './FindPlacesScreen'
import ChatScreen from './ChatScreens/ChatScreen'
import ProfileScreen from './ProfileScreen'
import TopTabNavigator from '../components/molecules/TopTabNavigator.js'

import * as Colors from '../styles/colors';

const Tab = createBottomTabNavigator();


export default function MyTabs() {
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
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarButton: CustomTabButton,
          tabBarBadge: '',
          tabBarBadgeStyle: [{ backgroundColor: Colors.SECONDARY, top: 5, left: -1 }, { transform: [{ scale: 0.6 }] }],
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







