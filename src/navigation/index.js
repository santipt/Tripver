// Importing react utilities
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing components
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Routes />
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