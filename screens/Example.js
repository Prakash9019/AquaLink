
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"





import React, { useEffect ,useState,memo } from 'react';
import Dialog from 'react-native-dialog';
import {  StyleSheet,  Text,  TextInput,  View,  ScrollView,  Animated,  Keyboard,  Pressable, Image,  TouchableOpacity,  KeyboardAvoidingView,  TouchableWithoutFeedback,  Dimensions,  Platform,  Modal,} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {  Button } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { markers,main, mapDarkStyle, mapStandardStyle } from '../models/mapData';
import StarRating from "../Functions/StarRating"
import { useNavigation, useTheme } from '@react-navigation/native';

const Example = ({ route }) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [mark, setMark] = useState([]);
  
  const handleMarkerPress = (marker) => {
    setModalVisible(true);
    setSelectedMarker(marker);
    setTitle(marker.title);
    setDescription(marker.description);
    setImageUri(marker.image);
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    const data = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true, aspect: [1, 1], quality: 1
    });
 //   console.log("data" +data.assets[0].uri);
     setImageUri(data.assets[0].uri);
    // if (route.params.img) return navigation.navigate("Example", { image: data.assets[0].uri })
    // else return navigation.navigate("MapScreen", { image: data.assets[0].uri })
}

  const handleMapPress = async (event) => {
    setSelectedMarker(null);
    setTitle(null);
    setDescription(null);
    setImageUri(null);
   // console.log("1"+event.nativeEvent);
    try {
      if (event && event.nativeEvent && event.nativeEvent.coordinate) {
        const { coordinate } = event.nativeEvent;
        setMark((prevMark) => [
          ...prevMark,
          { coordinate: { latitude: coordinate.latitude, longitude: coordinate.longitude } },
        ]);
      } else {
        console.error('Invalid coordinate:', event);
      }
    } catch (error) {
      console.error('Error handling map press:', error);
    }
  };
console.log("hello");
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (route.params) {
  //     if (route.params.image) {
  //        console.log("Image is a route"+route.params.image);
  //          setImageUri(route.params.image);
  //     }
  // }
  //   console.log("hello");
  //   // {mark.map((marker, index) => (
  //   //   console.log("2"+marker.coordinate.latitude)
  //   // ))}
  // }, [route.params]);

  const handleImagePress = () => {
    //navigation.navigate("CameraComponent", { img: true });

  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
      >
        {mark.map((marker, index) => (
       //   console.log("2"+marker.coordinate),
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
      <Dialog.Container visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <Text>No Image Selected</Text>
          )}
          <TouchableOpacity onPress={openImagePickerAsync} style={{ marginTop: 20 }}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
              Select Image
            </Text>
          </TouchableOpacity>
        </View>
        <Dialog.Button label="Cancel" onPress={() => setModalVisible(false)} />
      </Dialog.Container>
    </View>
  );
};



export default Example;

const styles = StyleSheet.create({
  buttonClose: {
    backgroundColor: '#2196F3',
    marginLeft:60,
    width:90,
    height:25,
    justifyContent:'flex-end',
  },
  textStyle: {
   // height:25,
   padding:3,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Button:{
    marginBottom: 10,
    marginTop:10,
  
    backgroundColor:'blue'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
    marginBottom:'60%',
    marginRight:'10%',
    marginLeft:'10%',
    backgroundColor:'skyblue',

  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    margin:25,
  },
  input: {
    height: 40,
    width:200,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
  searchBox: {
    position:'absolute', 
    marginTop: Platform.OS === 'ios' ? 40 : 30, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 7,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 90 : 80, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
 
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
   
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 40,
    height: 50,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
