import { StyleSheet, Switch ,View, Text } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
// import { Text, View,  } from '../../components/Themed';
import React, { useState, useEffect , useContext} from 'react';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../theme/themeContext';
import theme from '../../theme/theme';

export default function TabTwoScreen() {
  const theme = useContext(themeContext)
  const [darkMode, setDarkMode] = useState(false)
  console.log(theme);
  
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <View />
      
      <Text >darkmode</Text>
      <Switch
      value={darkMode}
      onValueChange={(value) => {setDarkMode(value);
      EventRegister.emit('ChangeTheme', value)
      }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
