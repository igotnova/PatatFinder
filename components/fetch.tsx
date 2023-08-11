import React, { useEffect, useState,  } from 'react';
import { ActivityIndicator, FlatList, Text, View, Button , Alert} from 'react-native';

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

  useEffect(() => {
    getSnackBars();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
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
                title="Save location"
                onPress={() => Alert.alert('Simple Button pressed')}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default App;
