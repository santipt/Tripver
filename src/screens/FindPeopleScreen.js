// Importing react utilities
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

// Importing components
import { AuthContext } from '../navigation/AuthProvider';
import ListOfPeople from '../components/molecules/ListOfPeople'
import Loading from '../components/atoms/Loading';
import GlobalStyles from '../styles/GlobalStyles';


export default function FindPeopleScreen({ ...props }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea} >
      <ListOfPeople user={user} userType={props.userType}></ListOfPeople>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});