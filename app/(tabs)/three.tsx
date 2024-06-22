import React from 'react';
import { useTheme, ThemeProvider } from '../context/themeContext';
import ToggleButton from '../../components/ToggleButton';;
import { View, Text, StyleSheet } from 'react-native';

const Three = () => {
  const { darkMode } = useTheme();

  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <ToggleButton />
      <Text style={darkMode ? styles.darkText : styles.lightText}>Hello, World!</Text>
    </View>
  );
};

const WrappedThree = () => (
  <ThemeProvider>
    <Three />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  light: {
    backgroundColor: '#fff',
  },
  dark: {
    backgroundColor: '#333',
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default WrappedThree;