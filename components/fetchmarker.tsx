import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
type SnackBar = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

const [mapRegion2, setMapRegion2] = useState({
    latitude: 51.917410135937564,
    longitude: 4.484308215491189,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
   
  })
  setMapRegion2({
    latitude: 1,
    longitude: 2,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05
  });
  
const FetchMarker = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<SnackBar[]>([]);

  const getSnackBars = async () => {
    try {
      const response = await fetch('https://stud.hosted.hr.nl/0969850/html/api/locations.json');
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSnackBars();
  }, []);

  return (
    <>
      {isLoading ? (
        <View />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            
            
            <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }} title={item.title} />
          )}
        />
      )}
    </>
    // <Marker coordinate={mapRegion2} title='marker2'/>
    
  );
};
export default FetchMarker;