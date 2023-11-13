import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { store } from './store';

//import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import Signup from './screens/Login';
import SignIn from './screens/Register';
import MainScreen from './screens/Main';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
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
                  name="MainScreen"
                  component={MainScreen}
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
                  name="Signup"
                  component={Signup}
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
}
