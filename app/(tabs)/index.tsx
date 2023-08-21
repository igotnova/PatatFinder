import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../../components/Themed';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TabOneScreen() {
  
  const navigation = useNavigation();
  const route = useRoute();
  const [mapRegion, setMapRegion] = useState({
    latitude: 51.917410035937564,
    longitude: 4.484308215491189,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const [data, setData] = useState([]);

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
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
  };

  const SearchMarker = async () => {
    const [region, setRegion] = useState({
      latitude: route.params.latitude, // Initial latitude
      longitude: route.params.longitude, // Initial longitude
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    mapRef.current.animateToRegion(region, 1000);
   
  };

  useEffect(() => {
    
    userLocation();
    if (route.params && route.params.latitude && route.params.longitude) {
      console.log("something" + route.params.longitude + route.params.latitude);
      console.log("im here");
      
      SearchMarker
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
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {data.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            title={item.title}
            description={item.description}
          />
        ))}
      </MapView>
      <Button title='Get Location' onPress={userLocation} />
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
