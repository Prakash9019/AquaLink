import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
const MapScreen = () => {
  return (
    <View>
      <MapView
            style={{ height: "100%", width: "100%" }}
            mapType="mutedStandard"
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
         </MapView>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})