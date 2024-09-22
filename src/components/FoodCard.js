import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../global/styles';

export default function FoodCard({
  OnPressFoodCard, // Receives onPress callback
  restaurantName,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  numberOfReview,
  businessAddress,
  farAway,
  averageReview,
  images,
  screenWidth
}) {
  // Determine if the image source is a URL or local image
  const imageSource = typeof images === 'string' ? { uri: images } : images;

  return (
    <TouchableOpacity onPress={OnPressFoodCard}>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        <Image
          style={{ ...styles.image, width: screenWidth }}
          source={imageSource}
        />
      </View>
      <View>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.distance}>
            <Icon
              name='place'
              type='material'
              color={colors.grey2}
              size={18}
              iconStyle={{ marginTop: 3 }}
            />
            <Text style={styles.Min}>{farAway} Min</Text>
          </View>
          <Text style={styles.address}>{businessAddress}</Text>
        </View>
      </View>
      <View style={styles.review}>
        <Text style={styles.average}>{averageReview}</Text>
        <Text style={styles.numberOfReview}>{numberOfReview} reviews</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    margin: 10,
  },
  image: {
    height: 150,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  Min: {
    marginLeft: 5,
  },
  address: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  average: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  numberOfReview: {
    fontSize: 14,
    color: colors.grey2,
  },
});
