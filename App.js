import React  from 'react';
import { Asset } from 'expo-asset';
import Providers from './src/navigation';

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./src/assets/images/background/loginBackground.jpg'),      
      require('./src/assets/images/background/SignUpBackground.jpg'), 
      require('./src/assets/images/tripverLogov2.png'), 
    ]),
  ]);
}

export default  function App() {
  loadResourcesAsync()
  return <Providers />;
}