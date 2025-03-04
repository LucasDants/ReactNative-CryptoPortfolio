import './src/theme/unistyles';
//

import { Routes } from '@/routes/index.routes';
import { theme } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RealmProvider } from './src/database';

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <RealmProvider>
         <BottomSheetModalProvider >
            <Routes />
         </BottomSheetModalProvider>
      </RealmProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
