import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

// Coordinates for Osijek, Croatia
const restaurants = [
  { name: 'McDonalds', latitude: 45.5511, longitude: 18.6920 }, // Osijek
  { name: 'KFC', latitude: 45.5500, longitude: 18.6930 }, // Osijek
  { name: 'Steers', latitude: 45.5520, longitude: 18.6940 }, // Osijek
  { name: 'Roman Pizza', latitude: 45.5490, longitude: 18.6900 } // Osijek
];

export default function RestaurantMapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE} // Use Google Maps
          style={styles.map}
          region={location}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={location}
            title="You are here"
          />
          {restaurants.map((restaurant, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
              title={restaurant.name}
            />
          ))}
        </MapView>
      ) : (
        <Text>{errorMsg ? errorMsg : "Loading map..."}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
