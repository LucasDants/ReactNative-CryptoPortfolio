import './src/theme/unistyles';
//

import { Routes } from '@/routes/index.routes';
import { theme } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { RealmProvider } from './src/database';


// TODO:
//! Add Toasts
//! Navigate back when form
//! Confirmation before delete and navigate back
//! If all the transactions for one coin were deleted navigate back from screen
//! Start empty home with a better UI
//! Chart press tooltip disable scroll
// Add Icon
// Add App Font
// Add Splash Screen
// See about the Victory Native Chart
// Check Performance
// Add Documentation

function App() {
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
        <RealmProvider>
          <BottomSheetModalProvider >
            <Routes />
          </BottomSheetModalProvider>
        </RealmProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default App;
