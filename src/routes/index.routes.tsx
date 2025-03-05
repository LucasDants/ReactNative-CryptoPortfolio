import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import BootSplash from 'react-native-bootsplash';
import { AppStackRoutes } from './app.stack.routes';

export function Routes() {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <AppStackRoutes />
    </NavigationContainer>
  );
}
