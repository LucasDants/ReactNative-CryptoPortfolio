import './src/theme/unistyles';
//

import { toastConfig } from '@/config/toast';
import { Routes } from '@/routes/index.routes';
import { theme } from '@/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { RealmProvider } from './src/database';

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
      <Toast config={toastConfig} />
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
