import { StyleSheet } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import Maps from '../../components/maps';
import { Text, View } from '../../components/Themed';
import React, { useState, useEffect } from 'react';
import Fetched from "../../components/fetch";
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
     <Fetched/>
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
