import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RestaurantDetailScreen({ route }) {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text>Latitude: {restaurant.latitude}</Text>
      <Text>Longitude: {restaurant.longitude}</Text>
      {/* You can add more restaurant details here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
