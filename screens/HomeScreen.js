// import React from 'react';
// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     Dimensions,
//     StyleSheet,
//     StatusBar,
//     Image
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// //mport LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';


// const HomeScreen = () => {
//     const { colors } = useTheme();
//     const navigation=useNavigation();
//     return (
//       <View style={styles.container}>
//         <Image source={require('./OIP.jpeg')} style={styles.image} />
//           <StatusBar barStyle="light-content"/>
//         <View style={styles.header}>
//             <Animatable.Image 
//                 animation="bounceIn"
//                 duraton="1500"
//                 source={require('../components/flood.png')}
//             style={styles.logo}
//             resizeMode="stretch"
//             />
//         </View>
//         <Animatable.View 
            
//             animation="fadeInUpBig"
//         >
//             <Text style={[styles.title, {
//                 color: colors.text
//             }]}>Welcome to AquaLink</Text>
//             <Text style={styles.text} onPress={()=>{navigation.navigate('SignIn')}}> Sign in with account</Text>
//             <Text style={styles.text} onPress={()=>{navigation.navigate('Signup')}} > Login </Text>
//             <View style={styles.button}>
          
//                 <TouchableOpacity
//                     onPress={()=>{navigation.navigate('SignIn')}}
//                     colors={['#FFA07A', '#FF6347']}
//                     style={styles.signIn}
//                 >
//                     <Text style={styles.textSign}>Get Started</Text>
//                     <MaterialIcons 
//                         name="navigate-next"
//                         color="#fff"
//                         size={20}
//                     />
//                 </TouchableOpacity>
           
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default HomeScreen;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.28;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#C2DEDC'
//   },
//   header: {
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },
//   footer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingVertical: 50,
//       paddingHorizontal: 30
//   },
//   logo: {
//       width: height_logo,
//       height: height_logo
//   },
//   title: {
//       color: '#05375a',
//       fontSize: 30,
//       fontWeight: 'bold'
//   },
//   text: {
//       color: 'grey',
//       marginTop:5
//   },
//   button: {
//       alignItems: 'flex-end',
//       marginTop: 30
//   },
//   signIn: {
//       width: 150,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 50,
//       flexDirection: 'row'
//   },
//   textSign: {
//       color: 'black',
//       fontWeight: 'bold'
//   }
// });

///////

import { View, Image, Animated, StyleSheet,Button, Text,SafeAreaView,TouchableOpacity } from 'react-native';
import React,{useRef,useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
//mport LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useTheme();
       const navigation=useNavigation();
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: false, // Set to true for better performance on native
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <Image source={require('./final.jpg')} style={styles.image} />
      
      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 0], // Adjust the initial and final position of the text
                }),
              },
            ],
          },
        ]} >
        <Text style={styles.texthead}>GeoINsight
        {'\n'}
        {'\n'}
        {'\n'}</Text>
        {/* <Text style={styles.text}>Welcome</Text>
        <Text style={styles.text}>to</Text> */}
        <Text style={styles.subtext}>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}{'\n'}{'\n'}
        More people.
        {'\n'}
More impact.


        </Text>
        <Text style={styles.smalltext}>
        
          one click at a time for safer tomorrow..
          {'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}
        </Text>

        {/* <Text style={styles.hello}></Text> */}
        <Button
    title='Get Started'
     onPress={()=>{navigation.navigate('adminuser')}}
     style={marginLeft=40}
 >
     <Text style={styles.textSign}>Get Started</Text>
     <MaterialIcons 
         name="navigate-next"
         color="#fff"
         size={20}
     />
 </Button>
   
      
      </Animated.View>
     
  </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  
  image: {
    width: "100%",
    height:"100%" ,
    // resizeMode: 'cover',
  },
  textContainer: {
    position: 'fixed',
    bottom: 600,
    padding: 10,
    borderRadius: 10,
    marginLeft:30
  },
//   hello:{
//     padding:89,
//   },
texthead:{
    position:"absolute",
    marginTop:10,
fontSize:60,
color:"white",
fontWeight:"bold"
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    opacity: 3,    
    
  },
 subtext:{
  fontSize:30,
  color:"white",

 },
 smalltext:{
fontSize:12,
color:"white",
fontStyle:"italic",
// marginLeft:80,
marginTop:10,
 },
      signIn: {
          width: 150,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          flexDirection: 'row'
      },
      textSign: {
          color: 'black',
          fontWeight: 'bold'
      },
      Button:{
        
        right:2,
       height:100,
        
      }
});

export default HomeScreen;

















