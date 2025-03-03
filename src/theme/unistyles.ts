import { StyleSheet } from 'react-native-unistyles';
import { breakpoints } from './breakpoints';
import { theme } from './index';

const appThemes = {
  light: theme,
};

type AppThemes = typeof appThemes
type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes { }
  export interface UnistylesBreakpoints extends AppBreakpoints { }
}

StyleSheet.configure({
  breakpoints,
  themes: appThemes,
  settings: {
    initialTheme: 'light',
  },
});
