// Importing react utilities
import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Title } from 'react-native-paper';

// Importing components
import FormButton from '../components/atoms/FormButton';
import ProfileCard from '../components/atoms/ProfileCard';
import { AuthContext } from '../navigation/AuthProvider';
import ListOfPeople from '../components/molecules/ListOfPeople'

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <Title>Hello, {user.displayName}!</Title> */}
      <ListOfPeople></ListOfPeople>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});