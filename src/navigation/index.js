// Importing react utilities
import React from 'react';
import { InAppNotificationProvider } from '@chatkitty/react-native-in-app-notification';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing components
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider theme={theme}>
        <AuthProvider>
          {/* <InAppNotificationProvider> */}
            <Routes />
          {/* </InAppNotificationProvider> */}
        </AuthProvider>
      </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    accent: Colors.SECONDARY,
    background: 'transparent',
  },
};