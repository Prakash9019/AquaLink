import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChooseCategoryScreen = () => {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
      {/* <Image source={require('./ad.jpeg')} style={styles.logo} /> */}
      <Text style={styles.heading}>Choose Your Category</Text>
      
      <TouchableOpacity style={styles.categoryButton} onPress={()=>{navigation.navigate('AuthFooter')}} >
        <Image source={require('./ad.jpeg')} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.categoryButton} onPress={()=>{navigation.navigate('Signup')}} >
        <Image source={require('./user.jpeg')} style={styles.categoryIcon} />
        <Text style={styles.categoryText}>User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#7071E8",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    color:"white",
    fontWeight: 'bold',
   marginBottom:20,
    // textAlign:"top",
    justifyContent:"center",
    

  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderWidth:3,
    padding: 0,
    borderRadius: 20,
    marginVertical: 10,
   fontSize:30,
   width:200,
   borderColor:"black",
   padding:20,
  //  paddingRight:30,
  marginRight:10,
    

  },
  categoryIcon: {
    width: 90,
    height: 80,
    // marginRight: 60,
    borderRadius:50,
    marginRight:18,
  },
  categoryText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ChooseCategoryScreen;

