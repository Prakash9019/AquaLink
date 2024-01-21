import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = () => {
  const [data,setData]=useState([]);
  const [filter,setFilter]=useState([]);
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
       console.log("....................");
      //  hello.map((item)=>{
      //       if(item.typeofproblem=="water"){
      //           setFilter.push(item);
      
      //       }
      //  })
       console.log(filter);
        setData(hello);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   // setSave(false);
    fetchData();
  }, []);

  return (
    <SafeAreaView>
    <FlatList
        data={data}
        keyExtractor={({ id }, index) => index}
        renderItem={({ item }) => (
           <View style={styles.card}>
            <Image source={{uri :item.image}} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.buttonContainer}>
              <Text style={styles.button}> 
              {item.review}
              <Icon key={"thumb-up"} name={'thumb-up'} size={24} color={"#4CAF50"} />
              </Text>
              <Text style={styles.button} > 
              {item.review}
              <Icon key={"comment"} name={'comment'} size={24} color={"#2196F3"} />
              </Text>
              <Text style={styles.button} > 
              {item.review}
              <Icon key={"delete"} name={'delete'} size={24} color={"#F44336"} />
              </Text>
              </View>
            </View>
         </View>
        )}
      />
        {
          data.map((item)=>{
           <Text style={{backgroundColor:"blue"}}>{item.title}</Text>
            // <View style={styles.card}>
            // <Image source={{url:item.image}} style={styles.image} />
            // <View style={styles.content}>
            //   <Text style={styles.title}>{item.title}</Text>
            //   <Text style={styles.description}>{item.description}</Text>
            //   <View style={styles.buttonContainer}>
            //   <TouchableOpacity style={styles.button}> 
            //   {item.review}
            //   <Icon key={"thumb-up"} name={'thumb-up'} size={24} color={"#4CAF50"} />
            //   </TouchableOpacity>
            //   <TouchableOpacity style={styles.button} > 
            //   {item.review}
            //   <Icon key={"comment"} name={'comment'} size={24} color={"#2196F3"} />
            //   </TouchableOpacity>
            //   <TouchableOpacity style={styles.button} > 
            //   {item.review}
            //   <Icon key={"delete"} name={'delete'} size={24} color={"#F44336"} />
            //   </TouchableOpacity>
            //   </View>
            // </View>
         // </View>
          })
        }

   
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth:3,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
  },
});

export default Card;
