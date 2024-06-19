import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation'; // Adjust the path to your navigation types
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

type SnackBar = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

type AppProps = {
  navigation: StackNavigationProp<RootStackParamList, 'two'>; // Adjust the screen name if needed
};

const App = ({ navigation }: AppProps) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<SnackBar[]>([]);
  const [savedItems, setSavedItems] = useState<SnackBar[]>([]);

  const getSnackBars = async () => {
    try {
      const response = await fetch(
        'https://stud.hosted.hr.nl/0969850/html/api/locations.json'
      );
      const json = await response.json();
      setData(json.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveItemToStorage = async (item: SnackBar) => {
    try {
      await AsyncStorage.setItem('selectedItem', JSON.stringify(item));
      console.log('Item saved successfully:', item.title);
      setSavedItems((prevItems) => [...prevItems, item]);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const deleteSavedItem = async (itemToDelete: SnackBar) => {
    try {
      const updatedSavedItems = savedItems.filter((item) => item !== itemToDelete);
      setSavedItems(updatedSavedItems);
      await AsyncStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
      console.log('Item deleted successfully:', itemToDelete.title);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const retrieveSavedItems = async () => {
    try {
      const savedItemsJSON = await AsyncStorage.getItem('savedItems');
      if (savedItemsJSON !== null) {
        const savedItemsArray = JSON.parse(savedItemsJSON);
        setSavedItems(savedItemsArray);
        console.log('Saved Items:', savedItemsArray);
      }
    } catch (error) {
      console.error('Error retrieving saved items:', error);
    }
  };

  const refreshPage = () => {
    setLoading(true);
    setData([]);
    setSavedItems([]);
    getSnackBars();
  };

  useEffect(() => {
    getSnackBars();
    retrieveSavedItems();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('savedItems', JSON.stringify(savedItems));
  }, [savedItems]);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button title="Retrieve Saved Items" onPress={retrieveSavedItems} />
      <Button title="Refresh" onPress={refreshPage} />
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
              <Button
                title="Save Item"
                onPress={() => saveItemToStorage(item)}
              />
              <Button
  title="Go to Map"
  onPress={() =>
    navigation.navigate('index', {
      latitude: item.latitude,
      longitude: item.longitude,
    })
  }
/>
            </View>
          )}
        />
      )}
      <Text>Saved Items:</Text>
      <FlatList
        data={savedItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.latitude}</Text>
            <Text>{item.longitude}</Text>
            <Button
              title="Delete"
              onPress={() => deleteSavedItem(item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default App;
