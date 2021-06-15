import React from 'react';
import { Asset } from 'expo-asset';
import { images } from './src/utils/images'
import Providers from './src/navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

// Preloading the backgrounds or logos
async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      images.localOrTripverBackground.uri,
      images.signUpBackground.uri,
      images.loginBackground.uri,
      images.tripverLogo.uri,
    ]),
  ]);
}

export default function App() {
  loadResourcesAsync()
  return (
    <ActionSheetProvider>
      <Providers />
    </ActionSheetProvider>
  );
}