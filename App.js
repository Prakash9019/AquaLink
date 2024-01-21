import React from 'react';
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Provider } from 'react-redux';
import { store } from './store';

// Screens
import HomeScreen from './screens/HomeScreen';
import Signup from './screens/Login';
import SignIn from './screens/Register';
import Profile from './screens/Profile';
import uploads from './screens/uploads';
import Drawer from "./screens/Drawer";
import CameraComponent from './screens/Camera';
import MapScreen from './screens/MapScreen';
import Footer from './screens/Footer';
import adminuser from './screens/adminuser';
import AuthFooter from './screens/AuthFooter';
import AuthMap from './screens/AuthMap';
const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <TailwindProvider>
        <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
      }}
    />
     <Stack.Screen
      name="adminuser"
      component={adminuser}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AuthFooter"
      component={AuthFooter}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AuthMap"
      component={AuthMap}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerShown: false,
      }}
    />
      <Stack.Screen
      name="Footer"
      component={Footer}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CameraComponent"
      component={CameraComponent}
      options={{
        headerShown: false,
      }}
    />
      </Stack.Navigator>
        </TailwindProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
);

export default App;
