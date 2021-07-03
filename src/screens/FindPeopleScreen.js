// Importing react utilities
import React, { useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

// Importing components
import { AuthContext } from '../navigation/AuthProvider';
import ListOfPeople from '../components/molecules/ListOfPeople'
import Loading from '../components/atoms/Loading';
import GlobalStyles from '../styles/GlobalStyles';
import { setLastLocation } from '../firebase/Logic'


const MINUTE_MS = 1800000; // 30 min in miliseconds

export default function FindPeopleScreen({ ...props }) {
  const { user, loading, userId } = useContext(AuthContext);

  useEffect(() => {
    // Run every 30 min
    const interval = setInterval(() => {
      console.log('Saving last location');
      // Setting user location in the ddbb
      setLastLocation(userId);
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

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