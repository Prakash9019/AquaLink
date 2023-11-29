import React, { useEffect ,useState,memo } from 'react';
import Dialog from 'react-native-dialog';
import {  StyleSheet,  Text,  TextInput,  View,  ScrollView,  Animated,  Keyboard,  Pressable,
  Image,  TouchableOpacity,  KeyboardAvoidingView,  TouchableWithoutFeedback,  Dimensions,  Platform,  Modal,} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {  Button } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';

import { markers,main, mapDarkStyle, mapStandardStyle } from '../models/mapData';
import StarRating from "../Functions/StarRating"
import { useNavigation, useTheme } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const MapScreen = () => {
  const navigation = useNavigation();
  
  const theme = useTheme();
 // const navigation=useNavigation();

  const initialMapState = {
    markers,
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mark, setmark] = useState([]);
  const [componentLoaded, setComponentLoaded] = useState(false);
  // const [hasPermission, setHasPermission] = useState(null);
  //   const [type, setType] = useState(CameraType.back);
  //   const [camera, setCamera] = useState(null);

  const handleMapPress = async (event) => {
   // setModalVisible(true);            //   check this out
    setSelectedMarker(null);
    setTitle('');
    setDescription('');
    setImageUri(null);
    setmark([...mark, { coordinate: event.nativeEvent.coordinate }]);

    
  };

  const handleMarkerPress = (marker) => {
    setModalVisible(true);
    setSelectedMarker(marker);
    setTitle(marker.title);
    setDescription(marker.description);
 //   setImage(marker.image);
    console.log("hello");
   // setImage(marker.image);
  };
  
//    useEffect(() => {
//     if (componentLoaded && route.params) {
//       console.log("hiii."+route.params.image)
//         if (route.params.image) {
//             setImageUri(route.params.image)
//         }
//     }

// }, [componentLoaded])
const handleCameraComplete = (image) => {
  console.log("a.........."+image)
  setImageUri(image);
};

const handleImage = () => {
  navigation.navigate('CameraComponent', {
    onComplete: (image) => {
      setImageUri(image);
    },
  });
  setComponentLoaded(true);

 // console.log("....image...."+image);
 // setImage(image);

};

  const handleSave = () => {
    console.log("clicked save");
   // console.log(image);
    console.log(selectedMarker);
    if (selectedMarker) {
      console.log("Title111"+title+description,imageUri);
      // Update existing marker
      const updatedmark = mark.map((marker) =>
        marker === selectedMarker
          ? { ...marker, title, description,imageUri }     //the image is stored in setImmage use it tomorrow..
          : marker
      );
      updatedmark.map((m)=>{
        console.log(m);
      })
      console.log('updatded is '+ updatedmark);
      setmark(updatedmark);
    } else {
      // Add new marker
      console.log("Title"+title);
      setmark([...mark, { coordinate: selectedMarker.coordinate, title, description,imageUri }]);
    }

    setModalVisible(false);
  };
   
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  // useEffect(() => {
  //   mapAnimation.addListener(({ value }) => {
  //     let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
  //     if (index >= state.markers.length) {
  //       index = state.markers.length - 1;
  //     }
  //     if (index <= 0) {
  //       index = 0;
  //     }

  //     clearTimeout(regionTimeout);

  //     const regionTimeout = setTimeout(() => {
  //       if( mapIndex !== index ) {
  //         mapIndex = index;
  //         const { coordinate } = state.markers[index];
  //         _map.current.animateToRegion(
  //           {
  //             ...coordinate,
  //             latitudeDelta: state.region.latitudeDelta,
  //             longitudeDelta: state.region.longitudeDelta,
  //           },
  //           350
  //         );
  //       }
  //     }, 10);
  //   });
  // });


  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        onPress={handleMapPress}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {/* the marker from the database or by image */}
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: 1,
              },
            ],
          };
          return (
            <Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('./map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
        {/* 'this marker from onclick event' */}
        {mark.map((marker, index) => (
        //  console.log(marker.coordinate),
        
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          //  image={marker.image}
            onPress={() => handleMarkerPress(marker)}
          >
             <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('./map_marker.png')}
                  style={styles.marker}
                  resizeMode="cover"
                />
              </Animated.View>
              </Marker>
        ))}
      </MapView>
      


      

      <Dialog.Container visible={modalVisible}>
        <Text>Title:</Text>
        <Dialog.Input
          value={title}
          onChangeText={(text) => setTitle(text)}
          placeholder="Enter title"
        />

        <Text>Description:</Text>
        <Dialog.Input
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter description"
        />
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri ? <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            /> : (
        <Text>No Image Selected</Text>
      )}

      <TouchableOpacity onPress={handleImage} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Select Image
        </Text>
      </TouchableOpacity>
    </View>
    

        <Dialog.Button label="Save" onPress={handleSave} />
        <Dialog.Button label="Cancel" onPress={() => setModalVisible(false)} />
      </Dialog.Container>



                  {/* <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
     
      
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {state.markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              
            </View>
          </View>
        ))}
      </Animated.ScrollView>
      
    </View>
  );
};

export default memo(MapScreen);

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
  endPadding: {
    paddingRight: width - CARD_WIDTH,
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
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
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