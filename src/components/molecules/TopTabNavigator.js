// Importing react utilities
import React, { useContext } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Importing components
import FindPeople from '../../screens/FindPeopleScreen'
import * as Colors from '../../styles/colors';
import { AuthContext } from '../../navigation/AuthProvider';
import GlobalStyles from '../../styles/GlobalStyles';
import { SafeAreaView } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  const { firebaseUser } = useContext(AuthContext);

  var user_type = 'Local';

  if (firebaseUser != undefined) {
    user_type = firebaseUser.user_type;
  }

  return (
    <SafeAreaView style={[GlobalStyles.androidSafeArea, {backgroundColor:Colors.PRIMARY}]} >
      <TopTab.Navigator
        initialRouteName={user_type == "Tripver" ? "Tripvers" : "Locals"}
        tabBarOptions={{
          labelStyle: { fontSize: 12, fontWeight: 'bold' },
          tabStyle: { borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: 8, backgroundColor: Colors.WHITE, },
          indicatorStyle: { backgroundColor: Colors.WHITE, },
          style: { backgroundColor: Colors.PRIMARY, },
          showIcon: true,
          activeTintColor: Colors.PRIMARY,
          inactiveTintColor: Colors.GRAY_MEDIUM,
        }}
        sceneContainerStyle={{ backgroundColor: Colors.WHITE }}
      >
        <TopTab.Screen
          name={user_type == "Tripver" ? "Locals" : "Tripvers"}
          children={() => <FindPeople userType={user_type == "Tripver" ? 'local' : 'tripver'}></FindPeople>}
        />
        <TopTab.Screen
          name={user_type == "Tripver" ? "Tripvers" : "Locals"}
          children={() => <FindPeople userType={user_type == "Tripver" ? 'tripver' : 'local'}></FindPeople>}
        />
      </TopTab.Navigator>
    </SafeAreaView>
  );
}