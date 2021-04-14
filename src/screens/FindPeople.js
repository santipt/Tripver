// Importing react utilities
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { kitty } from '../chatkitty';

// Importing components
import { AuthContext } from '../navigation/AuthProvider';
import ListOfPeople from '../components/molecules/ListOfPeople'
import Loading from '../components/atoms/Loading';


export default function FindPeople({ ...props }) {
  const { user, loading, setLoading, userId } = useContext(AuthContext);

  //console.log("USER IS GUEST: ", user.isGuest)

  return (
    <View style={styles.container}>
      { props.userType == 'local' ?
        <ListOfPeople user={user} userType='local'></ListOfPeople>
        : <ListOfPeople user={user} userType='tripver'></ListOfPeople>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});