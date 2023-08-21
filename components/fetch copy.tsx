import React, { useEffect, useState,  } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button , Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SnackBar = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

const App = () => {
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

  const saveItemToStorage = async (item: { title: string; description: string }) => {
    try {
      await AsyncStorage.setItem('selectedItem', JSON.stringify(item));
      console.log('Item saved successfully:', item.title);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };
  const retrieveSavedItems = async () => {
    try {
      const savedItem = await AsyncStorage.getItem('selectedItem');
      if (savedItem !== null) {
        console.log('Saved Item:', JSON.parse(savedItem));
      }
    } catch (error) {
      console.error('Error retrieving saved item:', error);
    }
  };

  useEffect(() => {
    getSnackBars();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button title="Retrieve Saved Items" onPress={retrieveSavedItems} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text>{item.latitude}</Text>
              <Text>{item.longitude}</Text>
              <Text>   </Text>
              <Button title="Save Item" onPress={() => saveItemToStorage(item)} />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;
