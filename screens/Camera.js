import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker"
import { useNavigation, useRoute } from '@react-navigation/native';


const CameraComponent = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [camera, setCamera] = useState(null);
    const navigation=useNavigation();
    const route = useRoute();
   // console.log(route);



    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

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
     if (route.params && route.params.onComplete) {
        // console.log("most...")
        // console.log(data.assets[0].uri);
        
        route.params.onComplete(data.assets[0].uri);
      }
      navigation.goBack();
         //return navigation.navigate("MapScreen", { mage: data.assets[0].uri })
   //     else return navigation.navigate("MapScreen", { img: data.assets[0].uri })
    }
    // Non-serializable values were found in the navigation state. Check: CameraComponent > params.onComplete (Function)  react native navigation error
    const clickPicture = async () => {

        const data = await camera.takePictureAsync();
        // console.log(data);
        // console.log(route.params.img);
      //  route.params.img=true;
      
    //   console.log(data);
      
      if (route.params && route.params.onComplete) {
        // console.log(data);
        // console.log("most...")
        // console.log(data.uri)
        route.params.onComplete(data.uri);
      }
      navigation.goBack();
    //    else return navigation.navigate("Example", { img: data.uri })
        //in repo their used

      //  Profile = ({ navigation, route }) 

        // useEffect(() => {
    //     if (route.params) {
    //         if (route.params.image) {
    //             setAvatar(route.params.image)
    //         }
    //     }

    // }, [route])

    }


    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera type={type} style={{ flex: 1, aspectRatio: 1 }} ratio="1:1" ref={(e) => setCamera(e)} />



            <View
                style={{
                    flexDirection: "row",
                    position: "absolute",
                    bottom: 10,
                    justifyContent: "space-evenly",
                    width: "100%",
                }}
            >
                <Icon name="image" size={40} color="#fff" onPress={openImagePickerAsync} />
                <Icon name="camera" size={40} color="#fff" onPress={clickPicture} />

                <Icon
                    name="flip-camera-android"
                    size={40}
                    color="#fff"
                    onPress={() =>
                        setType(
                            type === CameraType.back ? CameraType.front : CameraType.back
                        )
                    }
                />
            </View>


        </View>
    );
}

export default CameraComponent