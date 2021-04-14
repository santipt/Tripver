// Importing react utilities
import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

// Importing components
import { AuthContext } from '../navigation/AuthProvider';

export default function FindPlacesScreen() {
  const { user } = useContext(AuthContext);

  console.log("USER IS GUEST: ", user.isGuest)

  return (
    <View style={styles.container}>
      <Text>{user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});