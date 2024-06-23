import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../theme/themeContext';
import ToggleButton from '../components/ToggleButton';
export type RootStackParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  // ... other screens
};

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <CustomThemeProvider><RootLayoutNav /></CustomThemeProvider>}
    </>
  );
}

function RootLayoutNav() {
  const { darkMode } = useTheme();
  const colorScheme = darkMode ? 'dark' : 'light';

  return (
    <>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        {/* <ToggleButton /> */}
      </NavigationThemeProvider>
    </>
  );
}