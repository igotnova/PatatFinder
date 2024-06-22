import React from 'react';
import { useTheme } from '../app/context/themeContext';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToggleButton = () => {
    const { darkMode, toggleDarkMode } = useTheme();
  
    return (
      <TouchableOpacity onPress={toggleDarkMode} style={styles.button}>
        <Text style={styles.buttonText}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    button: {
      padding: 10,
      backgroundColor: 'gray',
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  
  export default ToggleButton;