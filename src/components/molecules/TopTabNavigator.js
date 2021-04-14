// Importing react utilities
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Importing components
import FindPeople from '../../screens/FindPeople'
import * as Colors from '../../styles/colors';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabStyle: { borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 20, backgroundColor: Colors.WHITE, },
        indicatorStyle:{ backgroundColor:Colors.PRIMARY,},
        style: { backgroundColor:Colors.PRIMARY, },
        showIcon: true,
        activeTintColor: Colors.PRIMARY,
        inactiveTintColor: Colors.GRAY_MEDIUM
      }}
      sceneContainerStyle={{backgroundColor:Colors.WHITE}}
      >
      <TopTab.Screen
        name="Locals"
        children={() => <FindPeople userType='local'></FindPeople> }
         />
      <TopTab.Screen
        name="Tripvers"
        children={() => <FindPeople userType='tripver'></FindPeople> }
         />
    </TopTab.Navigator>
  );
}