// Importing react utilities
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';

// Importing components
import { kitty } from '../chatkitty';
import Loading from '../components/atoms/Loading';

import { AuthContext } from './AuthProvider';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    return kitty.onCurrentUserChanged((currentUser) => {
      setUser(currentUser);

      if (initializing) {
        setInitializing(false);
      }

      setLoading(false);
    });
  }, [initializing, setUser]);

  if (loading) {
    return <Loading />;
  }

  // In order to authenticate user
  //{user ? <MainStack /> : <AuthStack />}
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}