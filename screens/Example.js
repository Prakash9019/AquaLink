// MapComponent.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = () => {
  const [mark, setmark] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleMapPress = (event) => {
    setModalVisible(true);
    setSelectedMarker(null);
    setTitle('');
    setDescription('');
    setmark([...mark, { coordinate: event.nativeEvent.coordinate }]);
  };

  const handleMarkerPress = (marker) => {
    setModalVisible(true);
    setSelectedMarker(marker);
    setTitle(marker.title);
    setDescription(marker.description);
  };

  const handleSave = () => {
    console.log(mark.coordinate);
    if (selectedMarker) {
      // Update existing marker
      const updatedmark = mark.map((marker) =>
        marker === selectedMarker
          ? { ...marker, title, description }
          : marker
      );
      setmark(updatedmark);
    } else {
      // Add new marker
      setmark([...mark, { coordinate: selectedMarker.coordinate, title, description }]);
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
      >
        {mark.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        style={styles.task}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         <View style={styles.centeredView}>
        <View style={styles.modalContainer}>
          <Text>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          <Text>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        <View style={styles.Button}>
          <Button title="Save" onPress={handleSave}  /> 
        </View>
          <Button title="Cancel" onPress={() => setModalVisible(false)}   />
       
        </View>
        </View>
      </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button:{
    marginBottom: 20,
    marginTop:23,
  
    backgroundColor:'gray'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
    marginBottom:'50%',
    marginRight:'10%',
    marginLeft:'10%',
    backgroundColor:'skyblue',

  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 45,
    margin:25,
  },
  input: {
    height: 40,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default MapComponent;
