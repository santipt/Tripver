// Importing react utilities
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

// Importing components
import { kitty } from '../chatkitty';
import Loading from '../components/atoms/Loading';
import { db } from '../firebase/index';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const { userId, setUserId } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged(async (currentUser) => {
      setUser(currentUser);

      // Getting uid of firestore from email of chatkitty logged in
      if (currentUser != null) {
        var email = currentUser.name

        var data = await db.collection("users").where('email', '==', email).get();

        data.docs.forEach(item => {
          setUserId(item.id)
        })
      }

      if (initializing) {
        setInitializing(false);
      }

      setLoading(false);
    });
  }, [initializing, setUserId, setUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}