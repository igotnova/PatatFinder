import React from 'react';
import { StyleSheet, View, Appearance } from 'react-native';
import App from '../../components/fetch';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../../components/ThemeContext';
import { ThemeProvider } from '../../components/ThemeContext';

type TabTwoScreenProps = {
  // Remove the navigation prop from here
};

export default function TabTwoScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <App navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
