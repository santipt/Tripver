import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faCommentAlt, faCompass, faUser } from '@fortawesome/fontawesome-free-regular';
import HomeScreen from '../../screens/HomeScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import * as Colors from '../../styles/colors';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
      <Tab.Navigator tabBarOptions={{
        initialRouteName: "Home",
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: 'grey',
        showIcon: true,
        showLabel: false,
      }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: CustomTabButton,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHeart} color={color} />),
          }}
  
        />
        <Tab.Screen
          name="Settings"
          component={HomeScreen}
          options={{
            tabBarButton: CustomTabButton,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faCompass} color={color} />)
          }}
        />
        <Tab.Screen
          name="Find"
          component={HomeScreen}
          options={{
            tabBarButton: CustomTabButton,
            tabBarBadge: '',
            tabBarBadgeStyle: [{backgroundColor:Colors.SECONDARY, top:5, left:-1}, {transform: [{ scale: 0.6 }]}],
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faCommentAlt} color={color} />),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarButton: CustomTabButton,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} />)
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
          : [props.style, { marginHorizontal: 15}]
      }
    />
  );







