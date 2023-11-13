import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigation = useNavigation();

    const [sign, setSign] = useState({Uid:"",username:"" ,email: "", password: ""}) 
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const {Uid,username,email,password} = sign;
        const response = await fetch("http://localhost:5000/api/auth/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({Uid,username,email,password})
        });
        const json = await response.json()
        console.log(json);
            // Save the auth token and redirect
            localStorage.setItem('jwtData', json.jwtData); 
            console.log(json.jwtData);
           // navigate("/");
    }
  const handleSignup = () => {
    // Add your signup logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Confirm Password..."
          placeholderTextColor="#003f5c"
          onChangeText={setConfirmPassword}
        />
      </View>
      <TouchableOpacity style={styles.signupBtn}  onPress={() => navigation.navigate('MainScreen')}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fb5b5a',
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
    fontSize:20,
    borderRadius:8,
  },
  signupBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  signupText: {
    color: 'white',
  },
});

export default HomeScreen;
