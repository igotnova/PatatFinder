import React from 'react';
import { StyleSheet, View, Appearance } from 'react-native';
import App from '../../components/fetch';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';

import { useTheme, ThemeProvider } from '../context/themeContext';

const Two = () => {
  const { darkMode } = useTheme();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
      <App navigation={navigation} />
    </View>
  );
};

const WrappedTwo = () => (
  <ThemeProvider>
    <Two />
  </ThemeProvider>
);

// export default function TabTwoScreen() {
//   const navigation = useNavigation();
//   const { darkMode } = useTheme();
//   return (
//     <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
//       <App navigation={navigation} />
//     </View>
//   );
// }

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

export default WrappedTwo;