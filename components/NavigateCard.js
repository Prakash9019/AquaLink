import { View, Text, SafeAreaView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setDestination } from '../slices/navSlice';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (

        <SafeAreaView className="bg-white flex-1">
           {/* import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ imageSource, title, description, onLikePress, onCommentPress, onDeletePress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onLikePress} style={styles.button}>
            <Text>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCommentPress} style={styles.button}>
            <Text>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeletePress} style={styles.button}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Card; */}


            <Text className="text-center py-5 text-xl">Good Monring, studio_xlnce</Text>

            <View className="flex-shrink flex-grow border-t border-gray-200">
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where To?"
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        minLength={2}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        }}
                        returnKeyType={"search"}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                }),
                            );
                                
                            navigation.navigate("RideOptionsCard");
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={400}
                        />
                </View>

                <NavFavourites />
            </View>

            <View className="flex-row bg-white justify-evenly px-4 py-2 border-t border-gray-100 mt-auto">
                <TouchableOpacity
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    className="flex flex-row w-24 justify-between bg-black px-4 py-3 rounded-full"
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text className="text-white text-center ml-3">Rides</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row w-24 justify-between px-4 py-3 rounded-full">
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text className="text-center ml-3">Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#dddddf",
        borderRadius: 0,
        fontSize: 12,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});