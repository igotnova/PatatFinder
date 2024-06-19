import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Appearance } from 'react-native';
import { Text, View } from '../../components/Themed';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRef } from "react";
import { useTheme } from '../../components/ThemeContext';
import { ThemeProvider } from '../../components/ThemeContext';

export default function TabOneScreen() {
  
  const mapRef = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.917410035937564,
    longitude: 4.484308215491189,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const [data, setData] = useState([]);



  // fucntie voor het vinden van de user location, door maps is base user location op een emulator nu amerika
  const userLocation = async () => {
    console.log("function userlocation used");
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    
    console.log("loaction is " + location.coords.latitude + "," + location.coords.longitude);
    // setMapRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.04,
    //   longitudeDelta: 0.05,
    // });
    const AnnimateToYou = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(AnnimateToYou, 3 * 1000);

  };


  // functie die kijk of er een locatie in de params is ogepslage is ernaartoe gaat
  const logConsts = async () => {
    console.log("Logging cords from params" + route.params.latitude + route.params.longitude);
    console.log("try to set mapRegion");

    const AnnimateToCordianates = {
      latitude: route.params.latitude,
      longitude: route.params.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current.animateToRegion(AnnimateToCordianates, 3 * 1000);
  }

  useEffect(() => {
    
    userLocation();
    if (route.params && route.params.latitude && route.params.longitude) {
      console.log("something" + route.params.longitude + route.params.latitude);
      console.log("im here");
      
      logConsts
    }
    fetch('https://stud.hosted.hr.nl/0969850/html/api/locations.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ThemeProvider>
    <View style={styles.container}>
      
      <MapView ref={mapRef} style={styles.map} region={mapRegion}>
        {data.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            pinColor="green"
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>
      <Button title='Get Location' onPress={userLocation} />
      <Button title='console log cords' onPress={logConsts} />
      <Button
        title='Go to Map'
        onPress={() =>
          navigation.navigate('index', {
            latitude: 51.920476,
            longitude: 4.481926,
            userLocation,
          })
        }
      />
    </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
