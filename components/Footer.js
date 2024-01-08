import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
//import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useTheme, Avatar} from 'react-native-paper';
// import {View} from 'react-native-animatable';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import MapScreen from './MapScreen';
import HomeScreen from '../screens/HomeScreen';
import MainScreen from '../screens/Main';
import Profile from "../screens/Profile"
import uploads from '../screens/uploads';
import Example from '../screens/Example';
const Tab = createMaterialBottomTabNavigator();
// instead of camera we willl include file option
const Footer = () => (
  <Tab.Navigator initialRouteName="HomeScreen" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#FF6347',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
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
);

export default Footer;