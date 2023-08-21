


import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import { StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import React, { useState, useEffect, useContext } from 'react';
import MapView, {Marker} from 'react-native-maps';

export default function Maps() {
    const [mapRegion2, setMapRegion] = useState({
        latitude: 51.917410035937564,
        longitude: 4.484308215491189,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05
    })
    return (
    <View>
      <MapView style={styles.map} 
    region={mapRegion2}
    >
      <Marker coordinate={mapRegion2} title='marker'/>


    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }, map: {
        width: '100%',
        height: '100%',
      },
});
