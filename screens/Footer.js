import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useTheme, Avatar} from 'react-native-paper';
// import {View} from 'react-native-animatable';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import MapScreen from './MapScreen';
import HomeScreen from './HomeScreen';
import Drawer from "./Drawer";
import MainScreen from './Main';
import Profile from "./Profile"
import uploads from './uploads';
import Example from './Example';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
// instead of camera we willl include file option
const Footer = () => (
  // Wrap the Tab.Navigator in a View component
  <View style={styles.container}>
    <Tab.Navigator initialRouteName="MapScreen" screenOptions={{
      // Use tabBarStyle instead of style
      tabBarStyle: styles.tabBarStyle,
      // Use tabBarItemStyle instead of style
      tabBarItemStyle: styles.tabBarItemStyle,
    }}>
      <Tab.Screen
        name="Notifications"
        component={MapScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({color}) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
    
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({color}) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={uploads}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({color}) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  </View>
);


const styles = StyleSheet.create({
  // Add a style for the View component
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Rename the style for the tab bar
  tabBarStyle: {
    backgroundColor: 'blue',
    height: 80,
  },
  // Add a style for the tab items
  tabBarItemStyle: {
    borderRadius: 50,
    margin: 5,
  },
});


export default Footer;
