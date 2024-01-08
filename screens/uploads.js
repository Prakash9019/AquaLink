import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Card = () => {
  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.card}>
      <Image source={require('../components/flood.png')} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>hello</Text>
        <Text style={styles.description}>Water scarcity is often divided into two categories: physical scarcity, when there is a shortage of water because of local ecological conditions; and economic scarcity, when there is inadequate water infrastructure. The two frequently come together to cause water stress. For instance, a stressed area can have both a shortage of rainfall as well as ...</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}> 
        <Icon key={"thumb-up"} name={'thumb-up'} size={24} color={"#4CAF50"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"comment"} name={'comment'} size={24} color={"#2196F3"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"delete"} name={'delete'} size={24} color={"#F44336"} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={styles.card}>
      <Image source={require('../components/flood.png')} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>hello</Text>
        <Text style={styles.description}>Water scarcity is often divided into two categories: physical scarcity, when there is a shortage of water because of local ecological conditions; and economic scarcity, when there is inadequate water infrastructure. The two frequently come together to cause water stress. For instance, a stressed area can have both a shortage of rainfall as well as ...</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}> 
        <Icon key={"thumb-up"} name={'thumb-up'} size={24} color={"#4CAF50"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"comment"} name={'comment'} size={24} color={"#2196F3"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"delete"} name={'delete'} size={24} color={"#F44336"} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={styles.card}>
      <Image source={require('../components/flood.png')} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>hello</Text>
        <Text style={styles.description}>Water scarcity is often divided into two categories: physical scarcity, when there is a shortage of water because of local ecological conditions; and economic scarcity, when there is inadequate water infrastructure. The two frequently come together to cause water stress. For instance, a stressed area can have both a shortage of rainfall as well as ...</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}> 
        <Icon key={"thumb-up"} name={'thumb-up'} size={24} color={"#4CAF50"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"comment"} name={'comment'} size={24} color={"#2196F3"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} > 
        <Icon key={"delete"} name={'delete'} size={24} color={"#F44336"} />
        </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
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
