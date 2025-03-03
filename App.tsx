import './src/theme/unistyles';
//

import React from 'react';
import { StatusBar } from 'react-native';
import { RealmProvider } from './src/database';
import Home from './src/screens/Home';


function App() {
  return (
    <RealmProvider>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <Home />
    </RealmProvider>
  );
}



export default App;
