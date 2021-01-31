import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function EditProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Settings!</Text>
      <Icon
        name='left'
        color='black'
        size={30}
        onPress={() => navigation.goBack()} title="Dismiss"
      />
    </View>
  );
}