import React, { useEffect ,useState,memo } from 'react';
import Dialog from 'react-native-dialog';
import {  StyleSheet,  Text,  TextInput,  View,  ScrollView,    Alert,  Animated,  Keyboard,  Pressable,
  Image,  TouchableOpacity,  KeyboardAvoidingView,  TouchableWithoutFeedback,  Dimensions,  Platform,  Modal,} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {  Button } from "react-native-paper"
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { markers,main, mapDarkStyle, mapStandardStyle } from '../models/mapData';
import StarRating from "../Functions/StarRating"
import { useNavigation, useTheme,useRoute } from '@react-navigation/native';
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const AuthMap = () => {
  const navigation = useNavigation();
 // const route = useRoute();
  const theme = useTheme();
 // console.log(route);
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
  const [typeofproblem,settypeofproblem]=useState('');
  const [type,setType] =useState('');
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mark, setmark] = useState([]);
  const [data,setData]=useState([]);
  // const [hasPermission, setHasPermission] = useState(null);
  //   const [type, setType] = useState(CameraType.back);
  //   const [camera, setCamera] = useState(null);

//   const handleMapPress = async (event) => {
//    // setModalVisible(true);            //   check this out
//     setSelectedMarker(null);
//     setTitle('');
//     settypeofproblem('');
//     setDescription('');
//     setImageUri('');
//     setmark([...mark, { coordinate: event.nativeEvent.coordinate }]);

    
//   };

  const handleMarkerPress = (marker) => {
    setModalVisible(true);
    setSelectedMarker(marker);
    setTitle(marker.title);
   setDescription(marker.description);
   setImageUri(marker.image);
   settypeofproblem(marker.typeofproblem);
  //  console.log(marker.image);
 //   setImage(marker.image);
   // setImage(marker.image);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://notes-application-api-pi.vercel.app/api/notes/fetchallmarkers',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "jwtData": await AsyncStorage.getItem('jwtData')
          }
        });
        // const d=AsyncStorage.getItem('jwtData')
        // console.log(d);
        const hello = await response.json();
       console.log(hello);
        setData(hello);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   // setSave(false);
    fetchData();
  }, []);

// const handleImage = () => {
//   navigation.navigate('CameraComponent', {
//     onComplete: (image) => {
//       setImageUri(image);
//     },
//   });
//   setComponentLoaded(true);

//  // console.log("....image...."+image);
//  // setImage(image);

// };

  
 
   
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



  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
  
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        
        {/* 'this marker from onclick event' */}
        
           { data ? data.map((marker, index) => (
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
                      source={require('./img2.png')}
                      style={styles.marker}
                      resizeMode="cover"
                    />
                  </Animated.View>
                  </Marker>    
            )):console.log("hello")}
        
        {/* {data? data.map((item)=>{console.log(item)})
        : data} */}
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
         <Text>Type Of Problem:</Text>
        <Dialog.Input
          value={typeofproblem}
          onChangeText={(text) => settypeofproblem(text)}
          placeholder="Enter type of Problem"
        />
 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageUri ? <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200 }}
            /> : (
             
              <Text style={{ color: 'blue', textDecorationLine: 'underline' }} >
                No Select Image
              </Text>
      )}

     
    </View>
    

        <Dialog.Button label="Save" />
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
       
      </Animated.ScrollView>
      
    </View>
  );
};

export default memo(AuthMap);

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