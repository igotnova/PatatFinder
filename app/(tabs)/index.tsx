import { StyleSheet, Button } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import React, { useState, useEffect, useContext } from 'react';
import theme from '../../theme/theme';
import themeContext from '../../theme/themeContext';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import FetchMarker from "../../components/fetchmarker";
// import DataScreen from '../../components/DataScreen';

const patat = "https://stud.hosted.hr.nl/0969850/html/api/locations.json";


export default function TabOneScreen() {
  const [darkMode, setDarkMode] = useState(false)
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.917410035937564,
    longitude: 4.484308215491189,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
   
  })
  const [Beurs, setBeurs] = useState({
    latitude: 51.917410035937564,
    longitude: 4.484308215491189,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
   
  })


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('null');
  const userLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      
   }
   
  let location = await Location.getCurrentPositionAsync({});
  setMapRegion({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
  });
  console.log(location.coords.latitude,location.coords.longitude);
}



  useEffect(() =>{
    userLocation();
    const listener = EventRegister.addEventListener('ChangeTheme', (data) =>{
      setDarkMode(data)
      console.log(data)
    })
    return()=> {
      EventRegister.removeAllListeners()
    }
  })
  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
    <View style={styles.container}>
      
    <MapView style={styles.map} 
    region={mapRegion}
    >
      <Marker coordinate={mapRegion} title='your location'/>
      <Marker coordinate={Beurs} title='your location'/>
      {/* <Marker coordinate={mapRegion2} title='marker2'/> */}
      {/* <FetchMarker></FetchMarker> */}

    </MapView>
      <Button title='get location' onPress={userLocation}/> 
   
    </View>
    </themeContext.Provider>
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
  },  map: {
    width: '100%',
    height: '100%',
  },
});
