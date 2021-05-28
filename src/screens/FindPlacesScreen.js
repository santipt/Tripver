// Importing react utilities
import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

// Importing components
import ListOfPlaces from '../components/molecules/ListOfPlaces'
import GlobalStyles from '../styles/GlobalStyles';
import { AuthContext } from '../navigation/AuthProvider';
import Loading from '../components/atoms/Loading';

export default function FindPlacesScreen() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={GlobalStyles.androidSafeArea} >
      <ListOfPlaces></ListOfPlaces>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});